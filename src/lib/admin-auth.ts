// src/lib/admin-auth.ts
// Cookie session for server-rendered admin pages (/admin/insights).
// Signed with ADMIN_ACCESS_SECRET (the same independently rotatable secret the
// System page uses; NOT STREETBEAT_ACCESS_SECRET, which signs customer access).
// Rotating the secret signs every admin session out. Customers are unaffected.
import "server-only"
import { createHmac, timingSafeEqual } from "crypto"
import { cookies } from "next/headers"

export const ADMIN_COOKIE = "sb_admin"
const MAX_AGE_S = 60 * 60 * 24 * 7

function sign(exp: string): string {
  return createHmac("sha256", process.env.ADMIN_ACCESS_SECRET ?? "").update(`sb-admin:${exp}`).digest("hex")
}

export function safeEqual(a: string, b: string): boolean {
  const ha = createHmac("sha256", "cmp").update(a).digest()
  const hb = createHmac("sha256", "cmp").update(b).digest()
  return timingSafeEqual(ha, hb)
}

export function makeSession(): { value: string; maxAge: number } {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE_S)
  return { value: `${exp}.${sign(exp)}`, maxAge: MAX_AGE_S }
}

export async function isAdmin(): Promise<boolean> {
  if (!process.env.ADMIN_ACCESS_SECRET) return false
  const raw = (await cookies()).get(ADMIN_COOKIE)?.value
  if (!raw) return false
  const [exp, sig] = raw.split(".")
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false
  return safeEqual(sig, sign(exp))
}
