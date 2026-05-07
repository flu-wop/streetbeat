// src/components/layout/Navbar.tsx
// Film site navigation — same structure as MCS, adapted for the documentary.
// Logo: film title wordmark. Links: Home, Watch, About, Contact.
// The "Watch Now" CTA mirrors "Book Now" on MCS — same gold-outline style.

"use client";

import Link            from "next/link";
import { usePathname } from "next/navigation";
import { useState }    from "react";
import { Menu, X, Film } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Watch",   href: "/watch" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const pathname        = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-studio-border/60 bg-studio-black/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">

        {/* ── Logo / wordmark ── */}
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 border border-gold/50 rounded-sm flex items-center justify-center group-hover:bg-gold/10 transition-colors">
            <Film className="w-3.5 h-3.5 text-gold" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[14px] tracking-[0.1em] text-cream/90 group-hover:text-gold transition-colors">
              Street Beat
            </span>
            <span className="text-[8px] tracking-[0.22em] uppercase text-mist/50 mt-0.5">
              Drumming Below Sea Level
            </span>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative text-[12px] font-medium tracking-[0.06em] uppercase transition-colors",
                  "after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-gold",
                  "after:transition-all after:duration-300",
                  isActive
                    ? "text-gold after:w-full"
                    : "text-mist hover:text-cream after:w-0 hover:after:w-full",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}

          {/* CTA — mirrors MCS "Book Now" */}
          <Link
            href="/watch"
            className="ml-2 px-4 py-1.5 text-[11px] font-medium tracking-widest uppercase border border-gold text-gold hover:bg-gold hover:text-studio-black transition-all duration-200 rounded-sm"
          >
            Watch Now
          </Link>
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden p-2 text-mist hover:text-cream transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="md:hidden border-t border-studio-border bg-studio-black">
          <div className="px-6 pt-5 pb-3 border-b border-studio-border/40">
            <p className="font-display text-xl text-cream">Street Beat</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-mist/60 mt-1">Drumming Below Sea Level</p>
          </div>
          <nav className="flex flex-col px-6 pb-5 pt-2 gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={[
                    "py-3 text-sm font-medium border-b border-studio-border/40 transition-colors",
                    isActive ? "text-gold" : "text-mist hover:text-cream",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/watch"
              onClick={() => setOpen(false)}
              className="mt-3 text-center py-2.5 border border-gold text-gold text-sm font-medium tracking-widest uppercase hover:bg-gold hover:text-studio-black transition-all"
            >
              Watch Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
