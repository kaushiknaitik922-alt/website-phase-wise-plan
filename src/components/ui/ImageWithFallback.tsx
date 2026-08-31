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
 */
export function ImageWithFallback({
  className,
  alt,
  fallbackClassName,
  ...props
}: ImageProps & { fallbackClassName?: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={typeof alt === "string" ? alt : "Photo coming soon"}
        className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-blush-tint to-cream",
          fallbackClassName,
          className
        )}
      >
        <div className="flex flex-col items-center gap-2 text-sage-dark">
          <Flower2 size={32} strokeWidth={1.5} />
          <span className="font-body text-xs text-muted">Photo coming soon</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
