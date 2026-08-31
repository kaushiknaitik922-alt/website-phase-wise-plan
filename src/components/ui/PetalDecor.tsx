import { cn } from "@/lib/utils";

/**
 * Subtle decorative flower/petal SVG accents (Brand Guidelines: soft,
 * elegant — not bhadkeela). Purely decorative, always `aria-hidden`, never
 * load-bearing for content, and hidden from prefers-reduced-motion users'
 * distraction by simply not animating (they're static).
 */
export function PetalDecor({
  className,
  variant = "bloom",
}: {
  className?: string;
  variant?: "bloom" | "scatter";
}) {
  if (variant === "scatter") {
    return (
      <svg
        aria-hidden="true"
        className={cn("pointer-events-none select-none", className)}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
      >
        <circle cx="20" cy="30" r="6" fill="#E8A0B4" opacity="0.35" />
        <circle cx="45" cy="10" r="4" fill="#A9C1A1" opacity="0.4" />
        <circle cx="90" cy="50" r="8" fill="#E8A0B4" opacity="0.25" />
        <circle cx="70" cy="90" r="5" fill="#A9C1A1" opacity="0.3" />
        <circle cx="15" cy="80" r="4" fill="#E8A0B4" opacity="0.3" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
    >
      <g opacity="0.5">
        <path
          d="M80 20c10 0 18 12 18 24s-8 24-18 24-18-12-18-24 8-24 18-24Z"
          fill="#E8A0B4"
          opacity="0.25"
        />
        <path
          d="M80 92c10 0 18 12 18 24s-8 24-18 24-18-12-18-24 8-24 18-24Z"
          fill="#E8A0B4"
          opacity="0.25"
        />
        <path
          d="M40 44c7-7 21-5 30 4s11 23 4 30-21 5-30-4-11-23-4-30Z"
          fill="#A9C1A1"
          opacity="0.3"
        />
        <path
          d="M116 86c7-7 21-5 30 4s11 23 4 30-21 5-30-4-11-23-4-30Z"
          fill="#A9C1A1"
          opacity="0.2"
        />
        <circle cx="80" cy="80" r="10" fill="#D6789A" opacity="0.35" />
      </g>
    </svg>
  );
}
