// src/app/api/verify-purchase/route.ts
// Stripe redirects here after checkout. Verifies the session actually paid
// (never trust the redirect alone — always re-check with Stripe), then sets
// a signed access cookie and sends the customer to the film.
//
// Also sends purchase confirmation emails (customer receipt + internal
// notification) — but only once per session. There's no database here, so
// idempotency is done by checking whether the request already carries a
// valid access cookie for this exact session_id: if it does, this is a
// repeat visit (e.g. a page refresh) and the email already went out the
// first time through.

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { signAccessToken, verifyAccessToken, ACCESS_COOKIE } from "@/lib/access"
import { sendPurchaseEmails } from "@/lib/purchase-email"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" })
}

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id")
  if (!sessionId) return NextResponse.redirect(`${BASE_URL}/watch`)

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== "paid") {
      return NextResponse.redirect(`${BASE_URL}/watch`)
    }

    // Idempotency check: has this exact session already been verified before?
    const existingCookie = req.cookies.get(ACCESS_COOKIE)?.value
    const alreadyVerified =
      verifyAccessToken(existingCookie) && existingCookie?.split(".")[0] === sessionId

    if (!alreadyVerified) {
      const email = session.customer_details?.email ?? session.customer_email
      if (email) {
        try {
          await sendPurchaseEmails({
            sessionId,
            customerEmail: email,
            customerName:  session.customer_details?.name ?? null,
            amount:        session.amount_total ?? 0,
          })
        } catch (err) {
          // Don't block the redirect on an email failure — the purchase itself
          // already succeeded and the customer still needs access.
          console.error("[verify-purchase] Failed to send confirmation email:", err)
        }
      } else {
        console.error(`[verify-purchase] No customer email on session ${sessionId}, skipping confirmation email`)
      }
    }

    const token = signAccessToken(sessionId)
    const response = NextResponse.redirect(`${BASE_URL}/watch?purchased=1`)
    response.cookies.set(ACCESS_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365 * 5, // 5 years — "lifetime access, no expiry" in practical terms
      path: "/",
    })
    return response
  } catch (err) {
    console.error("[verify-purchase] Failed to verify session:", err)
    return NextResponse.redirect(`${BASE_URL}/watch`)
  }
}
