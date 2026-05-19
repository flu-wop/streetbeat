// src/app/watch/page.tsx — PURCHASE / PAYWALL PAGE
// Single price: $5.00 Own Forever. Rental option removed.
//
// STRIPE INTEGRATION:
//   Create /app/api/checkout/route.ts:
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card", "apple_pay", "google_pay"],
//       line_items: [{ price_data: { currency:"usd", unit_amount:599,
//         product_data:{ name:"Street Beat: Drumming Below Sea Level" }}, quantity:1 }],
//       mode: "payment",
//       success_url: `${baseUrl}/watch/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${baseUrl}/watch`,
//     })
//     return Response.json({ url: session.url })
//
//   On success page: verify session → set httpOnly cookie → show video iframe.

"use client"

import { useState }   from "react"
import Link           from "next/link"
import Image          from "next/image"
import {
  Play, Lock, CheckCircle2, Clock,
  ShieldCheck, CreditCard, Apple,
  Monitor, Captions, ShoppingCart,
} from "lucide-react"
import { Button }    from "@/components/ui/button"
import { Badge }     from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn }        from "@/lib/utils"

export default function WatchPage() {
  const [loading,   setLoading]   = useState(false)
  const [hasAccess, setHasAccess] = useState(false) // ← set from cookie/JWT verification

  async function handlePurchase() {
    setLoading(true)
    // ── STRIPE: wire up when ready ────────────────────────────────────────
    // const res = await fetch("/api/checkout", { method: "POST" })
    // const { url } = await res.json()
    // window.location.href = url
    // ─────────────────────────────────────────────────────────────────────
    // TODO: remove this alert and uncomment the Stripe block above
    setLoading(false)
    alert("Stripe checkout coming soon. Payment not yet enabled.")
  }

  return (
    <div className="pt-16 min-h-screen bg-studio-black">

      {/* ── Header ── */}
      <section className="py-16 px-6 border-b border-studio-border/40 bg-studio-charcoal relative overflow-hidden">
        {/* Poster thumbnail on right — desktop only */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
          <Image src="/images/streetbeat-poster.png" alt="" fill className="object-cover object-center opacity-40" sizes="33vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-studio-charcoal to-transparent" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center sm:text-left">
          <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">Watch Now</Badge>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-3 leading-tight">
            Street Beat
            <br />
            <span className="text-gold-gradient italic text-3xl md:text-4xl font-light">
              Drumming Below Sea Level
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-mist text-xs"><Clock className="w-3.5 h-3.5 text-gold/60" />54 minutes</span>
            <Separator orientation="vertical" className="h-3" />
            <span className="text-mist text-xs">Mid City Sound Production</span>
            <Separator orientation="vertical" className="h-3" />
            <span className="text-mist text-xs">2025</span>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="mx-auto max-w-3xl px-6 py-14">

        {hasAccess ? (
          /* ── UNLOCKED ── */
          <div className="space-y-8">
            <div className="flex items-center gap-2" style={{ color: "#1D9E75" }}>
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Purchase Confirmed — Enjoy the Film</span>
            </div>

            {/*
              ── VIDEO PLAYER ─────────────────────────────────────────────────
              Replace src with your unlisted YouTube or private Vimeo URL.
              The trailer ID JgqTdAVGwUc is a placeholder.
              ─────────────────────────────────────────────────────────────────
            */}
            <div
              className="relative aspect-video rounded-sm overflow-hidden border border-studio-border/60"
              style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,119,0.06)" }}
            >
              <iframe
                src="https://www.youtube.com/embed/JgqTdAVGwUc?rel=0&modestbranding=1&autoplay=1"
                title="Street Beat: Drumming Below Sea Level"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="border border-studio-border/40 rounded-sm p-4 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-gold/50 shrink-0 mt-0.5" />
              <p className="text-mist text-xs leading-relaxed">
                This is a protected stream. For support, contact{" "}
                <a href="mailto:midcitysound1@gmail.com" className="text-gold hover:underline">midcitysound1@gmail.com</a>
              </p>
            </div>
          </div>

        ) : (
          /* ── PAYWALL ── */
          <div className="space-y-8">

            {/* Lock screen preview */}
            <div className="relative aspect-video rounded-sm overflow-hidden border border-studio-border/60 bg-studio-dark">
              {/* Poster blurred behind lock */}
              <Image src="/images/streetbeat-poster.png" alt="" fill className="object-cover opacity-[0.45] blur-sm" sizes="800px" />
              <div className="absolute inset-0 bg-studio-black/60 flex flex-col items-center justify-center gap-5 text-center px-8">
                <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center bg-studio-black/60 backdrop-blur-sm">
                  <Lock className="w-7 h-7 text-gold/60" />
                </div>
                <div>
                  <p className="font-display text-2xl text-cream">Purchase to Watch</p>
                  <p className="text-mist text-sm mt-1">$5.00 · One-time purchase · No subscription.</p>
                </div>
              </div>
            </div>

            {/* Purchase card */}
            <div
              className="border border-gold/25 rounded-sm overflow-hidden"
              style={{ boxShadow: "0 0 40px rgba(212,175,119,0.06)" }}
            >
              <div className="p-8 space-y-6">

                {/* Price */}
                <div className="text-center space-y-2">
                  <p className="font-display text-7xl text-gold leading-none">
                    $5<span className="text-4xl text-gold/70">.00</span>
                  </p>
                  <p className="text-mist text-sm">One-time · Own forever · No subscription</p>
                </div>

                {/* Apple Pay / Google Pay placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={handlePurchase}
                    className="h-12 bg-studio-black border border-studio-border rounded-sm flex items-center justify-center gap-2 text-cream hover:border-gold/40 transition-all text-sm font-medium">
                    <Apple className="w-5 h-5" /> Apple Pay
                  </button>
                  <button onClick={handlePurchase}
                    className="h-12 bg-studio-black border border-studio-border rounded-sm flex items-center justify-center gap-2 text-cream hover:border-gold/40 transition-all text-sm font-medium">
                    <span className="text-base font-semibold">G</span> Google Pay
                  </button>
                </div>

                <div className="flex items-center gap-3 text-mist/40">
                  <div className="flex-1 h-px bg-studio-border" />
                  <span className="text-[11px]">or pay with card</span>
                  <div className="flex-1 h-px bg-studio-border" />
                </div>

                {/* Card input placeholder */}
                <div className="border border-dashed border-studio-border/50 rounded-sm p-4 text-center">
                  <p className="text-mist/40 text-[11px]">
                    Wire up Stripe Elements or use a Stripe Payment Link — see comments in watch/page.tsx
                  </p>
                </div>

                {/* Main CTA */}
                <button
                  onClick={handlePurchase}
                  disabled={loading}
                  className="w-full h-14 bg-gold text-studio-black text-[14px] font-bold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-studio-black/30 border-t-studio-black rounded-full animate-spin" />
                      Processing…
                    </span>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" />Purchase for $5.00</>
                  )}
                </button>

                {/* Trust signals */}
                <div className="flex flex-wrap justify-center gap-5 text-mist/50 text-xs pt-1">
                  {[
                    { icon: ShieldCheck, text: "Secure payment" },
                    { icon: CreditCard,  text: "Powered by Stripe" },
                    { icon: Monitor,     text: "Any device" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />{text}
                    </div>
                  ))}
                </div>
              </div>

              {/* What You Get */}
              <div className="border-t border-studio-border/40 px-8 py-5 bg-studio-dark">
                <p className="text-[10px] tracking-[0.2em] uppercase text-mist/50 mb-3">What You Get</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "54-Minute Documentary in HD",
                    "Lifetime Access — No Expiry",
                    "Stream on Any Device",
                    "Closed Captions Included",
                    "Email Receipt with Link",
                    "Supports NOLA Independent Film",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-cream/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/40 shrink-0" />{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Group screening note */}
            <div className="border border-studio-border/40 rounded-sm p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <Monitor className="w-4 h-4 text-gold/50 shrink-0 mt-0.5" />
              <div>
                <p className="text-cream text-sm font-medium mb-1">Group / Classroom Screening?</p>
                <p className="text-mist text-xs mb-2">Educational institutions, film societies, and venues — reach out for group licensing.</p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
