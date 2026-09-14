// src/app/admin/system/page.tsx
"use client"
import { useState, useEffect, useCallback } from "react"
import { Lock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CheckResult = { status: "ok" | "warn" | "error"; detail: string }
type SaleRow = { email: string; amountCents: number; date: string }
type SalesResult = CheckResult & {
  live: { count30d: number; revenueCents30d: number; recent: SaleRow[] }
  legacy: { count: number }
}
type HealthData = {
  envVars: Record<string, CheckResult>
  integrationHealth: { stripe: CheckResult; resend: CheckResult; turso: CheckResult; metaPixel: CheckResult }
  sales: SalesResult
  checkedAt: string
}

const STATUS_DOT = { ok: "bg-emerald-400", warn: "bg-amber-400", error: "bg-red-400" }

function Pill({ status }: { status: "ok" | "warn" | "error" }) {
  return <span className={`inline-block w-2 h-2 rounded-full mr-2 mt-1.5 shrink-0 ${STATUS_DOT[status]}`} />
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-studio-card border border-studio-border rounded-sm p-6">
      <h3 className="font-display text-xl text-gold mb-4">{title}</h3>
      {children}
    </div>
  )
}

export default function SystemDashboard() {
  const [password, setPassword] = useState("")
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState<HealthData | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchHealth = useCallback(async (pw: string) => {
    setLoading(true)
    const res = await fetch("/api/admin/health", { headers: { Authorization: `Bearer ${pw}` } })
    setLoading(false)
    if (!res.ok) { setError("Wrong secret or check failed."); return }
    setData(await res.json())
    setAuthed(true)
    setError("")
  }, [])

  useEffect(() => {
    if (!authed) return
    const interval = setInterval(() => fetchHealth(password), 60_000)
    return () => clearInterval(interval)
  }, [authed, password, fetchHealth])

  if (!authed) {
    return (
      <div className="min-h-screen bg-studio-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-studio-card border border-studio-border rounded-sm p-8">
          <div className="w-10 h-10 border border-gold/40 rounded-full flex items-center justify-center mb-5">
            <Lock className="w-4 h-4 text-gold" />
          </div>
          <h1 className="font-display text-2xl text-cream mb-1">Street Beat Admin</h1>
          <p className="text-mist text-sm mb-6">System health — access secret required.</p>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Access secret"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchHealth(password)}
              autoFocus
            />
            <Button className="w-full" onClick={() => fetchHealth(password)} disabled={loading || !password}>
              {loading ? "Checking…" : "Enter"}
            </Button>
          </div>
          {error && <p className="text-red-400 text-xs mt-4">{error}</p>}
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-studio-black px-6 sm:px-10 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <h1 className="font-display text-3xl text-cream">System Health</h1>
          <button
            onClick={() => fetchHealth(password)}
            className="text-mist hover:text-gold transition-colors"
            aria-label="Refresh now"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <p className="text-mist text-xs mb-8">
          Last checked {new Date(data.checkedAt).toLocaleTimeString()} — refreshes every 60s
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <Card title="Env Vars">
            {Object.entries(data.envVars).map(([key, r]) => (
              <div key={key} className="flex items-start text-sm text-cream mb-1.5">
                <Pill status={r.status} /> <span className="font-mono text-xs">{key} — {r.detail}</span>
              </div>
            ))}
          </Card>

          <Card title="Integration Health">
            {Object.entries(data.integrationHealth).map(([key, r]) => (
              <div key={key} className="flex items-start text-sm text-cream mb-2">
                <Pill status={r.status} />
                <span><b className="capitalize">{key}</b> — {r.detail}</span>
              </div>
            ))}
          </Card>

          <Card title="Sales">
            <div className="flex items-start text-sm text-cream mb-4">
              <Pill status={data.sales.status} /> <span>{data.sales.detail}</span>
            </div>
            <div className="text-xs text-mist mb-2 uppercase tracking-wide">Recent (live, last 30 days)</div>
            {data.sales.live.recent.length === 0 && (
              <div className="text-sm text-mist/60">No sales in this window.</div>
            )}
            {data.sales.live.recent.map((s) => (
              <div key={s.date + s.email} className="flex justify-between text-sm py-1.5 border-b border-studio-border/60">
                <span className="text-cream truncate pr-2">{s.email}</span>
                <span className="text-gold font-mono shrink-0">${(s.amountCents / 100).toFixed(2)}</span>
                <span className="text-mist/60 shrink-0 pl-2">{new Date(s.date).toLocaleDateString()}</span>
              </div>
            ))}
            <div className="text-xs text-mist/60 mt-3">
              {data.sales.legacy.count} legacy (pre-relaunch) purchase(s) on record — imported, not live.
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
