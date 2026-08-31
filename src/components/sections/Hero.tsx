import { MapPin } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CallButton } from "@/components/ui/Button";
import { PetalDecor } from "@/components/ui/PetalDecor";
import { buildCallLink } from "@/lib/whatsapp";
import type { SiteSettings } from "@/lib/types";

export function Hero({ siteSettings }: { siteSettings: SiteSettings }) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <PetalDecor variant="scatter" className="absolute top-10 left-2 md:left-10 opacity-70" />
      <PetalDecor
        variant="bloom"
        className="absolute -bottom-16 -right-16 opacity-40 hidden md:block"
      />
      <div className="container-content relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-10 md:py-16 lg:py-20">
        <div className="relative z-10 flex flex-col items-start gap-5 md:gap-6 order-2 lg:order-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blush-tint px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.06em] text-blush-dark">
            {siteSettings.establishedNote}
          </span>
          <h1 className="font-heading text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] font-bold text-charcoal text-balance">
            {siteSettings.heroHeadline}
          </h1>
          <p className="font-body text-[16px] leading-[26px] md:text-[18px] md:leading-[28px] text-muted max-w-lg">
            {siteSettings.heroSubline}
          </p>
          <div className="flex items-center gap-1.5 font-body text-sm text-muted">
            <MapPin size={16} strokeWidth={1.75} className="text-sage-dark shrink-0" />
            {siteSettings.address}
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <WhatsAppButton
              number={siteSettings.whatsappNumber}
              message={siteSettings.defaultWhatsappMessages.home}
              label="WhatsApp Karein"
            />
            <CallButton href={buildCallLink(siteSettings.whatsappNumber)} />
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative aspect-[4/5] md:aspect-[16/9] lg:aspect-[4/5] rounded-card overflow-hidden shadow-card-hover">
            <ImageWithFallback
              src={siteSettings.heroImage}
              alt="Taaza phool bouquet — Saini Phool Bhandar"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl bg-warm-white px-5 py-4 shadow-card-hover border border-border">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sage/20 text-sage-dark font-heading font-bold">
              3G
            </div>
            <div>
              <p className="font-body text-sm font-semibold text-charcoal leading-tight">
                Teen Peedhiyon Ka Bharosa
              </p>
              <p className="font-body text-xs text-muted">Since Harivansh Saini</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
