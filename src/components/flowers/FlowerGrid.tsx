"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { FlowerCard } from "@/components/flowers/FlowerCard";
import { Flower2 } from "lucide-react";
import { FLOWER_CATEGORIES } from "@/lib/data/flowers";
import type { Flower, SiteSettings } from "@/lib/types";

export function FlowerGrid({
  flowers,
  siteSettings,
}: {
  flowers: Flower[];
  siteSettings: SiteSettings;
}) {
  const [category, setCategory] = useState<(typeof FLOWER_CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (category === "All" ? flowers : flowers.filter((f) => f.category === category)),
    [flowers, category]
  );

  return (
    <div>
      <FilterTabs categories={FLOWER_CATEGORIES} active={category} onChange={setCategory} />

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="mt-8"
        >
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((flower, i) => (
                <motion.div
                  key={flower.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(i, 8) * 0.08,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                >
                  <FlowerCard flower={flower} siteSettings={siteSettings} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border bg-warm-white py-16 text-center">
      <Flower2 size={32} strokeWidth={1.5} className="text-sage-dark" />
      <p className="font-body text-sm text-muted">
        Is category mein abhi koi item nahi hai. Jald hi add kiya jayega.
      </p>
    </div>
  );
}
