"use client";

/**
 * ScrollReveal3D
 * A versatile scroll-triggered animation wrapper with 3D depth effects.
 * Presets:
 *   "rise"     – default: fade + translateY + subtle rotateX (cards rising from below)
 *   "slide-left"  – slides + rotates in from left with perspective
 *   "slide-right" – slides + rotates in from right with perspective
 *   "flip"     – full 3D flip on Y axis
 *   "zoom"     – scale + fade with depth
 *   "cascade"  – same as rise but delay is auto-calculated by index
 */

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

type Preset = "rise" | "slide-left" | "slide-right" | "flip" | "zoom" | "cascade";

interface ScrollReveal3DProps {
  children: React.ReactNode;
  preset?: Preset;
  delay?: number;
  duration?: number;
  index?: number;          // for cascade auto-stagger
  className?: string;
  once?: boolean;
  margin?: string;
}

const presetVariants: Record<Preset, Variants> = {
  rise: {
    hidden: {
      opacity: 0,
      y: 48,
      rotateX: 14,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
    },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -60, rotateY: -12, scale: 0.96 },
    visible: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 60, rotateY: 12, scale: 0.96 },
    visible: { opacity: 1, x: 0, rotateY: 0, scale: 1 },
  },
  flip: {
    hidden: { opacity: 0, rotateY: -90, scale: 0.9 },
    visible: { opacity: 1, rotateY: 0, scale: 1 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.85, z: -60 },
    visible: { opacity: 1, scale: 1, z: 0 },
  },
  cascade: {
    hidden: { opacity: 0, y: 40, rotateX: 10, scale: 0.96 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
  },
};

export function ScrollReveal3D({
  children,
  preset = "rise",
  delay = 0,
  duration = 0.6,
  index = 0,
  className = "",
  once = true,
  margin = "-80px",
}: ScrollReveal3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as `${number}px` });

  const cascadeDelay = preset === "cascade" ? delay + index * 0.08 : delay;

  return (
    <motion.div
      ref={ref}
      variants={presetVariants[preset]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration,
        delay: cascadeDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
