import { StaggerReveal, StaggerItem } from "@/components/ui/StaggerReveal";
import { DecorationCard } from "@/components/decoration/DecorationCard";
import type { DecorationCategory, DecorationService, SiteSettings } from "@/lib/types";

const CATEGORY_COPY: Record<DecorationCategory, { title: string; description: string }> = {
  Car: {
    title: "Car Decoration",
    description: "Baraat aur doli car ke liye fresh flower decoration, classic se premium tak.",
  },
  Haldi: {
    title: "Haldi Rasam Decoration",
    description: "Genda phool aur backdrop se poori haldi rasam ki khoobsurat sajaawat.",
  },
  Room: {
    title: "Room Decoration",
    description: "Bridal room, engagement, birthday aur welcome-home setup.",
  },
};

const CATEGORY_TO_GALLERY: Record<DecorationCategory, string> = {
  Car: "/gallery?category=Car+Decoration",
  Haldi: "/gallery?category=Haldi",
  Room: "/gallery?category=Room+Decoration",
};

export function DecorationCategoryBlock({
  category,
  services,
  siteSettings,
  id,
}: {
  category: DecorationCategory;
  services: DecorationService[];
  siteSettings: SiteSettings;
  id: string;
}) {
  const copy = CATEGORY_COPY[category];

  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8 md:mb-10 max-w-2xl">
        <h2 className="font-heading text-[24px] leading-[30px] md:text-[32px] md:leading-[40px] font-bold text-charcoal mb-2">
          {copy.title}
        </h2>
        <p className="font-body text-[15px] md:text-base text-muted">{copy.description}</p>
      </div>
      <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <DecorationCard
              service={service}
              siteSettings={siteSettings}
              galleryHref={CATEGORY_TO_GALLERY[category]}
            />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </section>
  );
}
