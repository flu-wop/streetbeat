"use client"
// src/app/watch/WatchPaywall.tsx
// The paywall UI, extracted from watch/page.tsx so the page itself can be a
// server component (needed to read the access cookie server-side).

import { useState } from "react"
import Link          from "next/link"
import Image         from "next/image"
import {
  Lock, ShieldCheck, Monitor, ShoppingCart,
} from "lucide-react"
import { Button }    from "@/components/ui/button"

export default function WatchPaywall() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handlePurchase() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/checkout", { method: "POST" })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || "Something went wrong.")
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">

      {/* Lock screen preview */}
      <div className="relative aspect-video rounded-sm overflow-hidden border border-studio-border/60 bg-studio-dark">
        <Image src="/images/streetbeat-poster.png" alt="" fill className="object-cover opacity-[0.45] blur-sm" sizes="800px" />
        <div className="absolute inset-0 bg-studio-black/60 flex flex-col items-center justify-center gap-5 text-center px-8">
          <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center bg-studio-black/60 backdrop-blur-sm">
            <Lock className="w-7 h-7 text-gold/60" />
          </div>
          <div>
            <p className="font-display text-2xl text-cream">Purchase to Watch</p>
            <p className="text-mist text-sm mt-1">$10.00 · One-time purchase · No subscription.</p>
          </div>
        </div>
      </div>

      {/* Purchase card */}
      <div
        className="border border-gold/25 rounded-sm overflow-hidden"
        style={{ boxShadow: "0 0 40px rgba(212,175,119,0.06)" }}
      >
        <div className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <p className="font-display text-7xl text-gold leading-none">
              $10<span className="text-4xl text-gold/70">.00</span>
            </p>
            <p className="text-mist text-sm">One-time · Own forever · No subscription</p>
          </div>

          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full h-14 bg-gold text-studio-black text-[14px] font-bold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
          >
            <ShoppingCart className="w-5 h-5" />
            {loading ? "Starting checkout…" : "Purchase for $10.00"}
          </button>

          {error && (
            <p className="text-center text-xs text-red-400">{error}</p>
          )}

          <div className="flex flex-wrap justify-center gap-5 text-mist/50 text-xs pt-1">
            {[
              { icon: ShieldCheck, text: "Secure payment" },
              { icon: Monitor,     text: "Any device" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />{text}
              </div>
            ))}
          </div>
        </div>

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
  )
}
