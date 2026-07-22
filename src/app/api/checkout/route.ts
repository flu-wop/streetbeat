// src/app/api/checkout/route.ts
// Creates a one-time $10 Stripe Checkout session for the film purchase.

import { NextResponse } from "next/server"
import Stripe from "stripe"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" })
}

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"

export async function POST() {
  try {
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "Street Beat: Drumming Below Sea Level",
            description: "54-minute documentary — lifetime access, own forever",
          },
          unit_amount: 1000, // $10.00
        },
        quantity: 1,
      }],
      success_url: `${BASE_URL}/api/verify-purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/watch`,
      custom_text: {
        submit: { message: "Lifetime access — no subscription, no expiry." },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("[checkout] Failed to create session:", err)
    return NextResponse.json({ error: "Could not start checkout — please try again." }, { status: 500 })
  }
}
