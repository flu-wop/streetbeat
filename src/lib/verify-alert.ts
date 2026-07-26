// src/lib/verify-alert.ts
// If Stripe verification throws AFTER a real payment succeeded (network
// blip, transient Stripe API issue), the customer gets silently bounced
// back to /watch with no access and no record anywhere — Streetbeat has no
// database to fall back on. This makes sure a real person gets pinged
// instead of the failure just vanishing into a log line.

import { Resend } from "resend"

function getResend() { return new Resend(process.env.RESEND_API_KEY) }

export async function alertVerifyFailure(sessionId: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  const from = process.env.RESEND_FROM_EMAIL ?? "orders@midcitysound.com"
  const to   = process.env.RESEND_TO_EMAIL   ?? "midcitysound1@gmail.com"

  try {
    await getResend().emails.send({
      from,
      to,
      subject: "⚠️ Street Beat purchase verification failed",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px">
          <h2 style="color:#c0392b;margin:0 0 12px">Possible paid-but-locked-out customer</h2>
          <p style="font-size:14px;line-height:1.6">
            Someone completed Stripe checkout for Street Beat, but verifying the session
            afterward threw an error — they may have been charged without getting access.
            Check this session in Stripe directly; if it's paid, grant access manually or
            have them retry the link.
          </p>
          <table style="width:100%;border-collapse:collapse;font-size:13px;margin-top:16px">
            <tr><td style="padding:6px 0;color:#666">Stripe Session</td><td style="font-family:monospace">${sessionId}</td></tr>
            <tr><td style="padding:6px 0;color:#666">Error</td><td>${message}</td></tr>
          </table>
          <p style="margin-top:20px">
            <a href="https://dashboard.stripe.com/payments/${sessionId}" style="color:#0066cc">View in Stripe →</a>
          </p>
        </div>
      `,
    })
  } catch (alertErr) {
    console.error("[verify-alert] FAILED TO SEND ALERT EMAIL. Original error:", error, "Alert error:", alertErr)
  }
}
