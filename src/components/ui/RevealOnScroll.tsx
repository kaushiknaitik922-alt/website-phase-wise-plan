"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeSlideUp, revealViewport } from "@/lib/animations";

/** Fade + slide-up wrapper triggered once the element enters the viewport. */
export function RevealOnScroll({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
}) {
  const MotionTag = as === "li" ? motion.li : motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeSlideUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
