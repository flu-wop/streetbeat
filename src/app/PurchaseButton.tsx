"use client"

// src/app/PurchaseButton.tsx
// One-click purchase CTA — posts straight to /api/checkout and redirects to
// Stripe. Replaces the old pattern of linking to /watch, where the visitor
// had to click "Purchase for $10.00" a second time before checkout started.

import { useState } from "react"
import { ShoppingCart, Loader2 } from "lucide-react"

export default function PurchaseButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch("/api/checkout", { method: "POST" })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error("[PurchaseButton] Checkout error:", data.error)
        setLoading(false)
      }
    } catch (err) {
      console.error("[PurchaseButton] Failed to start checkout:", err)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 h-12 px-8 bg-gold text-studio-black text-[13px] font-semibold tracking-widest uppercase rounded-sm hover:bg-gold-light transition-colors disabled:opacity-70"
      }
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <ShoppingCart className="w-4 h-4" />
      )}
      {loading ? "Starting checkout…" : "Purchase for $10.00"}
    </button>
  )
}
