import Link  from "next/link";
import Image from "next/image";
import { Instagram, ExternalLink } from "lucide-react";

const SITE_LINKS = [
  { label: "Home",    href: "/" },
  { label: "Watch",   href: "/watch" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "@midcitysoundnola",   href: "https://www.instagram.com/midcitysoundnola/" },
  { label: "@donald_markowitz",   href: "https://www.instagram.com/donald_markowitz/" },
  { label: "@fire_on_the_bayou_", href: "https://www.instagram.com/fire_on_the_bayou_/" },
  { label: "@dougbelote",         href: "https://www.instagram.com/dougbelote/" },
];

export function Footer() {
  return (
    <footer className="border-t border-studio-border bg-studio-charcoal">

      <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">

        {/* ── Brand column ── */}
        <div className="space-y-5 md:col-span-1 text-center md:text-left">
          <div>
            <p className="font-display text-2xl text-cream tracking-wide">Street Beat</p>
            <p className="font-display text-lg text-gold/70 italic font-light">Drumming Below Sea Level</p>
            <p className="text-[10px] tracking-[0.2em] uppercase text-mist/50 mt-2">
              A Mid City Sound Production
            </p>
          </div>
          <p className="text-mist text-sm leading-relaxed md:max-w-xs mx-auto md:mx-0">
            A documentary film exploring the unique drum sound of New Orleans —
            produced by Mid City Sound &amp; Fire on the Bayou, hosted by Doug Belote.
          </p>
          <div className="space-y-2 pt-1">
            <p className="text-[10px] tracking-[0.18em] uppercase text-gold/60">Follow on Instagram</p>
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-xs text-mist hover:text-gold transition-colors"
              >
                <Instagram className="w-3 h-3 shrink-0" />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── Film links ── */}
        <div className="space-y-4 text-center md:text-left">
          <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-gold/70">Film</p>
          <ul className="space-y-2.5">
            {SITE_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-sm text-mist hover:text-cream transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Production ── */}
        <div className="space-y-4 text-center">
          <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-gold/70">Production</p>

          <Link
            href="https://midcitysound.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 border border-studio-border/60 rounded-sm hover:border-gold/40 transition-all duration-200 group"
          >
            <div className="flex justify-center mb-3">
              <div className="relative w-[200px] h-[66px] opacity-90 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/images/mcs2-logo.png"
                  alt="Mid City Sound Studios"
                  fill
                  className="object-contain object-center"
                  sizes="200px"
                />
              </div>
            </div>
            <p className="text-mist text-xs leading-relaxed group-hover:text-cream transition-colors">
              The studio behind the sound. Book studio sessions in New Orleans.
            </p>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-gold/50 text-[10px] group-hover:text-gold transition-colors">
              <span>midcitysound.com</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </Link>

          <Link
            href="https://donaldmarkowitz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex flex-col items-center p-3 border border-studio-border/40 rounded-sm hover:border-gold/30 group transition-all duration-200"
          >
            <p className="text-cream text-xs font-medium group-hover:text-gold transition-colors">Donald Markowitz</p>
            <p className="text-mist/50 text-[10px]">Producer · Composer · Founder</p>
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-studio-border/50">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-mist/50 text-xs">
            © {new Date().getFullYear()} Street Beat: Drumming Below Sea Level · Mid City Sound · New Orleans, LA
          </p>
          <p className="text-mist/30 text-xs">Runtime: 54 Minutes</p>
        </div>
      </div>
    </footer>
  );
}
