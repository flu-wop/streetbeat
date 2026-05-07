// src/app/watch/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// WATCH / PAYWALL PAGE
//
// Flow:
//   - Shows rent ($3.99) and buy ($9.99) options
//   - Stripe Checkout integration placeholder (clearly commented)
//   - On successful payment → JWT token issued → video unlocked
//   - The actual video is an iframe (YouTube unlisted OR a private Vimeo embed)
//     protected by checking the session token in the URL or cookie.
//
// STRIPE INTEGRATION POINTS are marked clearly throughout.
// ─────────────────────────────────────────────────────────────────────────────

"use client"

import { useState }    from "react"
import Link            from "next/link"
import {
  Play, Lock, ArrowRight, CheckCircle2,
  Clock, ShieldCheck, CreditCard, X,
} from "lucide-react"
import { Button }    from "@/components/ui/button"
import { Badge }     from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn }        from "@/lib/utils"

/* ─── Pricing plans ── */
const PLANS = [
  {
    id:          "rent",
    label:       "Rent",
    price:       3.99,
    priceId:     "price_rent_placeholder", // ← Swap with real Stripe Price ID
    period:      "48-hour access",
    popular:     true,
    features:    [
      "HD streaming — 48 hours",
      "Watch on any device",
      "Closed captions included",
    ],
  },
  {
    id:          "buy",
    label:       "Buy & Own",
    price:       9.99,
    priceId:     "price_buy_placeholder", // ← Swap with real Stripe Price ID
    period:      "Lifetime access",
    popular:     false,
    features:    [
      "HD streaming — forever",
      "Watch anytime, any device",
      "Downloadable — coming soon",
      "Closed captions included",
      "Email receipt with link",
    ],
  },
]

/*
  ─── HOW THE PAYWALL WORKS ────────────────────────────────────────────────────

  OPTION A — Stripe Payment Links (simplest, no backend needed):
    1. Create two Stripe Payment Links in your dashboard (one for rent, one for buy)
    2. Set success_url to https://streetbeat.video/watch/success?session={CHECKOUT_SESSION_ID}
    3. Replace the handleCheckout function below with a direct link to the Payment Link URL

  OPTION B — Stripe Checkout with API route (recommended for access control):
    1. Create /app/api/checkout/route.ts:
         const session = await stripe.checkout.sessions.create({
           line_items: [{ price: priceId, quantity: 1 }],
           mode: "payment",
           success_url: `${baseUrl}/watch/success?session_id={CHECKOUT_SESSION_ID}`,
           cancel_url: `${baseUrl}/watch`,
           metadata: { plan: "rent" | "buy" },
         })
         return Response.json({ url: session.url })
    2. On the success page, verify the session and set a cookie/JWT
    3. The video iframe only renders if the cookie is valid
    4. For "rent", use a 48h expiry on the cookie/JWT

  VIDEO HOSTING:
    - YouTube unlisted: embed the unlisted URL (anyone with the link can watch)
    - Vimeo with domain restriction: embed with ?h= privacy hash, domain locked to streetbeat.video
    - Self-hosted on Vercel + S3/R2: stream from your own CDN behind a signed URL
    Current trailer ID: JgqTdAVGwUc
    Full film: add a DIFFERENT private/unlisted video ID for the paid version
  ──────────────────────────────────────────────────────────────────────────────
*/

