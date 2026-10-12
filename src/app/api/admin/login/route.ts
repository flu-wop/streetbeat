// src/app/api/admin/login/route.ts
// POST { secret } -> sets the admin session cookie. DELETE -> signs out.
import { NextResponse } from "next/server"
import { ADMIN_COOKIE, makeSession, safeEqual } from "@/lib/admin-auth"
import { rateLimit, clientIp } from "@/lib/rate-limit"

export async function POST(req: Request) {
  const expected = process.env.ADMIN_ACCESS_SECRET
  if (!expected) return NextResponse.json({ error: "Admin is not configured." }, { status: 503 })
  try {
    if (!(await rateLimit(`admin-login:${clientIp(req)}`, 10, 300))) {
      return NextResponse.json({ error: "Too many attempts. Try again in a few minutes." }, { status: 429 })
    }
  } catch { /* if the limiter's DB is down, still check the secret */ }

  let secret = ""
  try { secret = String((await req.json()).secret ?? "") } catch { /* empty */ }
  if (!secret || !safeEqual(secret, expected)) return NextResponse.json({ error: "Wrong secret." }, { status: 401 })

  const s = makeSession()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, s.value, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: s.maxAge })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 })
  return res
}
