"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  LineChart,
  PieChart,
  Cpu,
  Server,
  Database,
  Wrench,
  Terminal,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { TiltCard } from "@/components/ui/TiltCard";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code: Code2,
  Activity: LineChart,
  BarChart3: PieChart,
  Cpu: Cpu,
  Server: Server,
  Database: Database,
  Wrench: Wrench,
};

export function SkillsSection() {
  const { skillCategories } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="relative py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <SectionHeader
          index="02 // CAPABILITIES"
          badge="Technical Matrix"
          title="Engineered toolkits &"
          highlight="computational depth."
          description="A specialized taxonomy of languages, machine learning frameworks, data processing systems, and modern deployment tools."
        />

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.map((category, idx) => {
            const Icon = ICON_MAP[category.iconName] || Terminal;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <TiltCard className="glass-panel p-5 rounded-2xl h-full border-cyan-400/15 hover:border-cyan-400/40 transition-colors flex flex-col justify-between group">
                  <div>
                    {/* Header of skill card */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono-code text-[10px] text-foreground-subtle tracking-wider">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-space text-base font-bold text-foreground mb-3">
                      {category.title}
                    </h3>

                    {/* Skill tags list */}
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-black/20 dark:bg-white/5 border border-cyan-400/10 text-xs font-mono-code text-foreground-muted hover:text-cyan-400 hover:border-cyan-400/30 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-code text-foreground-subtle">
                    <span>{category.skills.length} competencies</span>
                    <span className="text-cyan-400/70">VERIFIED</span>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Infinite Horizontal Tech Ticker Ribbon */}
      <div className="mt-8">
        <TechMarquee />
      </div>
    </section>
  );
}
