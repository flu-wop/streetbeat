// src/app/about/page.tsx — About the film, combined layout

import type { Metadata } from "next"
import Link              from "next/link"
import { Film, Music, Users, MapPin, Clock } from "lucide-react"
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

      {/* ── Combined story + facts ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">

          {/* Facts strip — horizontal on desktop, 2-col grid on mobile */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
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

          {/* Origin story */}
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
                <Link href="/watch">Watch the Film →</Link>
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
