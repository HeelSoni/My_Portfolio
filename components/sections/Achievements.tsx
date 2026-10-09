"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, ShieldCheck, Trophy, Sparkles, Star } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";

export function AchievementsSection() {
  const { certifications, achievements } = PORTFOLIO_DATA;

  return (
    <section id="achievements" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        index="05 // VALIDATION"
        badge="Accreditations & Honors"
        title="Industry certifications &"
        highlight="competitive honors."
        description="Verified domain credentials in data science, analytics, and software engineering, alongside hackathon milestones."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Certifications Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="font-space text-lg font-bold text-foreground">
              Professional Certifications
            </h3>
            <span className="text-xs font-mono-code text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/20">
              5 VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
              >
                <TiltCard className="glass-panel p-5 rounded-xl border-cyan-400/15 hover:border-cyan-400/40 transition-colors h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                      <span className="text-cyan-400 font-semibold">{cert.issuer}</span>
                      <span className="text-foreground-subtle text-[11px]">{cert.date}</span>
                    </div>
                    <h4 className="font-space text-sm font-bold text-foreground group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.title}
                    </h4>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Credential Verified</span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Achievements & Hackathons */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-violet-400" />
            <h3 className="font-space text-lg font-bold text-foreground">
              Hackathons & Community
            </h3>
          </div>

          <div className="space-y-3.5">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div className="glass-panel p-5 rounded-xl border-cyan-400/15 hover:border-cyan-400/35 transition-colors">
                  <div className="flex items-center justify-between text-xs font-mono-code mb-1.5">
                    <span className="text-violet-400 font-semibold uppercase tracking-wider text-[11px]">
                      {item.type}
                    </span>
                    {item.date && (
                      <span className="text-foreground-subtle text-[11px]">{item.date}</span>
                    )}
                  </div>
                  <h4 className="font-space text-base font-bold text-foreground">
                    {item.title}
                  </h4>
                  {item.organization && (
                    <p className="text-xs font-mono-code text-cyan-400/80 mt-0.5">
                      {item.organization}
                    </p>
                  )}
                  <p className="text-xs text-foreground-muted mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
