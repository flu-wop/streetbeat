// src/app/about/page.tsx — Street Beat: About the Film

import type { Metadata } from "next"
import Link              from "next/link"
import Image             from "next/image"
import { Film, Music, Users, MapPin, Clock, ShoppingCart } from "lucide-react"
import { Button }    from "@/components/ui/button"
import { Badge }     from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title:       "About the Film | Street Beat Documentary",
  description: "The story behind Street Beat: Drumming Below Sea Level — a Mid City Sound production about New Orleans percussion.",
}

const FACTS = [
  { icon: Clock,  label: "Runtime",  value: "54 minutes" },
  { icon: MapPin, label: "Location", value: "New Orleans, Louisiana" },
  { icon: Music,  label: "Studio",   value: "Mid City Sound Studios" },
  { icon: Users,  label: "Host",     value: "Doug Belote" },
]

const DRUMMER_PHOTOS: { file: string | null; alt: string }[] = [
  { file: "IMG_1152.jpg", alt: "New Orleans drummer" },
  { file: "IMG_1190.jpg", alt: "New Orleans drummer" },
  { file: "IMG_1230.jpg", alt: "New Orleans drummer" },
  { file: "IMG_1243.jpg", alt: "New Orleans drummer" },
  { file: "IMG_1957.jpg", alt: "New Orleans drummer" },
  { file: "IMG_1975.jpg", alt: "New Orleans drummer" },
  { file: "IMG_2011.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4045.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4073.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4079.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4241.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4247.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4250.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4256.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4907.jpg", alt: "New Orleans drummer" },
  { file: "IMG_4912.jpg", alt: "New Orleans drummer" },
]

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-studio-black">

      {/* ── Page header ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-studio-border/40 bg-studio-charcoal">
        <div className="mx-auto max-w-4xl text-center sm:text-left">
          <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">About the Film</Badge>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-4 leading-tight">
            The Sound Behind the Film
          </h1>
          <p className="text-mist text-sm max-w-lg leading-relaxed mx-auto sm:mx-0">
            Street Beat began with a simple question: what makes the New Orleans drum
            sound unlike anything else on earth? The answer required going back to the source.
          </p>
        </div>
      </section>

      {/* ── Facts strip ── */}
      <section className="py-10 px-4 sm:px-6 border-b border-studio-border/40">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FACTS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 border border-studio-border rounded-sm bg-studio-card gap-2">
                <Icon className="w-4 h-4 text-gold/60" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-mist/50">{label}</p>
                  <p className="text-cream text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Drummer photo grid — 16 slots ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-b border-studio-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10">
            <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">
              The Drummers
            </Badge>
            <h2 className="font-display text-3xl text-cream leading-tight">
              The Heartbeat of<br />
              <span className="text-gold-gradient italic">New Orleans</span>
            </h2>
            <Separator className="w-10 bg-gold/40 mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 auto-rows-[180px]">
            {DRUMMER_PHOTOS.map(({ file, alt }, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-sm bg-studio-dark border border-studio-border/40"
              >
                <Image
                  src={`/images/${file}`}
                  alt={alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Origin story ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5">
              <Film className="w-4 h-4 text-gold/60" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">The Origin Story</p>
            </div>
            <h2 className="font-display text-3xl text-cream text-center sm:text-left">
              The Question the City Never Stopped Asking
            </h2>
            <Separator className="w-10 bg-gold/40 mx-auto sm:mx-0" />

            <div className="space-y-4 text-mist text-sm leading-relaxed">
              <p>
                Mid City Sound Studios has always been rooted in New Orleans rhythm. When
                producer Donald Markowitz and the team at Fire on the Bayou began discussing the
                New Orleans percussion tradition, one question kept coming up:{" "}
                <em className="not-italic text-cream/80">why does it sound the way it does?</em>
              </p>
              <p>
                The answer wasn&apos;t in a textbook. It was in the people — the drummers who
                learned it from their parents, who played it in brass bands before they could
                drive, who carry it in their bodies like a second heartbeat.
              </p>
              <p>
                Doug Belote was the natural host. As one of New Orleans&apos; most in-demand
                drummers and a longtime collaborator of Mid City Sound, he had the relationships
                and the credibility to have the conversations that this film needed to have.
              </p>
              <p>
                What emerged was 54 minutes of music, memory, and rhythm — a portrait of a
                sound that can&apos;t be manufactured and can&apos;t be exported. It can only be absorbed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 items-center sm:items-start">
              <Button asChild>
                <Link href="/watch">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Watch the Film — $10.00
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
