// src/lib/magic-link.ts
// Short-lived, single-purpose token proving someone controls a given email
// address — NOT the same as the long-lived access cookie in access.ts.
// A magic link only proves "I opened this email"; once verified, we still
// re-check purchase status (legacy_purchases + Stripe) before granting real
// access, rather than trusting stale data baked into the link itself.

import { createHmac, timingSafeEqual } from "crypto"

const LINK_LENGTH_MS = 1000 * 60 * 30 // 30 minutes

function secret(): string {
  const s = process.env.STREETBEAT_ACCESS_SECRET
  if (!s) throw new Error("STREETBEAT_ACCESS_SECRET is not set")
  return s
}

export function signMagicLinkToken(email: string): string {
  const expires = Date.now() + LINK_LENGTH_MS
  // JSON-encode the payload rather than delimiter-joining raw strings —
  // email addresses routinely contain '.', which would break a naive split.
  const payload = JSON.stringify({ email, expires })
  const sig = createHmac("sha256", secret()).update(payload).digest("hex")
  return Buffer.from(JSON.stringify({ payload, sig })).toString("base64url")
}

/** Returns the verified email, or null if the token is invalid/expired. */
export function verifyMagicLinkToken(token: string | undefined | null): string | null {
  if (!token) return null

  let payload: string, sig: string
  try {
    const outer = JSON.parse(Buffer.from(token, "base64url").toString("utf8"))
    payload = outer.payload
    sig = outer.sig
    if (typeof payload !== "string" || typeof sig !== "string") return null
  } catch {
    return null
  }

  const expected = createHmac("sha256", secret()).update(payload).digest("hex")
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return null
  if (!timingSafeEqual(a, b)) return null

  let email: string, expires: number
  try {
    const inner = JSON.parse(payload)
    email = inner.email
    expires = inner.expires
    if (typeof email !== "string" || typeof expires !== "number") return null
  } catch {
    return null
  }

  if (Date.now() > expires) return null
  return email
}
