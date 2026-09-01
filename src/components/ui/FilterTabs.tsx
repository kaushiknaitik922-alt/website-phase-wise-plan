"use client";

import { cn } from "@/lib/utils";

/** Reusable pill-style client-side category filter (Flowers, Gallery pages). */
export function FilterTabs<T extends string>({
  categories,
  active,
  onChange,
}: {
  categories: readonly T[];
  active: T;
  onChange: (value: T) => void;
}) {
  return (
    <div className="relative">
      <div
        className="no-scrollbar flex items-center gap-2.5 overflow-x-auto pb-1"
        role="tablist"
        aria-label="Category filter"
      >
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(category)}
              className={cn(
                "shrink-0 rounded-full border px-5 py-2 font-body text-sm font-medium transition-all duration-200 ease-breeze",
                isActive
                  ? "border-blush bg-blush text-white shadow-btn-primary"
                  : "border-border bg-warm-white text-charcoal hover:border-blush hover:text-blush-dark"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
      {/* Edge fade hints that the row scrolls horizontally — hidden once there's room to show every chip. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-cream to-transparent sm:hidden"
      />
    </div>
  );
}
