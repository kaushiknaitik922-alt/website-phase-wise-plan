import type { Metadata } from "next";
import { PackagePlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/layout/CTABanner";
import { FlowerGrid } from "@/components/flowers/FlowerGrid";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getFlowers } from "@/lib/data/flowers";

export const metadata: Metadata = {
  title: "Flowers & Bouquets",
  description:
    "Loose flowers, bouquets aur garlands — sabke rates yahan dekhein. Saini Phool Bhandar, Near Gur Mandi, Sonipat.",
};

export default async function FlowersPage() {
  const [siteSettings, flowers] = await Promise.all([getSiteSettings(), getFlowers()]);

  return (
    <>
      <PageHeader
        title="Hamare Phool"
        description="Rates season ke hisaab se badal sakte hain — WhatsApp par turant confirm karein."
      />

      <section className="section-padding bg-cream">
        <div className="container-content">
          <FlowerGrid flowers={flowers} siteSettings={siteSettings} />
        </div>
      </section>

      <section className="bg-warm-white border-y border-border">
        <div className="container-content py-10 md:py-14">
          <RevealOnScroll className="flex flex-col md:flex-row items-center gap-6 rounded-card bg-blush-tint/60 p-6 md:p-8 text-center md:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-warm-white text-blush-dark">
              <PackagePlus size={26} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-[20px] font-semibold text-charcoal mb-1">
                Bade Order Ya Custom Bouquet Chahiye?
              </h3>
              <p className="font-body text-sm text-muted">
                Seedha WhatsApp karein — hum aapki zaroorat ke hisaab se custom bouquet ya bulk order taiyaar karte hain.
              </p>
            </div>
            <WhatsAppButton
              number={siteSettings.whatsappNumber}
              message={siteSettings.defaultWhatsappMessages.bulkOrder}
              className="shrink-0"
            />
          </RevealOnScroll>
        </div>
      </section>

      <CTABanner
        siteSettings={siteSettings}
        message={siteSettings.defaultWhatsappMessages.flowerGeneric}
      />
    </>
  );
}
