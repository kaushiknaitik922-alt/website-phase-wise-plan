"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Flower2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Wraps next/image so a broken/unreachable placeholder URL never renders as
 * a browser broken-image icon — it degrades to a soft branded placeholder
 * instead. Keeps every page presentable even before the owner has uploaded
 * real photos for a given item via `/admin`.
 *
 * A soft branded backdrop sits behind the image at all times (not only after
 * an error) so a slow network never shows a jarring blank/white flash while
 * the photo is still loading — every call site uses `fill` inside a sized,
 * `relative` parent, so this wrapper can safely fill that same box.
 */
export function ImageWithFallback({
  className,
  alt,
  fallbackClassName,
  ...props
}: ImageProps & { fallbackClassName?: string }) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-gradient-to-br from-blush-tint to-cream",
        fallbackClassName
      )}
    >
      {errored ? (
        <div
          role="img"
          aria-label={typeof alt === "string" ? alt : "Photo coming soon"}
          className="flex h-full w-full items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2 text-sage-dark">
            <Flower2 size={32} strokeWidth={1.5} />
            <span className="font-body text-xs text-muted">Photo coming soon</span>
          </div>
        </div>
      ) : (
        <Image {...props} alt={alt} className={className} onError={() => setErrored(true)} />
      )}
    </div>
  );
}
