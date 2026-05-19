// src/app/contact/page.tsx
"use client"
import { useState } from "react"
import { Mail, CheckCircle2, MapPin } from "lucide-react"
import { Button }   from "@/components/ui/button"
import { Badge }    from "@/components/ui/badge"
import { Input }    from "@/components/ui/input"
import { Label }    from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const INQUIRY_TYPES = ["Screening / Licensing","Press / Media","Booking / Distribution","General","Technical Support"]

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", inquiry:"", message:"" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  function update(f: string, v: string) { setForm(p => ({...p, [f]: v})) }
  async function handleSubmit() {
    setLoading(true)
    // Wire to /api/contact with Resend or SendGrid
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }
  return (
    <div className="pt-16 min-h-screen bg-studio-black">
      <section className="py-20 px-6 border-b border-studio-border/40 bg-studio-charcoal">
        <div className="mx-auto max-w-4xl">
          <Badge variant="outline" className="mb-4 text-[10px] tracking-widest uppercase">Contact</Badge>
          <h1 className="font-display text-5xl md:text-6xl text-cream mb-4 leading-tight">Get in touch</h1>
          <p className="text-mist text-sm max-w-md leading-relaxed">
            Screening inquiries, press access, group licensing, or general questions — we read every message.
          </p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl grid md:grid-cols-[260px_1fr] gap-14">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gold/60 mb-2">Email</p>
              <a href="mailto:midcitysound1@gmail.com" className="text-cream text-sm hover:text-gold transition-colors">midcitysound1@gmail.com</a>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gold/60 mb-2">Studio</p>
              <div className="flex items-start gap-2 text-mist text-sm">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-gold/40 shrink-0" />
                <span>Mid City Sound Studios<br />530 S Norman C Francis Pkwy<br />New Orleans, Louisiana</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase text-gold/60 mb-2">Instagram</p>
              <a href="https://www.instagram.com/midcitysoundnola/" target="_blank" rel="noopener noreferrer" className="text-mist text-sm hover:text-gold transition-colors">@midcitysoundnola</a>
            </div>
          </div>
          {sent ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-5 text-center">
              <div className="w-14 h-14 border border-gold/40 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-gold" />
              </div>
              <h2 className="font-display text-3xl text-cream">Message received</h2>
              <p className="text-mist text-sm max-w-xs">We&apos;ll get back to you at <span className="text-gold">{form.email}</span> within 1–2 business days.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">Name *</Label><Input id="name" value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your name" /></div>
                <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@example.com" /></div>
              </div>
              <div className="space-y-2">
                <Label>Inquiry Type</Label>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_TYPES.map(t => (
                    <button key={t} onClick={() => update("inquiry", t)}
                      className={["px-3 py-1.5 text-xs border rounded-sm transition-all", form.inquiry === t ? "border-gold bg-gold/10 text-gold" : "border-studio-border text-mist hover:border-gold/40"].join(" ")}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-2"><Label htmlFor="message">Message *</Label><Textarea id="message" value={form.message} onChange={e => update("message", e.target.value)} placeholder="Tell us what you need..." className="h-36" /></div>
              <Button onClick={handleSubmit} disabled={!form.name || !form.email || !form.message || loading}>
                {loading ? <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-studio-black/30 border-t-studio-black rounded-full animate-spin"/>Sending…</span> : <><Mail className="w-4 h-4"/>Send Message</>}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
