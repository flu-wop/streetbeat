// src/app/page.tsx — HOMEPAGE
// ─────────────────────────────────────────────────────────────────────────────
// Street Beat: Drumming Below Sea Level — film landing page
//
// Sections:
//   1. Hero          — cinematic full-bleed poster treatment + trailer embed
//   2. Film Info     — synopsis, runtime, credits strip
//   3. Watch / Price — rent · buy card with Stripe placeholder
//   4. Drumming Quote pull
//   5. Featured Drummers — who's in the film
//   6. Press / Audience pull-quotes
//   7. MCS ecosystem crosslink
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import Link              from "next/link"
import {
  Play, ArrowRight, Clock, Film,
  MapPin, ChevronDown, Award,
} from "lucide-react"
import { Button }    from "@/components/ui/button"
import { Badge }     from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Street Beat: Drumming Below Sea Level",
  description: "A 53-minute documentary exploring the unique drum sound of New Orleans. Watch now.",
}

/* ─── Drummer profiles from the film ── */
const DRUMMERS = [
  { name: "Doug Belote",     role: "Host",               note: "NOLA first-call drummer, studio legend" },
  { name: "NOLA Drummer 2",  role: "Featured",           note: "Replace with real name from film" },
  { name: "NOLA Drummer 3",  role: "Featured",           note: "Replace with real name from film" },
  { name: "NOLA Drummer 4",  role: "Featured",           note: "Replace with real name from film" },
]

