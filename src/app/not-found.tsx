import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Film } from "lucide-react"
export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen bg-studio-black flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-sm">
        <div className="w-14 h-14 border border-studio-border rounded-sm flex items-center justify-center mx-auto">
          <Film className="w-6 h-6 text-gold/40" />
        </div>
        <p className="font-display text-7xl text-gold/20">404</p>
        <h1 className="font-display text-3xl text-cream">Scene not found</h1>
        <p className="text-mist text-sm">That page doesn&apos;t exist — but the film does.</p>
        <div className="flex gap-3 justify-center">
          <Button asChild><Link href="/">Home</Link></Button>
          <Button variant="outline" asChild><Link href="/watch">Watch Now</Link></Button>
        </div>
      </div>
    </div>
  )
}
