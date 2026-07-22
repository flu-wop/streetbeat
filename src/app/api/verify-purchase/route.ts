// src/app/api/verify-purchase/route.ts
// Stripe redirects here after checkout. Verifies the session actually paid
// (never trust the redirect alone — always re-check with Stripe), then sets
// a signed access cookie and sends the customer to the film.

import { NextResponse } from "next/server"
import Stripe from "stripe"
import { signAccessToken, ACCESS_COOKIE } from "@/lib/access"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" })
}

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"

export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get("session_id")
  if (!sessionId) return NextResponse.redirect(`${BASE_URL}/watch`)

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status !== "paid") {
      return NextResponse.redirect(`${BASE_URL}/watch`)
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
