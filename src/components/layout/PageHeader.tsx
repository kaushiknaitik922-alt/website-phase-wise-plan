import type { ReactNode } from "react";
import { PetalDecor } from "@/components/ui/PetalDecor";

/** Shared page-title header used at the top of every inner page. */
export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-blush-tint/60 border-b border-border">
      <PetalDecor
        variant="scatter"
        className="absolute -top-4 -left-4 opacity-70"
      />
      <PetalDecor
        variant="bloom"
        className="absolute -bottom-10 -right-10 opacity-60 hidden md:block"
      />
      <div className="container-content relative py-12 md:py-20 text-center flex flex-col items-center gap-3 md:gap-4">
        <h1 className="font-heading text-[28px] leading-[34px] md:text-[40px] md:leading-[48px] font-bold text-charcoal text-balance">
          {title}
        </h1>
        {description && (
          <p className="font-body text-[15px] md:text-[18px] leading-[24px] md:leading-[28px] text-muted max-w-xl text-balance">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
