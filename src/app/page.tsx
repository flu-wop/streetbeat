// src/app/page.tsx — Street Beat: Drumming Below Sea Level
// ─────────────────────────────────────────────────────────────────────────────
// Full rebuild matching Mid City Sound dark/gold luxury aesthetic.
// Single purchase price: $5.99 Own Forever. Rental removed.
// Hero uses poster image with cinematic dark overlay.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link              from "next/link"
import Image             from "next/image"
import {
  Play, ArrowRight, Clock, Film,
  MapPin, ChevronDown, Award,
  ShoppingCart, Shield, Monitor, Captions,
} from "lucide-react"
import { Button }    from "@/components/ui/button"
import { Badge }     from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Street Beat: Drumming Below Sea Level | Documentary Film",
  description:
    "A 53-minute documentary exploring the unique drum sound of New Orleans. " +
    "Produced by Mid City Sound & Fire on the Bayou. Own forever for $5.99.",
  openGraph: {
    images: [{ url: "/images/streetbeat-poster.png", width: 1280, height: 720 }],
  },
}

const CREDITS = [
  { role: "Produced by",  name: "Mid City Sound & Fire on the Bayou" },
  { role: "Hosted by",    name: "Doug Belote" },
  { role: "Studio",       name: "Mid City Sound Studios, New Orleans" },
  { role: "Runtime",      name: "53 minutes" },
  { role: "Released",     name: "2025" },
]

