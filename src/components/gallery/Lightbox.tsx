"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { fadeIn, fadeScaleIn } from "@/lib/animations";
import { galleryWhatsAppMessage } from "@/lib/whatsapp";
import type { GalleryItem, SiteSettings } from "@/lib/types";

export function Lightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
  siteSettings,
}: {
  items: GalleryItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
  siteSettings: SiteSettings;
}) {
  const open = activeIndex !== null;
  const item = open ? items[activeIndex] : null;

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goNext, goPrev]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/90 p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeIn}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title ?? "Gallery image"}
        >
          <motion.div
            className="relative w-full max-w-3xl"
            variants={fadeScaleIn}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute -top-12 right-0 md:top-2 md:-right-12 flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/10 text-white hover:bg-warm-white/20 transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <div className="relative aspect-[4/5] md:aspect-square w-full overflow-hidden rounded-2xl bg-charcoal">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title ?? "Saini Phool Bhandar gallery photo"}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent p-5 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  {item.title && (
                    <p className="font-heading text-lg font-semibold text-white">{item.title}</p>
                  )}
                  <p className="font-body text-xs text-white/70">{item.category}</p>
                </div>
                <WhatsAppButton
                  number={siteSettings.whatsappNumber}
                  message={galleryWhatsAppMessage(item.title)}
                  size="sm"
                  label="Yeh Chahiye"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-1 md:-left-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/10 text-white hover:bg-warm-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-1 md:-right-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/10 text-white hover:bg-warm-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
