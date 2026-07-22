// src/app/watch/page.tsx — PURCHASE / PAYWALL PAGE
// Server component — checks the real signed access cookie (set by
// /api/verify-purchase after a genuine Stripe payment) instead of a
// hardcoded `hasAccess = false` placeholder. No database needed: the
// cookie itself is cryptographically tied to a real Stripe session ID.

import { cookies } from "next/headers"
import Image          from "next/image"
import {
  CheckCircle2, Clock, ShieldCheck,
} from "lucide-react"
import { Badge }     from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { verifyAccessToken, ACCESS_COOKIE } from "@/lib/access"
import WatchPaywall from "./WatchPaywall"

// Real unlisted YouTube video ID goes here once provided — this is still
// the placeholder trailer ID.
const FILM_YOUTUBE_ID = "JgqTdAVGwUc"

export default async function WatchPage() {
  const cookieStore = await cookies()
  const hasAccess = verifyAccessToken(cookieStore.get(ACCESS_COOKIE)?.value)

  return (
    <div className="pt-16 min-h-screen bg-studio-black">

      {/* ── Header ── */}
      <section className="py-16 px-6 border-b border-studio-border/40 bg-studio-charcoal relative overflow-hidden">
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
          /* ── UNLOCKED — real, verified purchase ── */
          <div className="space-y-8">
            <div className="flex items-center gap-2" style={{ color: "#1D9E75" }}>
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Purchase Confirmed — Enjoy the Film</span>
            </div>

            <div
              className="relative aspect-video rounded-sm overflow-hidden border border-studio-border/60"
              style={{ boxShadow: "0 0 80px rgba(0,0,0,0.8), 0 0 40px rgba(212,175,119,0.06)" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${FILM_YOUTUBE_ID}?rel=0&modestbranding=1&autoplay=1`}
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
          <WatchPaywall />
        )}
      </div>
    </div>
  )
}
