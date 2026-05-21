"use client";

import Link            from "next/link";
import Image           from "next/image";
import { usePathname } from "next/navigation";
import { useState }    from "react";
import { Menu, X }     from "lucide-react";

const NAV_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Watch",   href: "/watch" },
  { label: "About",   href: "/about" },
  { label: "Merch",   href: "https://midcitysound.com/merch" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const pathname        = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-studio-border/60 bg-studio-black/90 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16">

        {/* ── Favicon + wordmark ── */}
        <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-2.5 shrink-0">
          <div className="relative w-7 h-7 shrink-0">
            <Image
              src="/favicon.png"
              alt="Street Beat"
              fill
              className="object-contain rounded-sm"
              sizes="28px"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-[14px] tracking-[0.1em] text-cream/90 group-hover:text-gold transition-colors">
              Street Beat
            </span>
            <span className="text-[8px] tracking-[0.22em] uppercase text-mist/50 mt-0.5 hidden sm:block">
              Drumming Below Sea Level
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative text-[12px] font-sans font-medium tracking-[0.08em] uppercase transition-colors duration-200",
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
          <Link
            href="/watch"
            className="h-8 px-5 border border-gold/60 text-gold text-[11px] font-medium tracking-widest uppercase rounded-sm hover:bg-gold hover:text-studio-black transition-all duration-200 flex items-center"
          >
            Watch Now
          </Link>
        </nav>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden p-2 text-mist hover:text-cream transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {open && (
        <div className="md:hidden border-t border-studio-border/40 bg-studio-black/98 backdrop-blur-md">
          <div className="px-6 py-5 border-b border-studio-border/30 flex items-center gap-3">
            <div className="relative w-8 h-8 shrink-0">
              <Image src="/favicon.png" alt="Street Beat" fill className="object-contain rounded-sm" sizes="32px" />
            </div>
            <div>
              <p className="font-display text-xl text-cream">Street Beat</p>
              <p className="text-[9px] tracking-[0.2em] uppercase text-mist/60 mt-0.5">Drumming Below Sea Level</p>
            </div>
          </div>
          <nav className="flex flex-col px-6 pb-6 pt-2 gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={[
                    "py-3.5 text-sm font-medium border-b border-studio-border/30 tracking-wide transition-colors",
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
              className="mt-4 h-11 border border-gold/60 text-gold text-[12px] font-medium tracking-widest uppercase rounded-sm hover:bg-gold hover:text-studio-black transition-all duration-200 flex items-center justify-center"
            >
              Watch Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
