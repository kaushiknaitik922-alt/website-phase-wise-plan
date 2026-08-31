import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTABanner } from "@/components/layout/CTABanner";
import { Timeline } from "@/components/about/Timeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal, StaggerItem } from "@/components/ui/StaggerReveal";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { getAboutStory } from "@/lib/data/aboutStory";

export const metadata: Metadata = {
  title: "Hamari Kahani",
  description:
    "Harivansh Saini se Sunil Saini, aur ab Ayush & Anant Saini tak — Saini Phool Bhandar ki teen-peedhi purani kahani.",
};

export default async function AboutPage() {
  const [siteSettings, aboutStory] = await Promise.all([
    getSiteSettings(),
    getAboutStory(),
  ]);

  return (
    <>
      <PageHeader title="Hamari Kahani" description={aboutStory.intro} />

      <section className="section-padding bg-warm-white">
        <div className="container-content">
          <Timeline generations={aboutStory.generations} />
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-content">
          <SectionHeading
            eyebrow="Hamare Values"
            title="Jo Kabhi Nahi Badla"
            description="Teen peedhiyon mein bahut kuch badla — yeh teen baatein nahi."
          />
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
            {aboutStory.valuesSection.map((value) => (
              <StaggerItem key={value.title}>
                <div className="h-full rounded-card border border-border bg-warm-white p-6 shadow-card-rest">
                  <h3 className="font-heading text-[18px] font-semibold text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm text-muted">{value.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="section-padding bg-warm-white">
        <div className="container-content">
          <RevealOnScroll className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center rounded-card border border-border bg-blush-tint/40 p-6 md:p-10">
            <div className="relative aspect-[4/3] rounded-card-img overflow-hidden order-2 lg:order-1">
              <ImageWithFallback
                src={aboutStory.shopPhoto}
                alt="Saini Phool Bhandar shop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-[24px] md:text-[32px] font-bold text-charcoal mb-3">
                Visit Us
              </h2>
              <p className="font-body text-[15px] md:text-base text-muted mb-4 flex items-start gap-2">
                <MapPin size={20} strokeWidth={1.75} className="shrink-0 mt-0.5 text-sage-dark" />
                {siteSettings.address}
              </p>
              <p className="font-body text-[15px] md:text-base text-charcoal/80 mb-6">
                Khud aakar dekhein — taaze phool aur humari teen peedhiyon ki kahani, dono.
                {" "}{siteSettings.shopHours}.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-blush-dark hover:text-blush"
              >
                Map Aur Directions Ke Liye Contact Page Dekhein
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <CTABanner
        siteSettings={siteSettings}
        message={siteSettings.defaultWhatsappMessages.home}
      />
    </>
  );
}
