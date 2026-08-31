"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeSlideUp, staggerContainer, revealViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Grid/list wrapper that staggers each `StaggerItem` child's fade+slide-up entrance. */
export function StaggerReveal({
  children,
  className,
  stagger,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer(stagger)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={fadeSlideUp}>
      {children}
    </motion.div>
  );
}
