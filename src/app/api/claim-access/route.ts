// src/app/api/claim-access/route.ts
// Destination for the permanent link in the purchase confirmation email
// (see purchase-email.ts). Unlike /api/verify-email (the 30-minute recovery
// magic link, which proves email ownership before re-checking purchase
// status), this carries the real signed access token directly — safe to do
// because it's only ever generated right after a purchase we already
// verified with Stripe ourselves in /api/verify-purchase. Clicking it on
// any device just sets that same access cookie there too.

import { NextResponse } from "next/server"
import { verifyAccessToken, ACCESS_COOKIE } from "@/lib/access"

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"

export async function GET(req: Request) {
  const url = new URL(req.url)
  const token = url.searchParams.get("token") ?? undefined

  if (!verifyAccessToken(token)) {
    return NextResponse.redirect(`${BASE_URL}/watch?link_expired=1`)
  }

  const response = NextResponse.redirect(`${BASE_URL}/watch?welcome=1`)
  response.cookies.set(ACCESS_COOKIE, token!, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365 * 5,
    path: "/",
  })
  return response
}
