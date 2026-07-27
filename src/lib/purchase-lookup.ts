// src/lib/purchase-lookup.ts
// Checks whether an email has a real purchase behind it, from either source:
//   1. legacy_purchases — imported from the old Squarespace checkout
//   2. Live Stripe — anyone who bought through the current checkout
// Returns an "access identifier" that gets signed into the long-lived access
// cookie via access.ts's signAccessToken (which just signs an arbitrary
// string — it doesn't care whether it's a real Stripe session ID or a
// synthetic legacy reference).

import Stripe from "stripe"
import { getDB, initDB } from "@/lib/db"

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" })
}

export async function findPurchaseByEmail(rawEmail: string): Promise<{ identifier: string } | null> {
  const email = rawEmail.trim().toLowerCase()
  if (!email) return null

  // 1. Legacy Squarespace purchases
  await initDB()
  const legacyResult = await getDB().execute({
    sql: `SELECT order_ref FROM legacy_purchases WHERE email = ? LIMIT 1`,
    args: [email],
  })
  if (legacyResult.rows.length > 0) {
    const orderRef = legacyResult.rows[0].order_ref as string
    return { identifier: `legacy:${orderRef}` }
  }

  // 2. Live Stripe purchases — same pattern as MCS's /admin/streetbeat page:
  // fetch recent sessions, filter by metadata tag or success_url fallback,
  // match on customer email. Fine at this volume; would need real pagination
  // if this list ever grows past 100 total sessions on the shared account.
  const stripe = getStripe()
  const sessions = await stripe.checkout.sessions.list({ limit: 100 })
  const match = sessions.data.find(s =>
    s.payment_status === "paid" &&
    (s.metadata?.source === "streetbeat-purchase" || s.success_url?.includes("streetbeat.video")) &&
    (s.customer_details?.email?.toLowerCase() === email || s.customer_email?.toLowerCase() === email)
  )
  if (match) {
    return { identifier: match.id }
  }

  return null
}