const FEATURES = [
  { icon: Monitor,   text: "HD streaming — watch on any device" },
  { icon: Captions,  text: "Closed captions included" },
  { icon: Shield,    text: "Supports independent New Orleans film" },
  { icon: Award,     text: "Own forever — no subscription required" },
]

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO — poster background, cinematic overlay, bottom-anchored  */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden">

        {/*
          ── Poster image background ──────────────────────────────────────
          File: public/images/streetbeat-poster.png
          If the file doesn't exist yet, the gradient fallback shows instead.
          When you add the poster, the Image component takes over automatically.
        */}
        <Image
          src="/images/streetbeat-poster.png"
          alt="Street Beat: Drumming Below Sea Level"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Dark overlay — 75% black so poster is recognizable but not overpowering */}
        <div className="absolute inset-0 bg-studio-black/75" />

        {/* Gold gradient wash — rises from bottom, frames the text */}
        <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-studio-black/60 to-studio-black/10" />

        {/* Warm gold ambient glow — bottom left */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_85%,rgba(212,175,119,0.12),transparent)]" />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")` }}
        />

        {/* Cinematic letterbox bars */}
        <div className="absolute top-0 left-0 right-0 h-5 bg-studio-black z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-5 bg-studio-black z-10" />

        {/* ── Hero content — bottom-left anchored ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16 md:pb-24">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-5 opacity-0 animate-fade-up delay-200"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="w-8 h-px bg-gold/60" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-gold/80 font-sans">
                Documentary Film · New Orleans · 2025
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-display mb-4 opacity-0 animate-fade-up delay-300"
              style={{ animationFillMode: "forwards" }}
            >
              <span className="block text-[clamp(48px,8vw,96px)] text-cream leading-[0.9]">
                Street Beat
              </span>
              <span className="block text-[clamp(18px,3vw,36px)] text-gold-gradient italic font-light tracking-wide mt-2">
                Drumming Below Sea Level
              </span>
            </h1>

            {/* Logline */}
            <p
              className="text-mist text-base md:text-lg max-w-md leading-relaxed mb-7 font-light opacity-0 animate-fade-up delay-400"
              style={{ animationFillMode: "forwards" }}
            >
              What is the New Orleans drum sound? NOLA's most influential drummers
              answer the question the city has been asking for a hundred years.
            </p>

            {/* Meta strip */}
            <div
              className="flex flex-wrap items-center gap-4 mb-8 opacity-0 animate-fade-up delay-500"
              style={{ animationFillMode: "forwards" }}
            >
              {[
                { icon: Clock,  text: "53 minutes" },
                { icon: MapPin, text: "New Orleans, Louisiana" },
                { icon: Film,   text: "Mid City Sound Production" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-mist text-xs">
                  <Icon className="w-3.5 h-3.5 text-gold/60" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-up delay-700"
              style={{ animationFillMode: "forwards" }}
            >
              {/* Primary — purchase */}
              <Link
                href="/watch"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-gold text-studio-black text-[13px] font-semibold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Purchase for $5.99 — Own Forever
              </Link>
              {/* Secondary — trailer */}
              <a
                href="#trailer"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 border border-cream/30 text-cream text-[13px] font-medium tracking-wide uppercase rounded-sm hover:border-gold/60 hover:text-gold transition-colors"
              >
                <Play className="w-4 h-4" />
                Watch Trailer
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-8 z-20 text-mist/30 flex flex-col items-center gap-1.5">
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 2. PRICE STRIP — immediate purchase CTA after hero               */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <div className="border-y border-studio-border/50 bg-studio-charcoal py-5 px-6">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-mist text-xs">
                <Icon className="w-3.5 h-3.5 text-gold/60 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
          <Link
            href="/watch"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-studio-black text-[12px] font-semibold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-colors whitespace-nowrap"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Own for $5.99
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 3. TRAILER EMBED                                                 */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section id="trailer" className="py-20 px-6 bg-studio-black">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">
              Official Trailer
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl text-cream">Watch the trailer</h2>
          </div>

          {/* YouTube embed — trailer ID: JgqTdAVGwUc */}
          <div
            className="relative aspect-video rounded-sm overflow-hidden border border-studio-border/60"
            style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,119,0.05)" }}
          >
            <iframe
              src="https://www.youtube.com/embed/JgqTdAVGwUc?rel=0&modestbranding=1&color=white"
              title="Street Beat: Drumming Below Sea Level — Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="text-center text-mist text-xs mt-4 tracking-wide">
            Produced by Mid City Sound &amp; Fire on the Bayou · Hosted by Doug Belote
          </p>

          {/* Post-trailer purchase CTA */}
          <div className="flex justify-center mt-8">
            <Link
              href="/watch"
              className="inline-flex items-center gap-2 h-12 px-8 bg-gold text-studio-black text-[13px] font-semibold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Purchase for $5.99 — Own Forever
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 4. SYNOPSIS + CREDITS                                            */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-studio-border/40 bg-studio-charcoal">
        <div className="mx-auto max-w-5xl grid md:grid-cols-[1fr_300px] gap-14 items-start">

          {/* Synopsis */}
          <div className="space-y-6">
            <Badge variant="outline" className="text-[10px] tracking-widest uppercase">
              About the Film
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
              The drum sound
              <br />
              <span className="text-gold-gradient italic">New Orleans made</span>
            </h2>
            <Separator className="w-12 bg-gold/40" />
            <div className="space-y-4 text-mist text-sm leading-relaxed">
              <p>
                New Orleans has a drum sound unlike anywhere else on earth. It lives in the second line,
                in the brass band, in the improvised groove that runs through everything from jazz to
                bounce to hip-hop. But what is it, exactly? Where does it come from?
              </p>
              <p>
                <em className="not-italic text-cream/80">Street Beat: Drumming Below Sea Level</em> brings together
                NOLA's most influential percussionists to answer that question — in their own words,
                in the city that made them.
              </p>
              <p>
                Produced by <strong className="text-cream font-normal">Mid City Sound Studios</strong> and{" "}
                <strong className="text-cream font-normal">Fire on the Bayou</strong>, and hosted by{" "}
                <strong className="text-cream font-normal">Doug Belote</strong>, this 53-minute documentary
                is an intimate portrait of a rhythm that shaped the world.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild>
                <Link href="/watch">
                  <ShoppingCart className="w-4 h-4" />
                  Purchase for $5.99
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Full Credits</Link>
              </Button>
            </div>
          </div>

          {/* Credits card */}
          <div className="border border-studio-border rounded-sm bg-studio-card overflow-hidden">
            <div className="p-5 border-b border-studio-border">
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/70 font-medium">Film Credits</p>
            </div>
            <div className="divide-y divide-studio-border">
              {CREDITS.map(({ role, name }) => (
                <div key={role} className="px-5 py-4">
                  <p className="text-[10px] tracking-widest uppercase text-mist/50 mb-1">{role}</p>
                  <p className="text-cream text-sm">{name}</p>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-studio-border bg-studio-dark">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold/50 shrink-0" />
                <p className="text-mist text-xs">A film about the sound New Orleans gave the world</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 5. PURCHASE CARD — full width, prominent                         */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 bg-studio-black border-t border-studio-border/40">
        <div className="mx-auto max-w-3xl">
          <div
            className="border border-gold/25 rounded-sm overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(212,175,119,0.06)" }}
          >
            <div className="p-10 space-y-8">

              {/* Header */}
              <div className="text-center space-y-2">
                <Badge variant="outline" className="text-[10px] tracking-widest uppercase mb-2">
                  Available Now
                </Badge>
                <h2 className="font-display text-4xl text-cream">Own the film</h2>
                <p className="text-mist text-sm">One payment. Watch forever. Any device.</p>
              </div>

              {/* Price + button */}
              <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                  <p className="font-display text-7xl text-gold leading-none">$5<span className="text-4xl text-gold/70">.99</span></p>
                  <p className="text-mist text-sm mt-2">One-time purchase · No subscription</p>
                </div>

                {/*
                  ── STRIPE INTEGRATION ──────────────────────────────────────────
                  Replace the Link below with a Stripe Payment Link or:

                  Create /app/api/checkout/route.ts:
                    const session = await stripe.checkout.sessions.create({
                      payment_method_types: ["card", "apple_pay", "google_pay"],
                      line_items: [{
                        price_data: {
                          currency: "usd",
                          unit_amount: 599,   // $5.99 in cents
                          product_data: { name: "Street Beat: Drumming Below Sea Level" },
                        },
                        quantity: 1,
                      }],
                      mode: "payment",
                      success_url: `${baseUrl}/watch/success?session_id={CHECKOUT_SESSION_ID}`,
                      cancel_url:  `${baseUrl}/watch`,
                    })
                    return Response.json({ url: session.url })

                  Then change the button to:
                    <button onClick={async () => {
                      const { url } = await fetch("/api/checkout").then(r => r.json())
                      window.location.href = url
                    }}>
                      Purchase for $5.99 — Own Forever
                    </button>
                  ───────────────────────────────────────────────────────────────
                */}
                <Link
                  href="/watch"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-14 px-12 bg-gold text-studio-black text-[14px] font-bold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-all shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Purchase for $5.99 — Own Forever
                </Link>

                {/* Trust signals */}
                <div className="flex flex-wrap justify-center gap-5 text-mist/60 text-xs">
                  {[
                    { icon: Shield,    text: "Secure payment" },
                    { icon: Monitor,   text: "Any device" },
                    { icon: Captions,  text: "Captions included" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />{text}
                    </div>
                  ))}
                </div>
              </div>

              {/* What you get */}
              <div className="border-t border-studio-border/40 pt-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-mist/50 mb-4">What you get</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "53-minute documentary in HD",
                    "Lifetime access — no expiry",
                    "Stream on any device",
                    "Closed captions included",
                    "Email receipt with access link",
                    "Supports NOLA independent film",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2.5 text-xs text-cream/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 6. PULL QUOTE                                                    */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-studio-border/40 bg-studio-charcoal">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(212,175,119,0.04),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-display text-[100px] leading-none text-gold/8 select-none -mb-6">&ldquo;</p>
          <blockquote className="font-display text-3xl md:text-4xl text-cream/90 italic font-light leading-relaxed">
            The New Orleans drum sound isn&apos;t something you learn.
            It&apos;s something you absorb — from the streets, from the parades,
            from the water table itself.
          </blockquote>
          <p className="text-mist text-sm mt-6 tracking-wide">
            — Doug Belote, Host &nbsp;·&nbsp; <span className="text-mist/40 italic text-xs">Placeholder — replace with real quote from film</span>
          </p>
          <Separator className="w-10 bg-gold/30 mx-auto mt-8 mb-8" />
          <Link
            href="/watch"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold text-gold text-sm font-medium hover:bg-gold hover:text-studio-black transition-all rounded-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Own the film for $5.99
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 7. MCS ECOSYSTEM CROSSLINK                                       */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-6 border-t border-studio-border/40 bg-studio-black">
        <div className="mx-auto max-w-5xl">
          <div className="border border-studio-border/50 rounded-sm overflow-hidden grid md:grid-cols-[1fr_auto] items-center">
            <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-[140px] h-[46px] shrink-0 opacity-80">
                <Image
                  src="/images/mcs-logo.jpg"
                  alt="Mid City Sound Studios"
                  fill
                  className="object-contain object-left"
                  sizes="140px"
                />
              </div>
              <Separator orientation="vertical" className="h-10 hidden sm:block" />
              <div>
                <p className="text-cream text-sm font-medium mb-1">
                  Street Beat is a Mid City Sound Studios production
                </p>
                <p className="text-mist text-xs leading-relaxed max-w-sm">
                  Book studio time in New Orleans with Donald Markowitz at Mid City Sound — the studio behind the film.
                </p>
              </div>
            </div>
            <div className="px-8 py-5 border-t md:border-t-0 md:border-l border-studio-border/40 shrink-0">
              <Button variant="outline" asChild>
                <Link href="https://midcitysound.com" target="_blank" rel="noopener noreferrer">
                  Visit Studio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
