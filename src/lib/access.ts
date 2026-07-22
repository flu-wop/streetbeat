// src/lib/access.ts
// Grants lifetime access after a real Stripe purchase, without a database.
// The cookie value is `${stripeSessionId}.${hmacSignature}` — signed with a
// server-only secret, so it can't be forged by just setting an arbitrary
// cookie value in devtools. Verification just recomputes the HMAC and
// compares, no DB lookup needed.

import { createHmac, timingSafeEqual } from "crypto"

export const ACCESS_COOKIE = "streetbeat_access"

function secret(): string {
  const s = process.env.STREETBEAT_ACCESS_SECRET
  if (!s) throw new Error("STREETBEAT_ACCESS_SECRET is not set")
  return s
}

export function signAccessToken(stripeSessionId: string): string {
  const sig = createHmac("sha256", secret()).update(stripeSessionId).digest("hex")
  return `${stripeSessionId}.${sig}`
}

export function verifyAccessToken(token: string | undefined): boolean {
  if (!token) return false
  const [sessionId, sig] = token.split(".")
  if (!sessionId || !sig) return false

  const expected = createHmac("sha256", secret()).update(sessionId).digest("hex")
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