export default function WatchPage() {
  const [selected,  setSelected]  = useState<"rent" | "buy">("rent")
  const [loading,   setLoading]   = useState(false)
  // In production: check for valid purchase cookie/token here
  const [hasAccess, setHasAccess] = useState(false) // ← Set from cookie/JWT check

  async function handleCheckout() {
    setLoading(true)
    const plan = PLANS.find(p => p.id === selected)

    /*
      ─── STRIPE CHECKOUT (Option B) ──────────────────────────────────────────
      Uncomment and wire up your API route:

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: plan?.priceId, plan: selected }),
      })
      const { url } = await res.json()
      window.location.href = url  // redirect to Stripe Checkout

      ─── STRIPE PAYMENT LINK (Option A, no API needed) ────────────────────────
      window.location.href = selected === "rent"
        ? "https://buy.stripe.com/YOUR_RENT_LINK"
        : "https://buy.stripe.com/YOUR_BUY_LINK"
      ─────────────────────────────────────────────────────────────────────────
    */

    // DEMO ONLY — simulate payment and unlock
    await new Promise(r => setTimeout(r, 1400))
    setLoading(false)
    setHasAccess(true) // In production this comes from a verified Stripe webhook
  }

  return (
    <div className="pt-16 min-h-screen bg-studio-black">

      {/* ── Page header ── */}
      <section className="py-16 px-6 border-b border-studio-border/40 bg-studio-charcoal">
        <div className="mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">
            Watch Now
          </Badge>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-3 leading-tight">
            Street Beat
            <br />
            <span className="text-gold-gradient italic text-3xl md:text-4xl font-light">
              Drumming Below Sea Level
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-mist text-xs"><Clock className="w-3.5 h-3.5 text-gold/60" /> 53 minutes</span>
            <Separator orientation="vertical" className="h-3" />
            <span className="text-mist text-xs">Mid City Sound Production</span>
            <Separator orientation="vertical" className="h-3" />
            <span className="text-mist text-xs">Released April 2025</span>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-4xl px-6 py-14">

        {hasAccess ? (
          /* ══ UNLOCKED — show the film ══════════════════════════════════ */
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-nola-lime">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Access granted — enjoy the film</span>
            </div>

            {/*
              ── VIDEO PLAYER ──────────────────────────────────────────────────
              Replace the src below with:
              - YouTube unlisted: https://www.youtube.com/embed/FULL_FILM_VIDEO_ID?rel=0
              - Vimeo private:    https://player.vimeo.com/video/YOUR_ID?h=PRIVACY_HASH
              - The trailer ID JgqTdAVGwUc is a placeholder here
              ─────────────────────────────────────────────────────────────────
            */}
            <div className="relative aspect-video rounded-sm overflow-hidden border border-studio-border/60 shadow-2xl"
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
                This is a protected stream. Please do not share your access link.
                For support, contact us at{" "}
                <a href="mailto:midcitysound@gmail.com" className="text-gold hover:underline">
                  midcitysound@gmail.com
                </a>
              </p>
            </div>
          </div>

        ) : (
          /* ══ PAYWALL — choose plan + pay ══════════════════════════════ */
          <div className="space-y-10">

            {/* Video preview / lock screen */}
            <div className="relative aspect-video rounded-sm overflow-hidden border border-studio-border/60 bg-studio-dark">
              {/* Blurred preview frame — replace with an actual blurred still */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a090a] via-[#141210] to-[#0d0c0a]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(212,175,119,0.08),transparent)]" />

              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-8">
                <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center bg-studio-black/60 backdrop-blur-sm">
                  <Lock className="w-7 h-7 text-gold/60" />
                </div>
                <div className="space-y-2">
                  <p className="font-display text-2xl text-cream">
                    Unlock the full film
                  </p>
                  <p className="text-mist text-sm max-w-xs">
                    Rent for 48 hours or purchase for lifetime access below.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-mist text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                  <span>53 minutes · HD quality · Any device</span>
                </div>
              </div>
            </div>

            {/* Plan selector */}
            <div>
              <h2 className="font-display text-3xl text-cream mb-6">Choose your access</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {PLANS.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => setSelected(plan.id as "rent" | "buy")}
                    className={cn(
                      "relative text-left p-6 border rounded-sm transition-all",
                      selected === plan.id
                        ? "border-gold bg-gold/5"
                        : "border-studio-border bg-studio-card hover:border-gold/40"
                    )}
                  >
                    {plan.popular && (
                      <Badge className="absolute top-4 right-4 text-[9px]">Most Popular</Badge>
                    )}

                    <p className="text-[10px] tracking-[0.2em] uppercase text-mist/60 mb-3">{plan.label}</p>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="font-display text-4xl text-cream">${plan.price.toFixed(2).split(".")[0]}</span>
                      <span className="font-display text-2xl text-mist/60">.{plan.price.toFixed(2).split(".")[1]}</span>
                    </div>
                    <p className="text-mist text-xs mb-5">{plan.period}</p>

                    <ul className="space-y-2">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs text-mist">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0 mt-1" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Selected indicator */}
                    {selected === plan.id && (
                      <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-gold" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment button */}
            <div className="space-y-4">
              <Button
                onClick={handleCheckout}
                disabled={loading}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-studio-black/30 border-t-studio-black rounded-full animate-spin" />
                    Connecting to payment…
                  </span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    {selected === "rent"
                      ? "Rent for $3.99 — Watch Now"
                      : "Buy for $9.99 — Own Forever"}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-5 text-mist/50 text-[10px]">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure payment</span>
                <span className="flex items-center gap-1"><CreditCard className="w-3 h-3" /> Powered by Stripe</span>
              </div>

              {/* Dev note */}
              <div className="border border-dashed border-studio-border/50 rounded-sm p-4">
                <p className="text-mist/40 text-[11px] leading-relaxed">
                  <strong className="text-mist/60">Dev note:</strong> Payment is currently a demo.
                  Wire up Stripe using the comments in <code className="text-gold/50">watch/page.tsx</code>.
                  See OPTION A (Payment Links, no backend) or OPTION B (Checkout API route) above.
                </p>
              </div>
            </div>

            {/* Gift / group access */}
            <div className="border border-studio-border/40 rounded-sm p-5 flex items-start gap-4">
              <div className="w-8 h-8 border border-studio-border rounded-sm flex items-center justify-center shrink-0">
                <Play className="w-3.5 h-3.5 text-gold/50" />
              </div>
              <div>
                <p className="text-cream text-sm font-medium mb-1">Group / classroom screening?</p>
                <p className="text-mist text-xs mb-2">
                  Educational institutions, film societies, and venues — reach out for group licensing.
                </p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/contact">
                    Contact us <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
