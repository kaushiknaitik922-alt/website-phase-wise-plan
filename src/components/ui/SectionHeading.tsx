import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14 flex flex-col gap-3 md:gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="font-body text-xs font-medium uppercase tracking-[0.08em] text-sage-dark">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-[24px] leading-[30px] md:text-[32px] md:leading-[40px] font-bold text-balance max-w-2xl">
        {title}
      </h2>
      {description && (
        <p className="font-body text-[15px] md:text-[18px] leading-[24px] md:leading-[28px] text-muted max-w-2xl text-balance">
          {description}
        </p>
      )}
    </div>
  );
}
