// src/lib/purchase-email.ts
// Sends purchase confirmation emails via Resend after a verified Stripe
// payment: one receipt to the customer, one notification to the studio.
// Called from /api/verify-purchase — see idempotency guard there (this file
// doesn't dedupe on its own, since Streetbeat has no database).

import { Resend } from "resend"
import { signAccessToken } from "@/lib/access"

function getResend() { return new Resend(process.env.RESEND_API_KEY) }

export interface PurchasePayload {
  sessionId:     string
  customerEmail: string
  customerName:  string | null
  amount:        number // cents
}

function customerHtml(p: PurchasePayload): string {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"
  const accessLink = `${baseUrl}/api/claim-access?token=${signAccessToken(p.sessionId)}`
  return `
    <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0e0e0e;color:#f5edd8">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d4af77;margin:0 0 4px">Street Beat</p>
      <h1 style="font-size:22px;margin:0 0 20px;font-weight:500">You're in.</h1>
      <p style="font-size:14px;line-height:1.6;color:#a89880">
        Thanks for picking up <em>Street Beat: Drumming Below Sea Level</em> — lifetime access, no subscription, no expiry.
      </p>
      <p style="margin:24px 0">
        <a href="${accessLink}" style="display:inline-block;background:#d4af77;color:#0e0e0e;padding:14px 28px;
           text-decoration:none;font-weight:600;border-radius:2px">Watch Now</a>
      </p>
      <p style="font-size:12px;color:#666;line-height:1.5">
        This link works on any device, any time — save this email. Switching devices later?
        Just enter your email at <a href="${baseUrl}/watch" style="color:#d4af77">streetbeat.video/watch</a>
        to get a new access link.
      </p>
      <table style="width:100%;border-collapse:collapse;margin-top:20px;font-size:13px">
        <tr><td style="padding:8px 0;color:#666">Amount</td><td style="text-align:right">$${(p.amount / 100).toFixed(2)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Order</td><td style="text-align:right;font-family:monospace;font-size:11px">${p.sessionId.slice(0, 24)}…</td></tr>
      </table>
      <p style="font-size:11px;color:#666;margin-top:24px">Mid City Sound · New Orleans, LA</p>
    </div>
  `
}

function internalHtml(p: PurchasePayload): string {
  return `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <h2 style="margin:0 0 16px">New Street Beat sale</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#666">Customer</td><td>${p.customerName ?? "—"}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${p.customerEmail}">${p.customerEmail}</a></td></tr>
        <tr><td style="padding:6px 0;color:#666">Amount</td><td>$${(p.amount / 100).toFixed(2)}</td></tr>
        <tr><td style="padding:6px 0;color:#666">Session</td><td style="font-family:monospace;font-size:12px">${p.sessionId}</td></tr>
      </table>
    </div>
  `
}

export async function sendPurchaseEmails(purchase: PurchasePayload) {
  const resend = getResend()
  const from = process.env.RESEND_FROM_EMAIL ?? "orders@midcitysound.com"
  const to   = process.env.RESEND_TO_EMAIL   ?? "midcitysound1@gmail.com"

  await Promise.allSettled([
    resend.emails.send({
      from,
      to:      purchase.customerEmail,
      subject: "Your Street Beat purchase — lifetime access",
      html:    customerHtml(purchase),
    }),
    resend.emails.send({
      from,
      to:      to,
      subject: `New Street Beat sale — $${(purchase.amount / 100).toFixed(2)}`,
      html:    internalHtml(purchase),
    }),
  ])
}
