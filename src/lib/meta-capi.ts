// src/lib/meta-capi.ts
// Sends the server-side "Purchase" event to Meta's Conversions API after a
// verified Stripe payment. Called from /api/verify-purchase — this is the
// event of record for ad optimization/retargeting, since the browser-side
// pixel event alone gets lost to ad blockers and Safari's tracking
// prevention often enough to be unreliable on its own.

import { createHash } from "crypto"

function hashEmail(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex")
}

export interface PurchaseEventPayload {
  sessionId:      string
  customerEmail:  string
  amountCents:    number
  clientIp?:      string | null
  clientUserAgent?: string | null
}

export async function sendPurchaseEvent(p: PurchaseEventPayload): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const token    = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !token) {
    console.error("[meta-capi] Missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN, skipping Purchase event")
    return
  }

  const userData: Record<string, string> = {
    em: hashEmail(p.customerEmail),
  }
  if (p.clientIp)        userData.client_ip_address  = p.clientIp
  if (p.clientUserAgent) userData.client_user_agent  = p.clientUserAgent

  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name:    "Purchase",
          event_time:    Math.floor(Date.now() / 1000),
          event_id:      p.sessionId, // dedupes against the browser-side InitiateCheckout/pixel if ever added
          action_source: "website",
          event_source_url: "https://streetbeat.video/watch",
          user_data:   userData,
          custom_data: {
            currency: "USD",
            value:    p.amountCents / 100,
            content_name: "Street Beat: Drumming Below Sea Level",
          },
        }],
        access_token: token,
      }),
    })
    if (!res.ok) {
      console.error("[meta-capi] Purchase event failed:", res.status, await res.text())
    }
  } catch (err) {
    // Never block the purchase flow on an analytics failure.
    console.error("[meta-capi] Purchase event request threw:", err)
  }
}
