// src/app/admin/system/page.tsx
"use client"
import { useState, useEffect, useCallback } from "react"

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

const STATUS_COLOR = { ok: "#4ADE80", warn: "#FACC15", error: "#F87171" }

function Pill({ status }: { status: "ok" | "warn" | "error" }) {
  return (
    <span
      style={{
        display: "inline-block", width: 10, height: 10, borderRadius: "50%",
        background: STATUS_COLOR[status], marginRight: 8, flexShrink: 0,
      }}
    />
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--color-card, #1C1C1C)", border: "1px solid var(--color-border, #2A2A2A)",
      borderRadius: 12, padding: 20, color: "var(--color-cream, #F5EDD8)", fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
    }}>
      <h3 style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', serif)", fontWeight: 400, fontSize: 20, color: "var(--color-gold, #D4AF77)", marginBottom: 12 }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function SystemDashboard() {
  const [password, setPassword] = useState("")
  const [authed, setAuthed] = useState(false)
  const [data, setData] = useState<HealthData | null>(null)
  const [error, setError] = useState("")

  const fetchHealth = useCallback(async (pw: string) => {
    const res = await fetch("/api/admin/health", { headers: { Authorization: `Bearer ${pw}` } })
    if (!res.ok) { setError("Wrong secret or check failed"); return }
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
      <div style={{ padding: 40, background: "#090909", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
        <input
          type="password" placeholder="Access secret" value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchHealth(password)}
          style={{ padding: 10, borderRadius: 6, border: "1px solid #2A2A2A", background: "#111", color: "#F5EDD8" }}
        />
        {error && <p style={{ color: "#F87171", marginTop: 8, fontSize: 13 }}>{error}</p>}
      </div>
    )
  }

  if (!data) return null

  return (
    <div style={{ padding: 40, background: "#090909", minHeight: "100vh" }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 32, color: "#F5EDD8", marginBottom: 24 }}>
        System Health
      </h1>
      <p style={{ color: "#A89880", marginBottom: 24, fontSize: 13 }}>
        Last checked {new Date(data.checkedAt).toLocaleTimeString()} — refreshes every 60s
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
        <Card title="Env Vars">
          {Object.entries(data.envVars).map(([key, r]) => (
            <div key={key} style={{ display: "flex", alignItems: "flex-start", marginBottom: 6, fontSize: 13 }}>
              <Pill status={r.status} /> <span>{key} — {r.detail}</span>
            </div>
          ))}
        </Card>

        <Card title="Integration Health">
          {Object.entries(data.integrationHealth).map(([key, r]) => (
            <div key={key} style={{ display: "flex", alignItems: "flex-start", marginBottom: 8, fontSize: 14 }}>
              <Pill status={r.status} />
              <span><b style={{ textTransform: "capitalize" }}>{key}</b> — {r.detail}</span>
            </div>
          ))}
        </Card>

        <Card title="Sales">
          <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 12, fontSize: 14 }}>
            <Pill status={data.sales.status} /> <span>{data.sales.detail}</span>
          </div>
          <div style={{ fontSize: 13, color: "#A89880", marginBottom: 6 }}>Recent (live, last 30 days)</div>
          {data.sales.live.recent.length === 0 && (
            <div style={{ fontSize: 13, color: "#666" }}>No sales in this window.</div>
          )}
          {data.sales.live.recent.map((s) => (
            <div key={s.date + s.email} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", borderBottom: "1px solid #2A2A2A" }}>
              <span style={{ color: "#F5EDD8" }}>{s.email}</span>
              <span style={{ color: "#D4AF77", fontFamily: "'DM Mono', monospace" }}>${(s.amountCents / 100).toFixed(2)}</span>
              <span style={{ color: "#666" }}>{new Date(s.date).toLocaleDateString()}</span>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "#666", marginTop: 10 }}>
            {data.sales.legacy.count} legacy (pre-relaunch) purchase(s) on record — imported, not live.
          </div>
        </Card>
      </div>
    </div>
  )
}