/* ─── Film crew ── */
const CREDITS = [
  { role: "Produced by",   name: "Mid City Sound & Fire on the Bayou" },
  { role: "Hosted by",     name: "Doug Belote" },
  { role: "Studio",        name: "Mid City Sound Studios, New Orleans" },
  { role: "Runtime",       name: "53 minutes" },
  { role: "Released",      name: "April 2025" },
]

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO — cinematic film poster + trailer                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden grain">

        {/* ── Background — film-poster atmosphere ──
            SWAP: Replace this gradient with a film still:
              <Image src="/images/film-still-hero.jpg" fill className="object-cover object-center" priority alt="" />
            Keep all overlays on top of it.
        ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#040404] via-[#0a090a] to-[#111008]" />

        {/* Warm golden light source — top right (simulates stage lighting) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_75%_20%,rgba(212,175,119,0.12),transparent)]" />

        {/* Depth vignette on edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_40%,rgba(0,0,0,0.7)_100%)]" />

        {/* Film grain texture */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Cinematic letterbox bars — top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-studio-black z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-studio-black z-10" />

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-studio-black/50 to-transparent" />

        {/* ── Hero content — bottom anchored, wide stage ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-14">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-5 opacity-0 animate-fade-up delay-200"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="w-8 h-px bg-gold/60" />
              <span className="text-[11px] tracking-[0.25em] uppercase text-gold/80 font-medium">
                Documentary Film · New Orleans · 2025
              </span>
            </div>

            {/* Film title */}
            <h1
              className="font-display mb-3 opacity-0 animate-fade-up delay-300"
              style={{ animationFillMode: "forwards" }}
            >
              <span className="block text-[clamp(52px,8vw,100px)] text-cream leading-[0.92]">
                Street Beat
              </span>
              <span className="block text-[clamp(20px,3.5vw,40px)] text-gold-gradient italic font-light tracking-wide mt-1">
                Drumming Below Sea Level
              </span>
            </h1>

            {/* Logline */}
            <p
              className="text-mist text-base md:text-lg max-w-lg leading-relaxed mb-8 font-light opacity-0 animate-fade-up delay-400"
              style={{ animationFillMode: "forwards" }}
            >
              What is the New Orleans drum sound? NOLA's most influential drummers
              answer the question the city has been asking for a hundred years.
            </p>

            {/* Metadata strip */}
            <div
              className="flex flex-wrap items-center gap-4 mb-8 opacity-0 animate-fade-up delay-500"
              style={{ animationFillMode: "forwards" }}
            >
              <div className="flex items-center gap-1.5 text-mist text-xs">
                <Clock className="w-3.5 h-3.5 text-gold/60" />
                <span>53 minutes</span>
              </div>
              <Separator orientation="vertical" className="h-3" />
              <div className="flex items-center gap-1.5 text-mist text-xs">
                <MapPin className="w-3.5 h-3.5 text-gold/60" />
                <span>New Orleans, Louisiana</span>
              </div>
              <Separator orientation="vertical" className="h-3" />
              <div className="flex items-center gap-1.5 text-mist text-xs">
                <Film className="w-3.5 h-3.5 text-gold/60" />
                <span>Mid City Sound Production</span>
              </div>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-up delay-700"
              style={{ animationFillMode: "forwards" }}
            >
              <Button size="lg" asChild>
                <Link href="/watch">
                  <Play className="w-4 h-4" />
                  Watch the Film
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#trailer">
                  Watch Trailer
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-8 z-20 text-mist/30 flex flex-col items-center gap-1.5">
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 2. TRAILER EMBED                                                  */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section id="trailer" className="py-20 px-6 bg-studio-charcoal border-y border-studio-border/40">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">
              Official Trailer
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl text-cream">
              Watch the trailer
            </h2>
          </div>

          {/*
            YouTube trailer embed.
            Video ID: JgqTdAVGwUc (from the existing site's thumbnail URL)
            For the full film, this is replaced on /watch with the paid embed.
          */}
          <div className="relative aspect-video rounded-sm overflow-hidden border border-studio-border/60 shadow-2xl"
            style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,119,0.04)" }}
          >
            <iframe
              src="https://www.youtube.com/embed/JgqTdAVGwUc?rel=0&modestbranding=1&color=white"
              title="Street Beat: Drumming Below Sea Level — Official Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Caption */}
          <p className="text-center text-mist text-xs mt-4 tracking-wide">
            Produced by Mid City Sound &amp; Fire on the Bayou · Hosted by Doug Belote
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 3. FILM SYNOPSIS + CREDITS                                        */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl grid md:grid-cols-[1fr_320px] gap-14 items-start">

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
                is an intimate, unflinching portrait of a rhythm that shaped the world.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button asChild>
                <Link href="/watch">
                  Watch Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">Full Credits</Link>
              </Button>
            </div>
          </div>

          {/* Credits sidebar */}
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
                <p className="text-mist text-xs leading-snug">
                  A film about the sound New Orleans gave the world
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 4. WATCH / PAYWALL PREVIEW — teaser for the /watch page           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-studio-border/40 bg-studio-charcoal">
        <div className="mx-auto max-w-4xl">
          <div className="border border-gold/20 rounded-sm overflow-hidden"
            style={{ boxShadow: "0 0 60px rgba(212,175,119,0.04)" }}
          >
            <div className="grid md:grid-cols-2">

              {/* Film info side */}
              <div className="p-10 space-y-6">
                <Badge variant="outline" className="text-[10px] tracking-widest uppercase">
                  Available Now
                </Badge>
                <div>
                  <h2 className="font-display text-3xl text-cream leading-tight">
                    Ready to watch?
                  </h2>
                  <p className="font-display text-lg text-gold/70 italic font-light mt-1">
                    Two ways to experience the film.
                  </p>
                </div>
                <p className="text-mist text-sm leading-relaxed">
                  Rent for a 48-hour streaming window, or purchase for lifetime access.
                  All purchases go directly to supporting independent New Orleans filmmaking.
                </p>
                <ul className="space-y-2 text-sm text-mist">
                  {[
                    "HD streaming — no download required",
                    "Subtitles / closed captions included",
                    "Watch on any device",
                    "Supports NOLA independent film",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing side */}
              <div className="border-t md:border-t-0 md:border-l border-studio-border/40 divide-y divide-studio-border/40">

                {/* Rent */}
                <div className="p-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-mist/60 mb-1">Rent</p>
                      <p className="font-display text-4xl text-cream">$3<span className="text-xl text-mist/60">.99</span></p>
                      <p className="text-mist text-xs mt-1">48-hour access</p>
                    </div>
                    <Badge variant="secondary" className="text-[9px]">Most Popular</Badge>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/watch#rent">
                      <Play className="w-4 h-4" />
                      Rent Now
                    </Link>
                  </Button>
                  {/*
                    STRIPE NOTE:
                    Wire this to a Stripe Payment Link or Checkout Session.
                    Create /api/checkout/rent/route.ts:
                      stripe.checkout.sessions.create({
                        line_items: [{ price: RENT_PRICE_ID, quantity: 1 }],
                        mode: "payment",
                        success_url: `${baseUrl}/watch?session_id={CHECKOUT_SESSION_ID}`,
                        cancel_url: `${baseUrl}/watch`,
                      })
                    On success, issue a time-limited JWT token for video access.
                  */}
                </div>

                {/* Buy */}
                <div className="p-8 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase text-mist/60 mb-1">Buy</p>
                      <p className="font-display text-4xl text-cream">$9<span className="text-xl text-mist/60">.99</span></p>
                      <p className="text-mist text-xs mt-1">Own forever</p>
                    </div>
                    <Badge variant="outline" className="text-[9px]">Best Value</Badge>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/watch#buy">
                      Buy & Own
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  {/*
                    STRIPE NOTE:
                    Wire to stripe.checkout.sessions.create with BUY_PRICE_ID.
                    On success, store purchase in your DB and issue a permanent JWT.
                    Email receipt with streaming link.
                  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 5. PULL QUOTE — cinematic                                         */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(212,175,119,0.04),transparent)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-display text-[120px] leading-none text-gold/8 select-none -mb-8">&ldquo;</p>
          <blockquote className="font-display text-3xl md:text-4xl text-cream/90 italic font-light leading-relaxed">
            The New Orleans drum sound isn't something you learn.
            It's something you absorb — from the streets, from the parades,
            from the water table itself.
          </blockquote>
          {/* ← Swap with real quote from the film */}
          <p className="text-gold text-sm mt-6 tracking-widest uppercase">
            Doug Belote — Host
          </p>
          <Separator className="w-10 bg-gold/30 mx-auto mt-8" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 6. FEATURED DRUMMERS                                              */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 border-t border-studio-border/40 bg-studio-charcoal">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">
              Featured In the Film
            </Badge>
            <h2 className="font-display text-4xl text-cream">
              The drummers
            </h2>
            <p className="text-mist text-sm mt-3 max-w-sm mx-auto">
              NOLA's most influential percussionists — in their own words,
              in the city that shaped them.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DRUMMERS.map(({ name, role, note }) => (
              <div
                key={name}
                className="group p-6 border border-studio-border bg-studio-card rounded-sm hover:border-gold/40 transition-all card-lift"
              >
                {/* Portrait placeholder
                    Swap with: <Image src={`/images/${name.toLowerCase().replace(' ','-')}.jpg`} ... />
                */}
                <div className="w-14 h-14 rounded-full border border-studio-border bg-studio-dark flex items-center justify-center mb-4 group-hover:border-gold/40 transition-colors">
                  <span className="font-display text-xl text-mist/50 group-hover:text-gold/50 transition-colors">
                    {name[0]}
                  </span>
                </div>
                <p className="font-display text-lg text-cream leading-snug">{name}</p>
                <Badge variant="secondary" className="text-[9px] mt-1.5 mb-3">{role}</Badge>
                <p className="text-mist text-xs leading-relaxed">{note}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-mist/50 text-xs mt-8">
            ← Swap placeholder names with real drummers featured in the film
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* 7. MCS ECOSYSTEM CROSSLINK — same treatment as MCS site           */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 border-t border-studio-border/40">
        <div className="mx-auto max-w-5xl">
          <div className="border border-studio-border/50 rounded-sm overflow-hidden grid md:grid-cols-[1fr_auto] items-center">
            <div className="p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative w-[150px] h-[50px] shrink-0 opacity-75">
                <img
                  src="/images/mcs-logo.jpg"
                  alt="Mid City Sound Studios"
                  className="object-contain object-left h-full w-full"
                />
              </div>
              <Separator orientation="vertical" className="h-10 hidden sm:block" />
              <div>
                <p className="text-cream text-sm font-medium mb-1">
                  Street Beat is a Mid City Sound Studios production
                </p>
                <p className="text-mist text-xs leading-relaxed max-w-sm">
                  Book studio time with producer Donny Markowitz at Mid City Sound —
                  the New Orleans studio behind the film.
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
