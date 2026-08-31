import Link from "next/link";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CallButton } from "@/components/ui/Button";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PetalDecor } from "@/components/ui/PetalDecor";
import { buildCallLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/lib/types";

/** Shared bottom CTA banner reused across all 6 pages, per PRD.md. */
export function CTABanner({
  siteSettings,
  message,
  heading = "Order Dena Ho Ya Rate Poochhna — Ek Message Door.",
  showContactLink = false,
}: {
  siteSettings: SiteSettings;
  message: string;
  heading?: string;
  showContactLink?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-charcoal">
      <PetalDecor
        variant="bloom"
        className="absolute -top-16 -right-16 opacity-20"
      />
      <div className="container-content relative section-padding text-center flex flex-col items-center gap-6">
        <RevealOnScroll>
          <h2 className="font-heading text-[24px] leading-[30px] md:text-[32px] md:leading-[40px] font-bold text-warm-white max-w-2xl text-balance">
            {heading}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1} className="flex flex-wrap items-center justify-center gap-4">
          <WhatsAppButton number={siteSettings.whatsappNumber} message={message} />
          <CallButton
            href={buildCallLink(siteSettings.whatsappNumber)}
            className="border-cream/50 text-cream hover:bg-cream hover:text-charcoal"
          />
        </RevealOnScroll>
        {showContactLink && (
          <RevealOnScroll delay={0.2}>
            <Link
              href="/contact"
              className="font-body text-sm text-cream/70 hover:text-blush underline underline-offset-4"
            >
              Ya Enquiry Form Bharein →
            </Link>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}
