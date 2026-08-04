// src/app/api/admin/send-legacy-announcement/route.ts
// Bulk send to everyone in legacy_purchases, announcing the rebuilt site
// with their personal access link baked in, plus a push toward the merch
// store. Streetbeat has no admin auth system, so this is protected by
// requiring STREETBEAT_ACCESS_SECRET as a bearer token instead. Safe to
// re-trigger — it's a plain announcement send, not state-changing.
//
// Supports splitting the list across multiple sends via ?batch=N&of=M
// (1-indexed), so you can send half today and the rest tomorrow without
// duplicating anyone. The list is sorted by email first so the split is
// stable across calls — batch 1 of 2 today and batch 2 of 2 tomorrow will
// never overlap or skip someone, even if new legacy rows get added between
// sends (new rows just land in whichever half they alphabetically fall in).
//
// Trigger with:
//   curl -X POST "https://streetbeat.video/api/admin/send-legacy-announcement?batch=1&of=2" \
//     -H "Authorization: Bearer $STREETBEAT_ACCESS_SECRET"
//   curl -X POST "https://streetbeat.video/api/admin/send-legacy-announcement?batch=2&of=2" \
//     -H "Authorization: Bearer $STREETBEAT_ACCESS_SECRET"
//
// Omit ?batch/&of entirely to send to everyone in one go, same as before.

import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getDB, initDB } from "@/lib/db"
import { signAccessToken } from "@/lib/access"

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"

function getResend() { return new Resend(process.env.RESEND_API_KEY) }

// Site palette (tailwind.config.ts) — kept in lockstep with the live site:
//   studio.black #090909 · studio.charcoal #111111 · studio.border #2A2A2A
//   gold DEFAULT #D4AF77 · gold.light #E8C97A · cream #F5EDD8 · mist #A89880
// Fonts: the site uses Cormorant Garamond (display) + DM Sans (body) via
// next/font. Email clients vary wildly on custom font support, so this
// pulls the same two families from Google Fonts for clients that honor it
// (Apple Mail, most webmail) and falls back to Georgia/system-ui — which is
// exactly what the site's own tailwind fontFamily fallback chain does —
// for the clients that strip it (Gmail app, Outlook desktop).
function announcementHtml(link: string): string {
  return `
    <div style="background:#090909;padding:32px 16px">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=DM+Sans:wght@400;600&display=swap');
      </style>
      <div style="font-family:'DM Sans',system-ui,sans-serif;max-width:480px;margin:0 auto;background:#090909;color:#f5edd8;border:1px solid #2a2a2a;border-radius:4px;overflow:hidden">

        <!-- Header — mirrors the site navbar: logo mark + wordmark + kicker -->
        <div style="padding:24px 28px;border-bottom:1px solid #2a2a2a;text-align:left">
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            <tr>
              <td style="padding-right:10px">
                <img src="${BASE_URL}/favicon.png" width="28" height="28" alt="Street Beat"
                     style="display:block;border-radius:2px" />
              </td>
              <td>
                <div style="font-family:'Cormorant Garamond',Georgia,serif;font-size:15px;letter-spacing:0.1em;color:#f5edd8">Street Beat</div>
                <div style="font-size:8px;letter-spacing:0.22em;text-transform:uppercase;color:#a89880;margin-top:2px">Drumming Below Sea Level</div>
              </td>
            </tr>
          </table>
        </div>

        <div style="padding:32px 28px">
          <h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:24px;font-weight:500;margin:0 0 20px;color:#f5edd8">
            The site's been rebuilt — come see it
          </h1>
          <p style="font-size:14px;line-height:1.6;color:#a89880;margin:0 0 24px">
            You purchased <em>Street Beat: Drumming Below Sea Level</em> a while back. We've since rebuilt the whole
            site from the ground up — faster, cleaner, and still yours to watch anytime with the link below. No
            expiration, no re-purchase, nothing to do but click.
          </p>
          <p style="margin:0 0 28px">
            <a href="${link}" style="display:inline-block;background:#d4af77;color:#090909;padding:14px 28px;
               text-decoration:none;font-weight:600;font-size:13px;letter-spacing:0.02em;border-radius:2px">Watch Now</a>
          </p>

          <hr style="border:none;border-top:1px solid #2a2a2a;margin:0 0 28px" />

          <p style="font-size:14px;line-height:1.6;color:#a89880;margin:0 0 16px">
            We've also opened a small merch store — shirts and prints that help keep stories like this one getting
            made. If the film meant something to you, it'd mean a lot to us.
          </p>
          <p style="margin:0">
            <a href="https://midcitysound.com/merch/brand/streetbeat" style="display:inline-block;background:transparent;color:#d4af77;
               padding:12px 26px;text-decoration:none;font-weight:600;font-size:13px;letter-spacing:0.02em;
               border-radius:2px;border:1px solid #d4af77">Shop the Merch</a>
          </p>
        </div>

        <div style="padding:20px 28px;border-top:1px solid #2a2a2a">
          <p style="font-size:11px;color:#666;margin:0 0 8px">Lost this email later? You can always get a new link at streetbeat.video/watch.</p>
          <p style="font-size:11px;color:#666;margin:0">Mid City Sound · New Orleans, LA</p>
        </div>
      </div>
    </div>
  `
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization")
  const expected = `Bearer ${process.env.STREETBEAT_ACCESS_SECRET}`
  if (!process.env.STREETBEAT_ACCESS_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const batch = searchParams.get("batch") ? parseInt(searchParams.get("batch")!, 10) : null
  const of = searchParams.get("of") ? parseInt(searchParams.get("of")!, 10) : null

  if ((batch !== null) !== (of !== null)) {
    return NextResponse.json({ error: "Provide both batch and of, or neither." }, { status: 400 })
  }
  if (batch !== null && of !== null && (batch < 1 || of < 1 || batch > of)) {
    return NextResponse.json({ error: "batch must be between 1 and of." }, { status: 400 })
  }

  await initDB()
  const result = await getDB().execute(
    `SELECT DISTINCT email, order_ref FROM legacy_purchases GROUP BY email ORDER BY email ASC`
  )
  let purchasers = result.rows.map(r => ({ email: r.email as string, orderRef: r.order_ref as string }))

  if (batch !== null && of !== null) {
    const chunkSize = Math.ceil(purchasers.length / of)
    const start = (batch - 1) * chunkSize
    purchasers = purchasers.slice(start, start + chunkSize)
  }

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
        subject: "Street Beat has a new home (and a merch store)",
        html: announcementHtml(link),
      })
      sent++
    } catch (err) {
      failures.push({ email: p.email, error: err instanceof Error ? err.message : String(err) })
    }
    // Light throttle between sends, defensive against provider rate limits.
    await new Promise(r => setTimeout(r, 150))
  }

  return NextResponse.json({
    batch: batch ?? "all", of: of ?? 1,
    total: purchasers.length, sent, failed: failures.length, failures,
  })
}
