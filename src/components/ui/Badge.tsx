import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "blush",
  className,
}: {
  children: ReactNode;
  tone?: "blush" | "sage";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.04em]",
        tone === "blush" ? "bg-blush-tint text-blush-dark" : "bg-sage/20 text-sage-dark",
        className
      )}
    >
      {children}
    </span>
  );
}
