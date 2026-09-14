// src/lib/health-checks.ts
// Backing checks for /admin/system. Streetbeat has no webhook (verification
// happens via redirect in /api/verify-purchase, not a Stripe webhook), so
// "Integration Health" checks that each provider's API is actually reachable
// rather than checking for a registered webhook endpoint. Sales pulls live
// data straight from Stripe (there's no purchases table for current sales)
// plus the historical count from the legacy_purchases table.

import Stripe from "stripe"
import { Resend } from "resend"
import { getDB } from "@/lib/db"

export type CheckResult = { status: "ok" | "warn" | "error"; detail: string }

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" })
}

/* ─── 1. Env Var Status ─────────────────────────────────────────────────── */
const REQUIRED_ENV_VARS = [
  "STRIPE_SECRET_KEY",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "RESEND_TO_EMAIL",
  "STREETBEAT_ACCESS_SECRET",
  "ADMIN_ACCESS_SECRET",
  "NEXT_PUBLIC_URL",
  "TURSO_URL",
  "TURSO_TOKEN",
  "NEXT_PUBLIC_META_PIXEL_ID",
  "META_CAPI_ACCESS_TOKEN",
]

export function checkEnvVars(): Record<string, CheckResult> {
  const results: Record<string, CheckResult> = {}
  for (const key of REQUIRED_ENV_VARS) {
    const present = !!process.env[key]
    results[key] = { status: present ? "ok" : "error", detail: present ? "set" : "MISSING" }
  }
  return results
}

/* ─── 2. Integration Health ─────────────────────────────────────────────── */
export async function checkStripe(): Promise<CheckResult> {
  try {
    const balance = await getStripe().balance.retrieve()
    const available = balance.available.map((b) => `${b.amount / 100} ${b.currency.toUpperCase()}`).join(", ")
    return { status: "ok", detail: `API key valid — available balance: ${available || "$0"}` }
  } catch (err) {
    return { status: "error", detail: `Stripe API error: ${(err as Error).message}` }
  }
}

export async function checkResend(): Promise<CheckResult> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!)
    const domains = await resend.domains.list()
    const fromDomain = (process.env.RESEND_FROM_EMAIL || "").split("@")[1]
    const match = domains.data?.data?.find((d: any) => d.name === fromDomain)
    if (!fromDomain) return { status: "error", detail: "RESEND_FROM_EMAIL not set" }
    if (!match) return { status: "error", detail: `Domain ${fromDomain} not found in Resend account` }
    if (match.status !== "verified") return { status: "error", detail: `${fromDomain} status: ${match.status}` }
    return { status: "ok", detail: `${fromDomain} verified` }
  } catch (err) {
    return { status: "error", detail: `Resend API error: ${(err as Error).message}` }
  }
}

export async function checkTurso(): Promise<CheckResult> {
  try {
    await getDB().execute("SELECT 1")
    return { status: "ok", detail: "Connected" }
  } catch (err) {
    return { status: "error", detail: `Turso connection failed: ${(err as Error).message}` }
  }
}

export async function checkMetaPixel(): Promise<CheckResult> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const token = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !token) return { status: "error", detail: "Pixel ID or CAPI token not set" }
  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${pixelId}?fields=id,name&access_token=${token}`)
    if (!res.ok) {
      // Surface Meta's actual error message/code instead of just the HTTP
      // status — "Invalid OAuth access token", "Unsupported get request"
      // (wrong pixel ID), and "permission" errors all need different fixes,
      // and a bare "(400)" doesn't tell you which one you're looking at.
      let reason = `HTTP ${res.status}`
      try {
        const body = await res.json()
        if (body?.error?.message) reason = body.error.message
      } catch {
        // response wasn't JSON — keep the bare status
      }
      return { status: "error", detail: `Graph API rejected pixel/token pair: ${reason}` }
    }
    const data = await res.json()
    return { status: "ok", detail: `Connected to "${data.name ?? pixelId}"` }
  } catch (err) {
    return { status: "error", detail: `Meta Graph API error: ${(err as Error).message}` }
  }
}

/* ─── 3. Sales — live (Stripe) + legacy (Turso) ─────────────────────────── */
export type SaleRow = { email: string; amountCents: number; date: string }
export type SalesResult = {
  status: "ok" | "warn" | "error"
  detail: string
  live: { count30d: number; revenueCents30d: number; recent: SaleRow[] }
  legacy: { count: number }
}

export async function checkSales(): Promise<SalesResult> {
  const empty = { count30d: 0, revenueCents30d: 0, recent: [] as SaleRow[] }
  let live = empty
  let legacyCount = 0
  let status: SalesResult["status"] = "ok"
  const problems: string[] = []

  try {
    const thirtyDaysAgo = Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
    const sessions = await getStripe().checkout.sessions.list({
      limit: 100,
      created: { gte: thirtyDaysAgo },
    })
    const paid = sessions.data.filter((s) => s.payment_status === "paid")
    live = {
      count30d: paid.length,
      revenueCents30d: paid.reduce((sum, s) => sum + (s.amount_total ?? 0), 0),
      recent: paid
        .sort((a, b) => b.created - a.created)
        .slice(0, 10)
        .map((s) => ({
          email: s.customer_details?.email ?? s.customer_email ?? "unknown",
          amountCents: s.amount_total ?? 0,
          date: new Date(s.created * 1000).toISOString(),
        })),
    }
  } catch (err) {
    status = "error"
    problems.push(`Stripe: ${(err as Error).message}`)
  }

  try {
    const result = await getDB().execute("SELECT COUNT(*) as count FROM legacy_purchases")
    legacyCount = Number(result.rows[0]?.count ?? 0)
  } catch (err) {
    if (status === "ok") status = "warn"
    problems.push(`Legacy count: ${(err as Error).message}`)
  }

  const detail =
    problems.length > 0
      ? problems.join("; ")
      : `${live.count30d} sale(s) in the last 30 days ($${(live.revenueCents30d / 100).toFixed(2)}) · ${legacyCount} legacy purchase(s) on record`

  return { status, detail, live, legacy: { count: legacyCount } }
}
