import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhatWeOffer } from "@/components/sections/WhatWeOffer";
import { DecorationPreview } from "@/components/sections/DecorationPreview";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { CTABanner } from "@/components/layout/CTABanner";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getFeaturedDecorationServices } from "@/lib/data/decorationServices";
import { getFeaturedGalleryItems } from "@/lib/data/galleryItems";

// No `title` here on purpose: Next.js only applies the root layout's
// "%s | Saini Phool Bhandar" template to a *child* segment's title, not to
// the root "/" page itself — so a literal string here would render as a
// bare, unbranded browser-tab title instead of being templated. Omitting it
// lets the root layout's `title.default` (the full, keyword-rich brand
// title) take over, which is also the better SEO title for the homepage.
export const metadata: Metadata = {
  description:
    "Sonipat ki teen-peedhi purani flower shop — fresh flowers, bouquets aur car/haldi/room decoration. Near Gur Mandi, Sonipat.",
};

export default async function HomePage() {
  const [siteSettings, decorationServices, galleryItems] = await Promise.all([
    getSiteSettings(),
    getFeaturedDecorationServices(3),
    getFeaturedGalleryItems(8),
  ]);

  return (
    <>
      <Hero siteSettings={siteSettings} />
      <TrustStrip siteSettings={siteSettings} />
      <WhatWeOffer />
      <DecorationPreview services={decorationServices} siteSettings={siteSettings} />
      <GalleryPreview items={galleryItems} />
      <WhyChooseUs />
      <CTABanner
        siteSettings={siteSettings}
        message={siteSettings.defaultWhatsappMessages.home}
      />
    </>
  );
}
