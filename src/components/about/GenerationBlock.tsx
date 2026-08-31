import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { cn } from "@/lib/utils";
import type { GenerationBlock as GenerationBlockType } from "@/lib/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function GenerationBlock({
  generation,
  reverse,
  isLast,
}: {
  generation: GenerationBlockType;
  reverse: boolean;
  isLast: boolean;
}) {
  return (
    <div className="relative">
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-8 md:left-1/2 top-20 bottom-[-3rem] md:bottom-[-4rem] w-px bg-border md:-translate-x-1/2"
        />
      )}

      <RevealOnScroll className="relative flex flex-col md:flex-row gap-5 md:gap-16 items-start md:items-center">
        {/* Photo column */}
        <div
          className={cn(
            "w-full md:flex-1 flex items-center gap-4 md:block",
            reverse ? "md:order-2" : "md:order-1"
          )}
        >
          <div
            className={cn(
              "relative aspect-square w-16 md:w-full shrink-0 overflow-hidden rounded-full md:rounded-card border-4 border-warm-white shadow-card-hover md:max-w-[280px]",
              reverse ? "md:ml-auto md:mr-0" : "md:ml-0 md:mr-auto"
            )}
          >
            {generation.photo ? (
              <ImageWithFallback
                src={generation.photo}
                alt={generation.name}
                fill
                sizes="(max-width: 768px) 64px, 280px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blush-tint to-sage/20">
                <span className="font-heading text-2xl md:text-5xl font-bold text-blush-dark">
                  {initials(generation.name)}
                </span>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.06em] text-sage-dark">
              {generation.years}
            </p>
            <h3 className="font-heading text-[20px] font-bold text-charcoal">
              {generation.name}
            </h3>
            <p className="font-body text-sm text-muted">{generation.role}</p>
          </div>
        </div>

        {/* Story column */}
        <div
          className={cn(
            "w-full md:flex-1",
            reverse ? "md:order-1 md:text-right" : "md:order-2 md:text-left"
          )}
        >
          <p className="hidden md:block font-body text-xs font-semibold uppercase tracking-[0.06em] text-sage-dark mb-1">
            {generation.years}
          </p>
          <h3 className="hidden md:block font-heading text-[24px] font-bold text-charcoal mb-1">
            {generation.name}
          </h3>
          <p className="hidden md:block font-body text-sm text-muted mb-3">{generation.role}</p>
          <p className="font-body text-[15px] md:text-base leading-[24px] md:leading-[28px] text-charcoal/90">
            {generation.storyText}
          </p>
        </div>
      </RevealOnScroll>
    </div>
  );
}
