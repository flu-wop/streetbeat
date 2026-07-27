// src/lib/db.ts
// Turso (libSQL) client — lazy singleton, only connects when first used.
// This is the SAME database MCS uses (same TURSO_URL/TURSO_TOKEN) — Streetbeat
// only owns and manages legacy_purchases here; MCS's own tables (bookings,
// merch_orders, pending_carts) are defined and migrated from the mcs repo,
// not here.
// Env vars:  TURSO_URL   (libsql://your-db.turso.io)
//            TURSO_TOKEN (your auth token)

import { createClient } from "@libsql/client"

declare global {
  // eslint-disable-next-line no-var
  var __tursoClient: ReturnType<typeof createClient> | undefined
}

export function getDB() {
  if (!process.env.TURSO_URL) {
    throw new Error("TURSO_URL env var is not set")
  }
  if (!global.__tursoClient) {
    global.__tursoClient = createClient({
      url:       process.env.TURSO_URL,
      authToken: process.env.TURSO_TOKEN,
    })
  }
  return global.__tursoClient
}

/* ─── Schema bootstrap (legacy_purchases only — see note above) ────────────── */
export async function initDB() {
  const client = getDB()
  await client.execute(`
    CREATE TABLE IF NOT EXISTS legacy_purchases (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      email        TEXT    NOT NULL,
      source       TEXT    NOT NULL DEFAULT 'squarespace',
      order_ref    TEXT,
      purchased_at TEXT,
      imported_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `)
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_legacy_purchases_email ON legacy_purchases(email)`)
  return client
}
