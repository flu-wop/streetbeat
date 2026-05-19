// src/app/page.tsx — Street Beat: Drumming Below Sea Level
// ─────────────────────────────────────────────────────────────────────────────
// Full rebuild matching Mid City Sound dark/gold luxury aesthetic.
// Single purchase price: $5.00 Own Forever. Rental removed.
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
    "A 54-minute documentary exploring the unique drum sound of New Orleans. " +
    "Produced by Mid City Sound & Fire on the Bayou. Own forever for $5.00.",
  openGraph: {
    images: [{ url: "/images/streetbeat-poster.png", width: 1280, height: 720 }],
  },
}

const CREDITS = [
  { role: "Produced by",  name: "Mid City Sound Studios" },
  { role: "Produced by",  name: "Fire on the Bayou" },
  { role: "Produced by",  name: "Doreja Productions" },
  { role: "Hosted by",    name: "Doug Belote" },
  { role: "Runtime",      name: "54 minutes" },
  { role: "Released",     name: "2025" },
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
        <div className="absolute inset-0 bg-studio-black/25" />

        {/* Gold gradient wash — rises from bottom, frames the text */}
        <div className="absolute inset-0 bg-gradient-to-t from-studio-black via-studio-black/30 to-transparent" />

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
              className="flex items-center gap-3 mb-5 opacity-0 animate-fade-up delay-200 justify-center sm:justify-start"
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
              className="flex flex-wrap items-center gap-4 mb-8 opacity-0 animate-fade-up delay-500 justify-center sm:justify-start"
              style={{ animationFillMode: "forwards" }}
            >
              {[
                { icon: Clock,  text: "54 minutes" },
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
              className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-up delay-700 items-center sm:items-start"
              style={{ animationFillMode: "forwards" }}
            >
              {/* Primary — purchase */}
              <Link
                href="/watch"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-gold text-studio-black text-[13px] font-semibold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                Purchase for $5.00
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
      {/* 3. TRAILER EMBED                                                 */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section id="trailer" className="py-20 px-6 bg-studio-black">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">
              Official Trailer
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl text-cream">Watch the Trailer</h2>
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
              Purchase for $5.00
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* 4. SYNOPSIS + CREDITS + MCS CROSSLINK (merged)                   */}
      {/* ════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-studio-border/40 bg-studio-charcoal">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">

          {/* Synopsis + Credits */}
          <div className="py-16 sm:py-20 grid md:grid-cols-[1fr_300px] gap-10 md:gap-14 items-start">

            {/* Synopsis */}
            <div className="space-y-6 text-center sm:text-left">
              <Badge variant="outline" className="text-[10px] tracking-widest uppercase">
                About the Film
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl text-cream leading-tight">
                Playing
                <br />
                <span className="text-gold-gradient italic">&ldquo;In the Cracks&rdquo;</span>
              </h2>
              <Separator className="w-12 bg-gold/40 mx-auto sm:mx-0" />
              <div className="space-y-4 text-mist text-sm leading-relaxed">
                <p>
                  New Orleans has a drum sound unlike anywhere else on earth. It lives in the second line,
                  in the brass band, in the improvised groove that runs through everything from jazz to
                  bounce to hip-hop. But what is it, exactly? Where does it come from?
                </p>
                <p>
                  <em className="not-italic text-cream/80">Street Beat: Drumming Below Sea Level</em>{" "}brings together NOLA&apos;s most influential percussionists to answer that question — in their own words, in the city that made them.
                </p>
                <p>
                  Produced by <strong className="text-cream font-normal">Mid City Sound Studios</strong> and{" "}
                  <strong className="text-cream font-normal">Fire on the Bayou</strong>, and hosted by{" "}
                  <strong className="text-cream font-normal">Doug Belote</strong>, this 54-minute documentary
                  is an intimate portrait of a rhythm that shaped the world.
                </p>
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

          {/* MCS crosslink — directly attached, no gap */}
          <div className="border-t border-studio-border/40 py-10">
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-6 sm:justify-between text-center sm:text-left">
              <div className="flex flex-col items-center sm:flex-row sm:items-center gap-5">
                <div className="relative w-[200px] h-[66px] shrink-0">
                  <Image
                    src="/images/mcs2-logo.png"
                    alt="Mid City Sound Studios"
                    fill
                    className="object-contain object-center"
                    sizes="200px"
                  />
                </div>
                <div>
                  <p className="text-cream text-sm font-medium mb-1">
                    Street Beat is a Mid City Sound Studios production
                  </p>
                  <p className="text-mist text-xs leading-relaxed max-w-sm">
                    Book studio time in New Orleans at Mid City Sound — the studio behind the film.
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild className="shrink-0 w-full sm:w-auto">
                <Link href="https://midcitysound.com" target="_blank" rel="noopener noreferrer">
                  Book Now
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
