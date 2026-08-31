import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerReveal, StaggerItem } from "@/components/ui/StaggerReveal";
import { LinkButton } from "@/components/ui/Button";
import type { GalleryItem } from "@/lib/types";

export function GalleryPreview({ items }: { items: GalleryItem[] }) {
  return (
    <section className="section-padding bg-cream">
      <div className="container-content">
        <SectionHeading
          eyebrow="Hamara Kaam"
          title="Gallery"
          description="Hamare real kaam ki jhalak — flowers se lekar poora decoration setup tak."
        />
        <StaggerReveal
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
          stagger={0.06}
        >
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl border border-border">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title ?? "Saini Phool Bhandar gallery photo"}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.08]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  {item.title && (
                    <span className="font-body text-xs font-medium text-white">
                      {item.title}
                    </span>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
        <div className="mt-10 flex justify-center">
          <LinkButton as="a" href="/gallery" variant="outline">
            Poori Gallery Dekhein
            <ArrowRight size={18} strokeWidth={2} />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
