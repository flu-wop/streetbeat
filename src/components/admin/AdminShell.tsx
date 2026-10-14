"use client"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Film } from "lucide-react"
import { ADMIN_SECTIONS } from "./sections"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const activeRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ inline: "center", block: "nearest" })
  }, [pathname])

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" })
    window.location.href = "/admin/login"
  }

  return (
    <div className="admin-root min-h-screen bg-studio-black">
      <header className="sticky top-0 z-30 bg-studio-black border-b border-studio-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 h-12">
            <Link href="/admin" className="flex items-center gap-2 min-w-0">
              <Film className="w-4 h-4 text-gold shrink-0" aria-hidden />
              <span className="font-display text-base text-cream truncate">Street Beat</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-mist/70">Admin</span>
            </Link>
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/" target="_blank" className="text-xs text-mist hover:text-cream">View site</Link>
              <button onClick={logout} className="text-xs text-mist hover:text-cream">Log out</button>
            </div>
          </div>
          <div className="relative">
            <nav aria-label="Admin sections" className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-2.5 pr-8">
              {ADMIN_SECTIONS.map(({ href, icon: Icon, label }) => {
                const active = href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(href + "/")
                return (
                  <Link
                    key={href}
                    href={href}
                    ref={active ? activeRef : undefined}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wide whitespace-nowrap shrink-0 transition-colors ${
                      active ? "bg-gold text-studio-black font-semibold" : "text-mist hover:text-cream"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden />
                    {label}
                  </Link>
                )
              })}
            </nav>
            <div className="pointer-events-none absolute right-0 top-0 bottom-2.5 w-8 bg-gradient-to-l from-studio-black to-transparent sm:hidden" />
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
