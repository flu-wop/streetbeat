// src/app/admin/page.tsx
// Admin home. Static launcher only; every page behind it asks for the
// access secret itself, so nothing sensitive renders here.
import Link from "next/link"

const PAGES = [
  { href: "/admin/insights", title: "Insights", desc: "Sales, visitors, top pages and the buying funnel." },
  { href: "/admin/system", title: "System", desc: "Env vars, integration health, API usage, sales." },
]

export default function AdminHome() {
  return (
    <div className="min-h-screen bg-studio-black px-6 sm:px-10 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl text-cream mb-1">Street Beat Admin</h1>
        <p className="text-mist text-sm mb-8">Pick a page.</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="bg-studio-card border border-studio-border rounded-sm p-6 hover:border-gold/50 transition-colors"
            >
              <h3 className="font-display text-xl text-gold mb-2">{p.title}</h3>
              <p className="text-mist text-sm">{p.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
