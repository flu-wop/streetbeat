'use client'

import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const MERCH_URL = 'https://midcitysound.com/merch'

// ── Teaser products — all link to unified store ───────────────────────────────
const teaserProducts = [
  {
    name: 'Rotary Chaos Tee',
    label: 'Lil Squiggle',
    price: '$28',
    desc: 'Vintage-washed heavyweight. Squiggle mid-dial, full chaos.',
    tag: 'Best Seller',
    color: 'var(--green)',
    accent: true,
  },
  {
    name: 'Flip Fails Hoodie',
    label: 'Lil Squiggle',
    price: '$55',
    desc: 'Premium fleece. The flip phone era, distilled into one cozy statement.',
    tag: 'Limited',
    color: 'var(--gold)',
    accent: false,
  },
  {
    name: 'Mid City Sound Dad Hat',
    label: 'Mid City Sound',
    price: '$32',
    desc: 'Unstructured six-panel. Studio-issue. Worn by the people who made the record.',
    tag: 'New',
    color: 'var(--gold)',
    accent: false,
  },
  {
    name: 'Streetbeats Vol. I Crewneck',
    label: 'Streetbeats',
    price: '$60',
    desc: 'Heavyweight French terry. Three brands. One crew. Infinite regret.',
    tag: '',
    color: 'var(--gold)',
    accent: false,
  },
]

// ── Era timeline ─────────────────────────────────────────
const eras = [
  {
    decade: '70s',
    device: 'Rotary Phone',
    glyph: '📞',
    desc: "Squiggle spins the dial. Avocado-green kitchen. Same mistake, analog edition.",
  },
  {
    decade: '90s',
    device: 'Flip Phone',
    glyph: '📱',
    desc: 'The satisfying snap of a flip. The unsatisfying aftermath of a 2am call.',
  },
  {
    decade: 'Now',
    device: 'Smartphone',
    glyph: '📲',
    desc: 'Face ID. Read receipts. Zero excuses. Maximum regret.',
  },
]

// ── Section reveal hook ───────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, revealed }
}

// ── Audio toggle ─────────────────────────────────────────
function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause() } else { audio.play().catch(() => {}) }
    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} src="/audio/dont-drink-and-dial.wav" loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 animate-pulse-gold"
        style={{
          background: 'rgba(9,9,9,0.85)',
          border: '1px solid rgba(212,175,119,0.4)',
          backdropFilter: 'blur(12px)',
          color: 'var(--gold)',
        }}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9v6m6-6v6M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
          </svg>
        )}
      </button>
    </>
  )
}

