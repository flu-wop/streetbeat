// Admin home — last 30 days, what needs attention, recent sales and shortcuts.
// Same layout as the other sites' admin home. Signed-out visitors go to login.
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { isAdmin } from "@/lib/admin-auth"
import { getDB } from "@/lib/db"
import { getInsights } from "@/lib/insights/core"
import { insightsConfig } from "@/lib/insights/config"
import type { Insights } from "@/lib/insights/types"
import { checkEnvVars, checkSales, type SalesResult } from "@/lib/health-checks"
import { AdminPage, adminBtn } from "@/components/admin/page-frame"
import { ADMIN_SECTIONS } from "@/components/admin/sections"
import { Stat, money, longDate } from "@/components/admin/insights-ui"

export const dynamic = "force-dynamic"
export const metadata = { title: "Admin", robots: { index: false } }

const DESCRIPTIONS: Record<string, string> = {
  "/admin/insights": "Sales, visitors, top pages & the buying funnel",
  "/admin/system": "Env vars, integration health, API usage, sales",
}

const TZ = "America/Chicago"
const localDay = (d: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d)

function greeting() {
  const h = Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: TZ }).format(new Date()))
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"
}

export default async function AdminHome() {
  if (!(await isAdmin())) redirect("/admin/login?next=/admin")

  const today = localDay(new Date())

  let data: Insights | null = null
  let failed = false
  try { data = await getInsights(getDB(), insightsConfig, 30) } catch (err) { console.error("[admin home]", err); failed = true }

  let sales: SalesResult | null = null
  try { sales = await checkSales() } catch (err) { console.error("[admin home] sales", err) }

  const missing = Object.entries(checkEnvVars()).filter(([, r]) => r.status === "error").map(([k]) => k)
  const rev = data?.sources.find((s) => s.key === "revenue")
  const count = data?.sources.find((s) => s.key === "sales")
  const recent = (sales?.live.recent ?? []).slice(0, 6)

  return (
    <AdminPage>
      <div className="mb-6 sm:mb-8">
        <p className="text-[10px] tracking-[0.26em] uppercase text-gold mb-1.5">{longDate(today)}</p>
        <h1 className="font-display text-3xl sm:text-4xl text-cream leading-tight">{greeting()}, James</h1>
      </div>

      {missing.length > 0 && (
        <p className="mb-4 text-sm text-red-300 border border-red-400/30 bg-red-400/5 px-4 py-3">
          {missing.length} required setting{missing.length === 1 ? " is" : "s are"} missing ({missing.slice(0, 3).join(", ")}
          {missing.length > 3 ? "…" : ""}). <Link href="/admin/system" className="underline">Check System</Link>
        </p>
      )}

      <section aria-label="Last 30 days" className="mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-mist">Last 30 days</h2>
          <Link href="/admin/insights" className="text-xs text-gold hover:underline inline-flex items-center gap-1">
            All insights <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {data && rev && count ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Stat label="Revenue" value={money(rev.total)} cur={rev.total} prev={rev.prev} />
            <Stat label="Sales" value={String(count.total)} cur={count.total} prev={count.prev} />
            <Stat label="Visitors" value={data.visitors.cur.toLocaleString("en-US")} cur={data.visitors.cur} prev={data.visitors.prev} />
            <Stat label="Page views" value={data.pageviews.cur.toLocaleString("en-US")} cur={data.pageviews.cur} prev={data.pageviews.prev} />
          </div>
        ) : (
          <p className="text-sm text-mist bg-studio-card border border-studio-border p-4">
            {failed ? "Couldn’t load numbers right now. Sections below still work." : "Numbers aren’t available yet. Sections below still work."}
          </p>
        )}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:gap-6 lg:grid-cols-[1.1fr_1fr]">
        <section aria-label="Recent sales">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-mist">Recent sales</h2>
            <Link href="/admin/system" className="text-xs text-gold hover:underline inline-flex items-center gap-1">
              Sales detail <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="bg-studio-card border border-studio-border">
            {recent.length === 0 ? (
              <div className="p-6 text-center">
                <p className="font-display text-xl text-cream mb-1">No sales yet</p>
                <p className="text-sm text-mist">Film purchases show up here as they come in.</p>
              </div>
            ) : (
              <ul className="divide-y divide-studio-border">
                {recent.map((s) => {
                  const day = localDay(new Date(s.date))
                  return (
                    <li key={s.date + s.email} className="flex gap-4 px-4 sm:px-5 py-3.5">
                      <div className="w-16 shrink-0">
                        <p className={`text-[10px] tracking-[0.14em] uppercase ${day === today ? "text-gold font-medium" : "text-mist"}`}>
                          {day === today ? "Today" : longDate(day).split(",")[0]}
                        </p>
                        <p className="text-sm text-cream tabular-nums whitespace-nowrap">{money(s.amountCents / 100)}</p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-cream font-medium truncate">{s.email}</p>
                        <p className="text-[11px] text-mist/70 truncate">{longDate(day)}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
            {sales && sales.legacy.count > 0 && (
              <p className="px-4 sm:px-5 py-3 border-t border-studio-border text-xs text-mist/70">
                {sales.legacy.count} legacy (pre-relaunch) purchase(s) on record, not counted above.
              </p>
            )}
          </div>
        </section>

        <section aria-label="Sections">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-mist mb-3">Go to</h2>
          <div className="grid grid-cols-2 gap-3">
            {ADMIN_SECTIONS.filter((s) => s.href !== "/admin").map(({ href, label, icon: Icon }) => {
              const hero = href === "/admin/insights"
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group border p-4 transition-colors min-w-0 hover:border-gold col-span-2 ${hero ? "bg-gold/10 border-studio-border" : "bg-studio-card border-studio-border"}`}
                >
                  <Icon className="w-4 h-4 mb-3 text-gold" strokeWidth={1.6} aria-hidden />
                  <p className="font-display text-base leading-tight text-cream">{label}</p>
                  <p className="text-xs mt-1 leading-snug text-mist">{DESCRIPTIONS[href]}</p>
                </Link>
              )
            })}
          </div>
          <Link href="/" className={`${adminBtn.secondary} w-full mt-3`}>
            Open the site
          </Link>
        </section>
      </div>
    </AdminPage>
  )
}
