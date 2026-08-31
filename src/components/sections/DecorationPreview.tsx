import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal, StaggerItem } from "@/components/ui/StaggerReveal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { LinkButton } from "@/components/ui/Button";
import { decorationWhatsAppMessage } from "@/lib/whatsapp";
import type { DecorationService, SiteSettings } from "@/lib/types";

export function DecorationPreview({
  services,
  siteSettings,
}: {
  services: DecorationService[];
  siteSettings: SiteSettings;
}) {
  return (
    <section className="section-padding bg-warm-white">
      <div className="container-content">
        <SectionHeading
          eyebrow="Decoration Services"
          title="Popular Decoration Services"
          description="Car, haldi rasam aur room decoration — real photos aur starting rates ke saath."
        />
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <div className="group h-full overflow-hidden rounded-card border border-border bg-cream shadow-card-rest transition-all duration-300 ease-breeze hover:-translate-y-1.5 hover:shadow-card-hover flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-card-img">
                  <ImageWithFallback
                    src={service.images[0]}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-warm-white/95 px-3 py-1 font-body text-xs font-semibold text-charcoal">
                    {service.category} Decoration
                  </span>
                </div>
                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-[18px] md:text-[20px] font-semibold text-charcoal mb-1.5">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-muted mb-3 flex-1">
                    {service.description}
                  </p>
                  <p className="font-body text-base font-semibold text-blush-dark mb-4">
                    Starting from ₹{service.startingRate.toLocaleString("en-IN")}
                  </p>
                  <WhatsAppButton
                    number={siteSettings.whatsappNumber}
                    message={
                      service.whatsappMessageOverride ??
                      decorationWhatsAppMessage(service.category)
                    }
                    size="sm"
                    label="Jaankari Lein"
                    className="w-full"
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
        <div className="mt-10 flex justify-center">
          <LinkButton as="a" href="/decoration" variant="outline">
            Sab Dekhein
            <ArrowRight size={18} strokeWidth={2} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
