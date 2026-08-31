import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal, StaggerItem } from "@/components/ui/StaggerReveal";
import { IMAGES } from "@/lib/images";

const OFFERS = [
  {
    title: "Loose Flowers",
    description: "Puja, gifting ya sirf ghar sajaane ke liye — har roz taaze phool.",
    image: IMAGES.rosesRed,
    href: "/flowers",
  },
  {
    title: "Bouquets",
    description: "Birthday, anniversary ya sorry — har mood ke liye khoobsurat bouquet.",
    image: IMAGES.bouquetTable,
    href: "/flowers",
  },
  {
    title: "Decoration",
    description: "Car, haldi aur room decoration — shaadi aur samaaroh ke liye.",
    image: IMAGES.weddingFlowerDecor,
    href: "/decoration",
  },
];

export function WhatWeOffer() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-content">
        <SectionHeading
          eyebrow="Hamari Seva"
          title="Aapke Har Avsar Ke Liye"
          description="Roz ki puja se lekar shaadi tak — sab kuch ek hi jagah."
        />
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {OFFERS.map((offer) => (
            <StaggerItem key={offer.title}>
              <Link
                href={offer.href}
                className="group block h-full overflow-hidden rounded-card border border-border bg-warm-white shadow-card-rest transition-all duration-300 ease-breeze hover:-translate-y-1.5 hover:shadow-card-hover"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-card-img">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-heading text-[20px] font-semibold text-charcoal mb-1.5">
                    {offer.title}
                  </h3>
                  <p className="font-body text-sm text-muted mb-4">{offer.description}</p>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-blush-dark">
                    Dekhein
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
