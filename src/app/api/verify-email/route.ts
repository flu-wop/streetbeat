// src/app/api/verify-email/route.ts
// The magic link destination. Verifies the short-lived email-ownership
// token, then re-checks purchase status (not trusting anything baked into
// the link itself) before granting real, long-lived access.

import { NextResponse } from "next/server"
import { verifyMagicLinkToken } from "@/lib/magic-link"
import { findPurchaseByEmail } from "@/lib/purchase-lookup"
import { signAccessToken, ACCESS_COOKIE } from "@/lib/access"

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get("token")

  const email = verifyMagicLinkToken(token)
  if (!email) {
    return NextResponse.redirect(`${BASE_URL}/watch?link_expired=1`)
  }

  const purchase = await findPurchaseByEmail(email)
  if (!purchase) {
    // Extremely unlikely (link was valid but the purchase record vanished
    // between request and click) — send them back to the recovery form.
    return NextResponse.redirect(`${BASE_URL}/watch?not_found=1`)
  }

  const accessToken = signAccessToken(purchase.identifier)
  const response = NextResponse.redirect(`${BASE_URL}/watch?welcome=1`)
  response.cookies.set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365 * 5, // 5 years, same as a fresh purchase
    path: "/",
  })
  return response
}
