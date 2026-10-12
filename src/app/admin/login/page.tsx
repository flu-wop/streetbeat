// src/app/admin/login/page.tsx
"use client"
import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Lock } from "lucide-react"
import { Button } from "@flu-wop/design-system"
import { Input } from "@/components/ui/input"

function LoginForm() {
  const params = useSearchParams()
  const [secret, setSecret] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function submit() {
    setLoading(true)
    setError("")
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    })
    if (res.ok) {
      const next = params.get("next")
      window.location.href = next && next.startsWith("/admin") ? next : "/admin"
      return
    }
    setLoading(false)
    setError((await res.json().catch(() => ({}))).error ?? "Sign-in failed.")
  }

  return (
    <div className="min-h-screen bg-studio-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-studio-card border border-studio-border rounded-sm p-8">
        <div className="w-10 h-10 border border-gold/40 rounded-full flex items-center justify-center mb-5">
          <Lock className="w-4 h-4 text-gold" />
        </div>
        <h1 className="font-display text-2xl text-cream mb-1">Street Beat Admin</h1>
        <p className="text-mist text-sm mb-6">Access secret required.</p>
        <div className="space-y-3">
          <Input
            type="password"
            placeholder="Access secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && secret && submit()}
            autoFocus
          />
          <Button className="w-full" onClick={submit} disabled={loading || !secret}>
            {loading ? "Checking…" : "Enter"}
          </Button>
        </div>
        {error && <p className="text-red-400 text-xs mt-4">{error}</p>}
      </div>
    </div>
  )
}

export default function AdminLogin() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
