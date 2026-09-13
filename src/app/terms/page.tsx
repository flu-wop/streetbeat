import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Streetbeat terms of service — access, licensing, and payment.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-studio-black py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl text-cream mb-2">Terms of Service</h1>
        <p className="text-mist/60 text-sm mb-10">Last updated: September 2026</p>
        <div className="bg-studio-charcoal border border-studio-border rounded-sm p-8 sm:p-12">
          <p className="text-mist leading-relaxed mb-6">
            By purchasing access to Streetbeat content, you agree to these terms.
          </p>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">Access & Licensing</h2>
          <p className="text-mist leading-relaxed mb-6">
            Purchasing access grants you a personal, non-transferable license to view the content. Sharing access codes or redistributing content is prohibited.
          </p>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">Payment</h2>
          <p className="text-mist leading-relaxed mb-6">
            All payments are processed securely through Stripe. Purchases are final once access is granted, except as required by law.
          </p>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">Access Issues</h2>
          <p className="text-mist leading-relaxed mb-6">
            If you're having trouble accessing content you've purchased, contact us before disputing a charge — most access issues can be resolved directly.
          </p>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">Content Ownership</h2>
          <p className="text-mist leading-relaxed mb-6">
            All video, audio, and written content is the property of Streetbeat / Mid City Sound and may not be reproduced, redistributed, or repurposed without written permission.
          </p>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">Contact Us</h2>
          <p className="text-mist leading-relaxed mb-6">
            Email <a href="mailto:orders@midcitysound.com" className="text-gold hover:underline">orders@midcitysound.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
