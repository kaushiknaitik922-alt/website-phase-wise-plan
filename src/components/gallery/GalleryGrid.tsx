"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Lightbox } from "@/components/gallery/Lightbox";
import { GALLERY_CATEGORIES } from "@/lib/data/galleryItems";
import type { GalleryItem, SiteSettings } from "@/lib/types";

export function GalleryGrid({
  items,
  siteSettings,
}: {
  items: GalleryItem[];
  siteSettings: SiteSettings;
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const isValidCategory = (
    value: string | null
  ): value is (typeof GALLERY_CATEGORIES)[number] =>
    !!value && (GALLERY_CATEGORIES as readonly string[]).includes(value);

  const [category, setCategory] = useState<(typeof GALLERY_CATEGORIES)[number]>(
    isValidCategory(initialCategory) ? initialCategory : "All"
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keep in sync if the query param changes after mount (e.g. link from Decoration page).
  useEffect(() => {
    if (isValidCategory(initialCategory)) setCategory(initialCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCategory]);

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  return (
    <div>
      <FilterTabs categories={GALLERY_CATEGORIES} active={category} onChange={setCategory} />

      <motion.div
        key={category}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="mt-8"
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-warm-white py-16 text-center">
            <Images size={32} strokeWidth={1.5} className="text-sage-dark" />
            <p className="font-body text-sm text-muted">
              Is category mein abhi photos nahi hain. Jald hi add ki jayengi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i, 10) * 0.06,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border text-left"
                aria-label={`View ${item.title ?? "photo"} in gallery`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title ?? "Saini Phool Bhandar gallery photo"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-[350ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      <Lightbox
        items={filtered}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
        siteSettings={siteSettings}
      />
    </div>
  );
}
