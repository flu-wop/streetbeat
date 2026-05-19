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
    "Produced by Mid City Sound & Fire on the Bayou. Hosted by Doug Belote.",
  keywords: [
    "New Orleans drumming","NOLA documentary","street beat","Mid City Sound",
    "Doug Belote","New Orleans percussion","second line","NOLA music documentary",
  ],
  metadataBase: new URL("https://www.streetbeat.video"),
  icons: { icon: "/favicon.png", shortcut: "/favicon.ico", apple: "/favicon.png" },
  openGraph: {
    type:        "video.movie",
    url:         "https://www.streetbeat.video",
    siteName:    "Street Beat: Drumming Below Sea Level",
    title:       "Street Beat: Drumming Below Sea Level | Documentary Film",
    description: "What is the New Orleans drum sound? Find out as NOLA's most influential drummers discuss this one-of-a-kind sound.",
    images: [{ url: "/images/streetbeat-poster.png", width: 1328, height: 784 }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Street Beat: Drumming Below Sea Level",
    description: "A documentary about the New Orleans drum sound. 54 minutes. Produced by Mid City Sound.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-studio-black text-cream antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
