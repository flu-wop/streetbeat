// src/components/layout/SiteChrome.tsx
// Wraps the public Navbar/Footer so admin routes render without them,
// without restructuring the app directory into route groups. The root
// layout still owns <html>/<body>/Meta Pixel/JSON-LD for every route —
// this only decides whether the marketing chrome wraps the page content.
"use client"
import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) return <>{children}</>

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}
