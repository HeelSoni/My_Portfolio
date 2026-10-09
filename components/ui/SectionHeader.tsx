"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  badge: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  index,
  badge,
  title,
  highlight,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 sm:mb-16 ${centered ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
      {/* Category Code Label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-400/25 mb-4 ${
          centered ? "justify-center" : ""
        }`}
      >
        <span className="text-[11px] font-mono-code text-cyan-400 font-semibold tracking-wider">
          {index}
        </span>
        <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
        <span className="text-[11px] font-mono-code text-foreground-muted uppercase tracking-widest">
          {badge}
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]"
      >
        {title}{" "}
        {highlight && (
          <span className="text-gradient-cyan relative inline-block">
            {highlight}
          </span>
        )}
      </motion.h2>

      {/* Narrative Subtitle */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base text-foreground-muted leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
