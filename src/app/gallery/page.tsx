import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/layout/CTABanner";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getGalleryItems } from "@/lib/data/galleryItems";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Hamare real kaam ki photos — car decoration, haldi rasam, room decoration aur bouquets. Saini Phool Bhandar, Sonipat.",
};

export default async function GalleryPage() {
  const [siteSettings, items] = await Promise.all([getSiteSettings(), getGalleryItems()]);

  return (
    <>
      <PageHeader
        title="Hamara Kaam"
        description="Category ke hisaab se dekhein, ya kisi bhi photo par click karke bada dekhein."
      />

      <section className="section-padding bg-cream">
        <div className="container-content">
          <Suspense>
            <GalleryGrid items={items} siteSettings={siteSettings} />
          </Suspense>
        </div>
      </section>

      <CTABanner
        siteSettings={siteSettings}
        message={siteSettings.defaultWhatsappMessages.galleryGeneric}
      />
    </>
  );
}
