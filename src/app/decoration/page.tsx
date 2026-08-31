import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/layout/CTABanner";
import { DecorationCategoryBlock } from "@/components/decoration/DecorationCategoryBlock";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getDecorationServices, DECORATION_CATEGORIES } from "@/lib/data/decorationServices";

export const metadata: Metadata = {
  title: "Decoration Services",
  description:
    "Car decoration, haldi rasam decoration aur room decoration — Sonipat mein real photos aur starting rates ke saath.",
};

const CATEGORY_LABEL: Record<(typeof DECORATION_CATEGORIES)[number], string> = {
  Car: "Car Decoration",
  Haldi: "Haldi Rasam",
  Room: "Room Decoration",
};

export default async function DecorationPage() {
  const [siteSettings, services] = await Promise.all([
    getSiteSettings(),
    getDecorationServices(),
  ]);

  return (
    <>
      <PageHeader
        title="Decoration Services"
        description="Car, haldi rasam aur room decoration — teen peedhiyon ke anubhav ke saath."
      >
        <nav
          aria-label="Decoration categories"
          className="flex flex-wrap items-center justify-center gap-2.5 pt-2"
        >
          {DECORATION_CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`#${cat.toLowerCase()}`}
              className="rounded-full border border-border bg-warm-white px-4 py-1.5 font-body text-sm font-medium text-charcoal hover:border-blush hover:text-blush-dark transition-colors"
            >
              {CATEGORY_LABEL[cat]}
            </a>
          ))}
        </nav>
      </PageHeader>

      <div className="container-content section-padding flex flex-col gap-16 md:gap-24">
        {DECORATION_CATEGORIES.map((cat) => (
          <DecorationCategoryBlock
            key={cat}
            id={cat.toLowerCase()}
            category={cat}
            services={services.filter((s) => s.category === cat)}
            siteSettings={siteSettings}
          />
        ))}
      </div>

      <CTABanner
        siteSettings={siteSettings}
        heading="Bade Event Ke Liye Custom Decoration Chahiye?"
        message={siteSettings.defaultWhatsappMessages.roomDecoration}
        showContactLink
      />
    </>
  );
}
