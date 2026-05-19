// src/app/about/page.tsx — About the film + full credits

import type { Metadata } from "next"
import Link              from "next/link"
import { ArrowRight, Film, Music, Users, MapPin } from "lucide-react"
import { Button }    from "@/components/ui/button"
import { Badge }     from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title:       "About the Film",
  description: "The story behind Street Beat: Drumming Below Sea Level — a Mid City Sound production about New Orleans percussion.",
}

const FULL_CREDITS = [
  { category: "Direction & Production", credits: [
    { role: "Produced by", name: "Mid City Sound Studios" },
    { role: "Produced by", name: "Fire on the Bayou" },
    { role: "Produced by", name: "Doreja Productions" },
    { role: "Host",        name: "Doug Belote" },
  ]},
]

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-studio-black">

      {/* ── Header ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-studio-border/40 bg-studio-charcoal">
        <div className="mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">About the Film</Badge>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-4 leading-tight">
            The Sound Behind the Film
          </h1>
          <p className="text-mist text-sm max-w-lg leading-relaxed">
            Street Beat began with a simple question: what makes the New Orleans drum sound
            unlike anything else on earth? The answer required going back to the source.
          </p>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl grid md:grid-cols-[1fr_280px] gap-14">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 mb-6">
              <Film className="w-4 h-4 text-gold/60" />
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">The Origin Story</p>
            </div>
            <h2 className="font-display text-3xl text-cream">The Question the City Never Stopped Asking</h2>
            <Separator className="w-10 bg-gold/40" />
            <div className="space-y-4 text-mist text-sm leading-relaxed">
              <p>
                Mid City Sound Studios has always been rooted in New Orleans rhythm.
                When producer Donald Markowitz and the team at Fire on the Bayou began
                discussing the New Orleans percussion tradition, one question kept coming up:
                <em className="not-italic text-cream/80"> why does it sound the way it does?</em>
              </p>
              <p>
                The answer wasn't in a textbook. It was in the people — the drummers who
                learned it from their parents, who played it in brass bands before they could
                drive, who carry it in their bodies like a second heartbeat.
              </p>
              <p>
                Doug Belote was the natural host. As one of New Orleans' most in-demand
                drummers and a longtime collaborator of Mid City Sound, he had the relationships
                and the credibility to have the conversations that this film needed to have.
              </p>
              <p>
                What emerged was 54 minutes of music, memory, and rhythm — a portrait of a
                sound that can't be manufactured and can't be exported. It can only be absorbed.
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <Button asChild><Link href="/watch">Watch the Film <ArrowRight className="w-4 h-4" /></Link></Button>
              <Button variant="outline" asChild><Link href="/contact">Contact</Link></Button>
            </div>
          </div>

          {/* Film facts sidebar */}
          <div className="space-y-4">
            {[
              { icon: Film,  label: "Runtime",    value: "54 minutes" },
              { icon: MapPin,label: "Location",   value: "New Orleans, Louisiana" },
              { icon: Music, label: "Studio",     value: "Mid City Sound Studios" },
              { icon: Users, label: "Host",       value: "Doug Belote" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 p-4 border border-studio-border rounded-sm bg-studio-card">
                <div className="w-8 h-8 border border-studio-border rounded-sm flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-gold/60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-mist/50">{label}</p>
                  <p className="text-cream text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}