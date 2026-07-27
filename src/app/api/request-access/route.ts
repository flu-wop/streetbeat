// src/app/api/request-access/route.ts
// The recovery-path entry point: someone who already purchased (legacy
// Squarespace or live Stripe) but lost their access cookie enters their
// email here. If a real purchase is found, they get emailed a magic link.
//
// Deliberately returns the real found/not-found result rather than a vague
// "check your email either way" response — for a low-stakes $10 documentary
// purchase, clear UX (telling someone plainly "we can't find that, here's
// where to buy it") matters more than defending against email enumeration.

import { NextResponse } from "next/server"
import { Resend } from "resend"
import { findPurchaseByEmail } from "@/lib/purchase-lookup"
import { signMagicLinkToken } from "@/lib/magic-link"
import { rateLimit, clientIp } from "@/lib/rate-limit"

const BASE_URL = process.env.NEXT_PUBLIC_URL ?? "https://streetbeat.video"

function getResend() { return new Resend(process.env.RESEND_API_KEY) }

export async function POST(req: Request) {
  try {
    const ok = await rateLimit(`request-access:${clientIp(req)}`, 5, 600) // 5 per 10 min
    if (!ok) return NextResponse.json({ error: "Too many requests — try again shortly." }, { status: 429 })

    const { email } = await req.json()
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required." }, { status: 400 })
    }

    const purchase = await findPurchaseByEmail(email)
    if (!purchase) {
      return NextResponse.json({
        found: false,
        message: "We couldn't find a purchase with that email.",
      })
    }

    const token = signMagicLinkToken(email.trim().toLowerCase())
    const link = `${BASE_URL}/api/verify-email?token=${token}`
    const from = process.env.RESEND_FROM_EMAIL ?? "orders@midcitysound.com"

    await getResend().emails.send({
      from,
      to: email,
      subject: "Your Street Beat access link",
      html: `
        <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#0e0e0e;color:#f5edd8">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#d4af77;margin:0 0 4px">Street Beat</p>
          <h1 style="font-size:22px;margin:0 0 20px;font-weight:500">Here's your link</h1>
          <p style="font-size:14px;line-height:1.6;color:#a89880">
            Click below to watch <em>Street Beat: Drumming Below Sea Level</em> — this link expires in 30 minutes.
          </p>
          <p style="margin:28px 0">
            <a href="${link}" style="display:inline-block;background:#d4af77;color:#0e0e0e;padding:14px 28px;
               text-decoration:none;font-weight:600;border-radius:2px">Watch Now</a>
          </p>
          <p style="font-size:11px;color:#666">If you didn't request this, you can ignore this email.</p>
        </div>
      `,
    })

    return NextResponse.json({ found: true, message: "Check your email for your access link." })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
