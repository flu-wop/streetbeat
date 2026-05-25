// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default:  "Street Beat: Drumming Below Sea Level | Documentary Film",
    template: "%s | Street Beat Documentary",
  },
  description:
    "A 54-minute documentary exploring the unique drum sound of New Orleans. " +
    "NOLA's most influential drummers — in their own words, in the city that made them. " +
    "Produced by Mid City Sound & Fire on the Bayou. Hosted by Doug Belote.",
  keywords: [
    "New Orleans drumming documentary",
    "NOLA drum sound",
    "street beat documentary",
    "Doug Belote drummer",
    "Mid City Sound Studios",
    "New Orleans percussion",
    "second line drumming",
    "New Orleans music documentary",
    "drumming below sea level",
    "NOLA jazz documentary",
    "New Orleans rhythm",
    "Fire on the Bayou",
    "Donald Markowitz",
  ],
  metadataBase: new URL("https://www.streetbeat.video"),
  alternates: { canonical: "https://www.streetbeat.video" },
  icons: { icon: "/favicon.png", shortcut: "/favicon.ico", apple: "/favicon.png" },
  openGraph: {
    type:        "video.movie",
    url:         "https://www.streetbeat.video",
    siteName:    "Street Beat: Drumming Below Sea Level",
    title:       "Street Beat: Drumming Below Sea Level | Documentary Film",
    description: "What is the New Orleans drum sound? NOLA's most influential drummers answer the question the city has been asking for a hundred years. 54 minutes.",
    images: [{ url: "/images/streetbeat-poster.png", width: 1328, height: 784, alt: "Street Beat: Drumming Below Sea Level — Documentary Film" }],
    locale: "en_US",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Street Beat: Drumming Below Sea Level",
    description: "What is the New Orleans drum sound? A 54-minute documentary. Produced by Mid City Sound & Fire on the Bayou.",
    images:      ["/images/streetbeat-poster.png"],
  },
  robots: {
    index:          true,
    follow:         true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* JSON-LD structured data — Film */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Movie",
            "name": "Street Beat: Drumming Below Sea Level",
            "description": "A documentary film exploring the unique drum sound of New Orleans.",
            "dateCreated": "2025",
            "duration": "PT54M",
            "director": { "@type": "Person", "name": "Donald Markowitz" },
            "producer": [
              { "@type": "Organization", "name": "Mid City Sound Studios", "url": "https://midcitysound.com" },
              { "@type": "Organization", "name": "Fire on the Bayou" },
            ],
            "url": "https://www.streetbeat.video",
            "image": "https://www.streetbeat.video/images/streetbeat-poster.png",
            "genre": "Documentary",
            "locationCreated": { "@type": "Place", "name": "New Orleans, Louisiana" },
          })}}
        />
      </head>
      <body className="bg-studio-black text-cream antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
