// src/app/api/stripe/webhook/route.ts
// Stripe webhook — the backstop for buyers who pay but never land back on
// /api/verify-purchase (closed the tab, lost connection, Stripe redirect failed).
// Without it they'd get no receipt and no access link until they found the
// email-recovery flow on their own.
//
// On a paid checkout.session.completed (or a delayed payment that later
// succeeds) it sends the same receipt + sale notification that
// verify-purchase sends. Both paths use the same Resend idempotency keys
// (see lib/purchase-email.ts), so a buyer who does come back still gets one
// receipt, not two. The Meta purchase event dedupes on event_id = session id.
//
// Access itself needs no state: the receipt carries a signed /api/claim-access
// link, and request-access can always look the buyer up in Stripe.
//
// Register in Stripe Dashboard → Developers → Webhooks:
//   URL:    https://streetbeat.video/api/stripe/webhook
//   Events: checkout.session.completed, checkout.session.async_payment_succeeded
// Then set STRIPE_WEBHOOK_SECRET (whsec_…) in Vercel and redeploy.

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { sendPurchaseEmails } from "@/lib/purchase-email"
import { sendPurchaseEvent } from "@/lib/meta-capi"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" })
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set")
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })
  }

  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  // Signature verification needs the exact raw body, so read text, not JSON.
  const rawBody = await req.text()
  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret)
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed:", (err as Error).message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  if (
    event.type !== "checkout.session.completed" &&
    event.type !== "checkout.session.async_payment_succeeded"
  ) {
    return NextResponse.json({ received: true })
  }

  const session = event.data.object as Stripe.Checkout.Session

  // checkout.session.completed also fires for delayed payment methods before
  // the money clears; those arrive later as async_payment_succeeded.
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true, skipped: "not paid yet" })
  }

  const email = session.customer_details?.email ?? session.customer_email
  if (!email) {
    console.error(`[stripe-webhook] No customer email on session ${session.id}`)
    return NextResponse.json({ received: true, skipped: "no email" })
  }

  try {
    await sendPurchaseEmails({
      sessionId:     session.id,
      customerEmail: email,
      customerName:  session.customer_details?.name ?? null,
      amount:        session.amount_total ?? 0,
    })
  } catch (err) {
    // Return 500 so Stripe retries; the idempotency keys keep retries from
    // sending duplicate receipts.
    console.error(`[stripe-webhook] Email send failed for ${session.id}:`, err)
    return NextResponse.json({ error: "Email send failed" }, { status: 500 })
  }

  await sendPurchaseEvent({
    sessionId:     session.id,
    customerEmail: email,
    amountCents:   session.amount_total ?? 0,
  })

  return NextResponse.json({ received: true })
}
