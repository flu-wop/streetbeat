// src/app/api/admin/send-legacy-announcement/route.ts
// One-time bulk send to everyone in legacy_purchases, announcing the
// rebuilt site with their personal access link baked in. Streetbeat has no
// admin auth system, so this is protected by requiring
// STREETBEAT_ACCESS_SECRET as a bearer token instead — not meant to be a
// permanently-called route, just triggered once (or safely re-triggered;
// it's a plain announcement send, not state-changing, so re-running it
// just re-sends the same email).
//
// Trigger with:
//   curl -X POST https://streetbeat.video/api/admin/send-legacy-announcement \
//     -H "Authorization: Bearer $STREETBEAT_ACCESS_SECRET"

import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getDB, initDB } from "@/lib/db"
import { signAccessToken } from "@/lib/access"

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"

function getResend() { return new Resend(process.env.RESEND_API_KEY) }

function announcementHtml(link: string): string {
  return `
    <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0e0e0e;color:#f5edd8">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d4af77;margin:0 0 4px">Street Beat</p>
      <h1 style="font-size:22px;margin:0 0 20px;font-weight:500">It's still here, waiting</h1>
      <p style="font-size:14px;line-height:1.6;color:#a89880">
        You purchased <em>Street Beat: Drumming Below Sea Level</em> a while back — the site's been rebuilt from the
        ground up. Click below to check it out and watch anytime — this link doesn't expire.
      </p>
      <p style="margin:28px 0">
        <a href="${link}" style="display:inline-block;background:#d4af77;color:#0e0e0e;padding:14px 28px;
           text-decoration:none;font-weight:600;border-radius:2px">Watch Now</a>
      </p>
      <p style="font-size:11px;color:#666">Lost this email later? You can always get a new link at streetbeat.video/watch.</p>
      <p style="font-size:11px;color:#666;margin-top:24px">Mid City Sound · New Orleans, LA</p>
    </div>
  `
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")
  const expected = `Bearer ${process.env.STREETBEAT_ACCESS_SECRET}`
  if (!process.env.STREETBEAT_ACCESS_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await initDB()
  const result = await getDB().execute(`SELECT DISTINCT email, order_ref FROM legacy_purchases GROUP BY email`)
  const purchasers = result.rows.map(r => ({ email: r.email as string, orderRef: r.order_ref as string }))

  const resend = getResend()
  const from = process.env.RESEND_FROM_EMAIL ?? "orders@midcitysound.com"

  let sent = 0
  const failures: { email: string; error: string }[] = []

  for (const p of purchasers) {
    try {
      const accessToken = signAccessToken(`legacy:${p.orderRef}`)
      const link = `${BASE_URL}/api/claim-access?token=${accessToken}`
      await resend.emails.send({
        from,
        to: p.email,
        subject: "Still haven't watched? Street Beat is ready when you are",
        html: announcementHtml(link),
      })
      sent++
    } catch (err) {
      failures.push({ email: p.email, error: err instanceof Error ? err.message : String(err) })
    }
    // Light throttle between sends, defensive against provider rate limits.
    await new Promise(r => setTimeout(r, 150))
  }

  return NextResponse.json({ total: purchasers.length, sent, failed: failures.length, failures })
}