// ── Page ─────────────────────────────────────────────────
export default function Home() {
  const storyReveal = useReveal()
  const shopReveal  = useReveal()
  const ugcReveal   = useReveal()

  return (
    <>
      <Navbar />
      <AudioToggle />

      {/* ═══════════════════════════════ HERO ══════════════════════════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden noise-overlay"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a1510 0%, var(--black) 65%)',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 40% at 50% 120%, rgba(29,158,117,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Hero BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(9,9,9,0.3) 0%, rgba(9,9,9,0.6) 60%, var(--black) 100%)' }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

          {/* Mid City Sound masthead */}
          <div className="animate-fade-in mb-5 flex flex-col items-center gap-3">
            <a
              href="https://midcitysound.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              {/* Studio wordmark */}
              <div
                className="flex items-center gap-3 px-6 py-3 rounded-sm transition-all duration-300 group-hover:border-[rgba(212,175,119,0.5)]"
                style={{
                  border: '1px solid rgba(212,175,119,0.3)',
                  background: 'rgba(9,9,9,0.6)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="flex flex-col items-end leading-none">
                  <span
                    className="font-display text-xs md:text-sm font-semibold uppercase tracking-[0.35em]"
                    style={{ color: 'var(--gold)' }}
                  >
                    Mid City Sound
                  </span>
                  <span
                    className="text-[8px] uppercase tracking-[0.5em] mt-0.5"
                    style={{ color: 'var(--gold-dim)' }}
                  >
                    Studios
                  </span>
                </div>
                <div className="w-px h-8 mx-1" style={{ background: 'rgba(212,175,119,0.25)' }} />
                <span
                  className="font-display text-base md:text-lg italic font-light tracking-widest"
                  style={{ color: 'var(--mist)' }}
                >
                  Presents
                </span>
              </div>
              <span
                className="text-[9px] uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: 'var(--gold-dim)' }}
              >
                midcitysound.com ↗
              </span>
            </a>
            {/* Green Squiggle dot accent */}
            <div className="flex items-center gap-2">
              <div className="w-px h-3" style={{ background: 'rgba(29,158,117,0.4)' }} />
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--green)' }} />
              <div className="w-px h-3" style={{ background: 'rgba(29,158,117,0.4)' }} />
            </div>
          </div>

          {/* Headline */}
          <h1
            className="font-display animate-fade-up delay-100 text-gold-gradient leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 600 }}
          >
            Don't Drink
            <br />
            <span className="italic font-light">&amp; Dial</span>
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up delay-200 font-display text-base md:text-xl italic font-light mt-4 tracking-widest"
            style={{ color: 'var(--mist)' }}
          >
            Decades
          </p>

          {/* Divider */}
          <div className="animate-fade-up delay-300 flex items-center gap-4 my-6 md:my-8">
            <div className="gold-divider" />
            <span className="text-[10px] uppercase tracking-[0.4em]" style={{ color: 'var(--gold-dim)' }}>
              One call. Every era. Same regret.
            </span>
            <div className="gold-divider" />
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href={MERCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-[#090909] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm"
            >
              Shop the Drop ↗
            </a>
            <a
              href="#story"
              className="btn-outline-gold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm"
              style={{ color: 'var(--cream)' }}
            >
              The Story ↓
            </a>
          </div>

          {/* Store sub-note */}
          <p
            className="animate-fade-up delay-500 text-[10px] uppercase tracking-[0.25em] mt-4"
            style={{ color: 'var(--gold-dim)' }}
          >
            Lil Squiggle &middot; Mid City Sound &middot; Streetbeats
          </p>

          {/* Video embed */}
          <div className="animate-fade-up delay-600 w-full max-w-2xl mt-12 md:mt-16">
            <div className="video-frame aspect-video w-full">
              <video
                src="/video/flip-fails-1.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                <span
                  className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm"
                  style={{ background: 'rgba(9,9,9,0.7)', color: 'var(--gold)', backdropFilter: 'blur(8px)' }}
                >
                  Official PSA
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm"
                  style={{ background: 'rgba(9,9,9,0.7)', color: 'var(--mist)', backdropFilter: 'blur(8px)' }}
                >
                  #DontDrinkAndDialDecades
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[9px] uppercase tracking-[0.4em]" style={{ color: 'var(--gold-dim)' }}>Scroll</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, var(--gold-dim), transparent)' }} />
        </div>
      </section>

      {/* ════════════════════════════ THE STORY ════════════════════════════ */}
      <section
        id="story"
        ref={storyReveal.ref as React.RefObject<HTMLElement>}
        className={`section-reveal py-24 md:py-36 px-6 ${storyReveal.revealed ? 'revealed' : ''}`}
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center gap-4 mb-12">
            <div className="gold-divider" />
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--gold)' }}>
              The Story
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h2
                className="font-display leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--cream)', fontWeight: 500 }}
              >
                Meet{' '}
                <span className="italic text-gold-gradient">Lil Squiggle</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mist)' }}>
                He's small, he's chibi, he's got Rasta colors and zero impulse control.
                Lil Squiggle is the reggae-dub character who somehow finds himself making
                the worst possible phone call — in every decade, on every device.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--mist)' }}>
                1970s rotary? He's spinning it. 1990s flip phone? Snap. Modern smartphone
                with face ID, read receipts, and zero plausible deniability? Also him.
              </p>
              <p
                className="font-display text-xl italic font-light leading-relaxed"
                style={{ color: 'var(--gold)', borderLeft: '2px solid rgba(212,175,119,0.3)', paddingLeft: '1.25rem' }}
              >
                "One call. Every era. Same regret."
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--gold-dim)' }}>
                  A Mid City Sound Production
                </p>
                <p className="text-sm" style={{ color: 'var(--mist)' }}>
                  Written by <span style={{ color: 'var(--cream)' }}>Cash Hollywood & Russ Kunkel</span> · Produced by <span style={{ color: 'var(--cream)' }}>Donald Markowitz & Gary Uffner</span>
                </p>
                <p className="text-sm" style={{ color: 'var(--mist)' }}>
                  Produced by{' '}
                  <span style={{ color: 'var(--cream)' }}>Donny Markowitz</span>
                  {' '}&amp;{' '}
                  <span style={{ color: 'var(--cream)' }}>Gary Uffner</span>
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="gold-border rounded-sm overflow-hidden" style={{ background: 'var(--charcoal-2)' }}>
                <img
                  src="/images/three-eras.png"
                  alt="Lil Squiggle through three eras"
                  className="w-full h-full object-cover"
                  style={{ minHeight: '320px' }}
                />
              </div>
              <div
                className="absolute -bottom-4 -right-4 px-5 py-3 rounded-sm"
                style={{ background: 'var(--charcoal-3)', border: '1px solid rgba(212,175,119,0.25)' }}
              >
                <p className="text-[9px] uppercase tracking-widest" style={{ color: 'var(--mist)' }}>Campaign</p>
                <p className="font-display text-sm font-medium" style={{ color: 'var(--gold)' }}>#DontDrinkAndDialDecades</p>
              </div>
            </div>
          </div>

          {/* Era cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
            {eras.map((era, i) => (
              <div
                key={era.decade}
                className="relative p-6 rounded-sm gold-border flex flex-col gap-3 transition-all duration-300 hover:border-[rgba(212,175,119,0.4)]"
                style={{ background: 'var(--charcoal-2)', transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold italic" style={{ color: 'var(--gold)' }}>
                    '{era.decade}
                  </span>
                  <span className="text-2xl">{era.glyph}</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--green)' }}>
                  {era.device}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--mist)' }}>
                  {era.desc}
                </p>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,119,0.2), transparent)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SHOP / UNIFIED MERCH ══════════════════════ */}
      <section
        id="shop"
        ref={shopReveal.ref as React.RefObject<HTMLElement>}
        className={`section-reveal py-24 md:py-36 px-6 noise-overlay relative ${shopReveal.revealed ? 'revealed' : ''}`}
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, #131008 0%, var(--black) 70%)',
        }}
      >
        <div className="max-w-6xl mx-auto relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="gold-divider" />
                <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--gold)' }}>
                  The Drop
                </span>
              </div>
              <h2
                className="font-display leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--cream)', fontWeight: 500 }}
              >
                Shop Lil Squiggle
                <br />
                <span className="italic text-gold-gradient">+ Mid City Sound Merch</span>
              </h2>
              <p className="text-sm mt-4 max-w-md leading-relaxed" style={{ color: 'var(--mist)' }}>
                Lil Squiggle drops live alongside the full Mid City Sound and Streetbeats
                collections. One store. Three brands. Limitless regret.
              </p>
            </div>
            <a
              href={MERCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold self-start md:self-end shrink-0 text-[#090909] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm"
            >
              Shop Everything ↗
            </a>
          </div>

          {/* Brand label strip */}
          <div
            className="flex flex-wrap items-center gap-3 mb-10 p-4 rounded-sm"
            style={{ background: 'rgba(212,175,119,0.04)', border: '1px solid rgba(212,175,119,0.12)' }}
          >
            <span className="text-[9px] uppercase tracking-[0.3em] mr-1" style={{ color: 'var(--mist)' }}>
              All at midcitysound.com/merch:
            </span>
            {[
              { brand: 'Lil Squiggle', green: true },
              { brand: 'Mid City Sound', green: false },
              { brand: 'Streetbeats', green: false },
            ].map(({ brand, green }) => (
              <span
                key={brand}
                className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                style={{
                  background: green ? 'rgba(29,158,117,0.12)' : 'rgba(212,175,119,0.08)',
                  color: green ? 'var(--green)' : 'var(--gold)',
                  border: `1px solid ${green ? 'rgba(29,158,117,0.25)' : 'rgba(212,175,119,0.2)'}`,
                }}
              >
                {brand}
              </span>
            ))}
          </div>

          {/* Teaser product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teaserProducts.map((product) => (
              <a
                key={product.name}
                href={MERCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="product-card gold-border rounded-sm p-5 flex flex-col gap-4 group"
                style={{ background: 'var(--charcoal)', textDecoration: 'none' }}
              >
                {/* Placeholder image area */}
                <div
                  className="w-full aspect-square rounded-sm flex items-center justify-center relative overflow-hidden"
                  style={{ background: 'var(--charcoal-2)' }}
                >
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <div
                      className="w-14 h-14 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${product.color}33, transparent)`,
                        border: `1px solid ${product.color}44`,
                      }}
                    />
                  </div>
                  <span
                    className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-full"
                    style={{
                      background: product.accent ? 'rgba(29,158,117,0.15)' : 'rgba(212,175,119,0.1)',
                      color: product.accent ? 'var(--green)' : 'var(--gold)',
                      border: `1px solid ${product.accent ? 'rgba(29,158,117,0.3)' : 'rgba(212,175,119,0.2)'}`,
                    }}
                  >
                    {product.label}
                  </span>
                  {product.tag && (
                    <span
                      className="absolute top-3 right-3 text-[9px] uppercase tracking-[0.15em] px-2 py-1 rounded-sm"
                      style={{ background: 'rgba(9,9,9,0.7)', color: 'var(--mist)', backdropFilter: 'blur(4px)' }}
                    >
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-medium leading-tight" style={{ color: 'var(--cream)' }}>
                      {product.name}
                    </h3>
                    <span className="font-display text-base font-semibold shrink-0" style={{ color: 'var(--gold)' }}>
                      {product.price}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--mist)' }}>
                    {product.desc}
                  </p>
                </div>

                <div className="mt-auto flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--gold-dim)' }}>
                  <span className="group-hover:text-[var(--gold)] transition-colors duration-300">View at MCS ↗</span>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom CTA band */}
          <div
            className="mt-10 p-6 md:p-8 rounded-sm flex flex-col md:flex-row items-center justify-between gap-5"
            style={{
              background: 'linear-gradient(135deg, rgba(212,175,119,0.07) 0%, rgba(212,175,119,0.03) 100%)',
              border: '1px solid rgba(212,175,119,0.2)',
            }}
          >
            <div>
              <p className="font-display text-xl italic font-light" style={{ color: 'var(--cream)' }}>
                The full collection is live.
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--mist)' }}>
                Every drop from every era, plus the full Mid City Sound catalog.
              </p>
            </div>
            <a
              href={MERCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold shrink-0 text-[#090909] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm whitespace-nowrap"
            >
              midcitysound.com/merch ↗
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ UGC ════════════════════════════════ */}
      <section
        id="community"
        ref={ugcReveal.ref as React.RefObject<HTMLElement>}
        className={`section-reveal py-24 md:py-36 px-6 ${ugcReveal.revealed ? 'revealed' : ''}`}
        style={{ background: 'var(--charcoal)' }}
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">

          <div className="flex items-center gap-4">
            <div className="gold-divider" />
            <span className="text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--gold)' }}>
              Community
            </span>
            <div className="gold-divider" />
          </div>

          <h2
            className="font-display leading-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--cream)', fontWeight: 500 }}
          >
            Join the{' '}
            <span className="italic text-gold-gradient">Era</span>
          </h2>

          <p className="text-base max-w-xl leading-relaxed" style={{ color: 'var(--mist)' }}>
            Share your worst decade-appropriate drunk dial story. Tag us.
            Use the hashtag. Lil Squiggle will feel slightly less alone.
          </p>

          <div
            className="w-full max-w-lg px-8 py-8 rounded-sm"
            style={{ background: 'var(--charcoal-2)', border: '1px solid rgba(212,175,119,0.2)' }}
          >
            <p className="font-display text-2xl md:text-3xl italic font-light" style={{ color: 'var(--gold)' }}>
              #DontDrinkAndDialDecades
            </p>
            <p className="text-xs mt-2 uppercase tracking-widest" style={{ color: 'var(--mist)' }}>
              Tag your era. Own your regret.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            {[
              { label: 'TikTok',    handle: '@lilsquigglemon', href: 'https://tiktok.com/@lilsquigglemon',   accent: 'var(--green)' },
              { label: 'Instagram', handle: '@lil.squiggle',   href: 'https://instagram.com/lil.squiggle',  accent: 'var(--gold)' },
              { label: 'YouTube',   handle: '@lilsquigglemon', href: 'https://youtube.com/@lilsquigglemon', accent: 'var(--gold)' },
              { label: 'X',         handle: '@lilsquigglemon', href: 'https://x.com/lilsquigglemon',        accent: 'var(--mist)' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-sm transition-all duration-300 group"
                style={{
                  background: 'var(--charcoal-3)',
                  border: '1px solid rgba(212,175,119,0.15)',
                  color: 'var(--mist)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(212,175,119,0.4)'
                  el.style.color = 'var(--cream)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(212,175,119,0.15)'
                  el.style.color = 'var(--mist)'
                }}
              >
                <span className="text-[9px] uppercase tracking-[0.2em] font-medium" style={{ color: s.accent }}>
                  {s.label}
                </span>
                <span className="text-sm">{s.handle}</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">↗</span>
              </a>
            ))}
          </div>

          <a
            href="https://midcitysound.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 btn-outline-gold text-xs uppercase tracking-[0.25em] px-7 py-3 rounded-sm"
            style={{ color: 'var(--gold)' }}
          >
            Explore Mid City Sound ↗
          </a>
        </div>
      </section>

      {/* ══════════════════════════ MCS BRAND BRIDGE ═══════════════════════ */}
      <section
        className="py-16 md:py-20 px-6"
        style={{
          background: 'var(--black)',
          borderTop: '1px solid rgba(212,175,119,0.1)',
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-sm overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12"
            style={{
              background: 'linear-gradient(135deg, #141008 0%, #0e0e0e 60%, #0a1208 100%)',
              border: '1px solid rgba(212,175,119,0.2)',
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgba(212,175,119,0.06) 0%, transparent 60%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 40% 60% at 100% 50%, rgba(29,158,117,0.04) 0%, transparent 60%)',
              }}
            />

            {/* Text */}
            <div className="relative flex flex-col gap-3 flex-1 text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: 'var(--gold)' }}>
                Part of the Mid City Sound family
              </p>
              <h3
                className="font-display leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: 'var(--cream)', fontWeight: 500 }}
              >
                Three Brands.{' '}
                <span className="italic text-gold-gradient">One Studio.</span>
              </h3>
              <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--mist)' }}>
                Lil Squiggle lives inside the Mid City Sound universe alongside the full
                studio catalog and Streetbeats. All merch — all eras — lives in one place.
              </p>
              <div className="flex flex-wrap gap-2 mt-1 justify-center md:justify-start">
                {['Lil Squiggle', 'Mid City Sound', 'Streetbeats'].map((brand, i) => (
                  <span
                    key={brand}
                    className="text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                    style={{
                      background: i === 0 ? 'rgba(29,158,117,0.1)' : 'rgba(212,175,119,0.07)',
                      color: i === 0 ? 'var(--green)' : 'var(--gold)',
                      border: `1px solid ${i === 0 ? 'rgba(29,158,117,0.25)' : 'rgba(212,175,119,0.18)'}`,
                    }}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA stack */}
            <div className="relative flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://midcitysound.com/merch"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-[#090909] font-semibold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-sm text-center whitespace-nowrap"
              >
                Shop All Merch ↗
              </a>
              <a
                href="https://midcitysound.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-xs uppercase tracking-[0.2em] px-8 py-3.5 rounded-sm text-center whitespace-nowrap"
                style={{ color: 'var(--mist)' }}
              >
                midcitysound.com ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
