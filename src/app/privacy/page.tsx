import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Streetbeat privacy policy — access, purchases, and data handling.",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-studio-black py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl text-cream mb-2">Privacy Policy</h1>
        <p className="text-mist/60 text-sm mb-10">Last updated: September 2026</p>
        <div className="bg-studio-charcoal border border-studio-border rounded-sm p-8 sm:p-12">
          <p className="text-mist leading-relaxed mb-6">
            Streetbeat ("we," "us") collects your email address and payment information when you request access, purchase, or verify your account. Payment is processed securely by Stripe — we never store card details.
          </p>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">Information We Collect</h2>
          <p className="text-mist leading-relaxed mb-6">
            Email address (for access codes and verification), purchase confirmation data, and any information you provide when contacting us.
          </p>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-mist leading-relaxed mb-6 space-y-1">
            <li>To grant and verify access to paywalled content</li>
            <li>To process and confirm purchases</li>
            <li>To send access codes and account-related emails</li>
          </ul>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">Information Sharing</h2>
          <p className="text-mist leading-relaxed mb-6">
            We don't sell your information. We share it only with Stripe (payments) and our email delivery provider, or as required by law.
          </p>
          <h2 className="font-display text-2xl text-gold mt-10 mb-3">Data Security</h2>
          <p className="text-mist leading-relaxed mb-6">
            Payment data is processed by Stripe and never stored on our servers. Access codes and verification data are stored securely.
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
