"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";

export function JourneySection() {
  const { experience, education, achievements } = PORTFOLIO_DATA;

  // Unified chronological timeline events
  const timelineEvents = [
    {
      year: "MAY 2026 – JUN 2026",
      type: "EXPERIENCE",
      role: experience[0].role,
      organization: experience[0].company,
      location: experience[0].location,
      icon: Briefcase,
      badge: "Internship",
      color: "cyan",
      points: experience[0].points,
      tech: experience[0].tech,
    },
    {
      year: "JUL 2026",
      type: "HACKATHON",
      role: achievements[0].title,
      organization: achievements[0].organization || "Competitive Hackathon",
      location: "Virtual Sprint",
      icon: Trophy,
      badge: achievements[0].type,
      color: "violet",
      points: [
        achievements[0].description,
        "Collaborated under sprint pressure to ideate, prototype, and present real-world software solutions."
      ],
      tech: ["Rapid Prototyping", "Teamwork", "Full-Stack AI"],
    },
    {
      year: "SEP 2025",
      type: "COMPETITION",
      role: achievements[1].title,
      organization: achievements[1].organization || "ADIT College",
      location: "On-Campus",
      icon: Trophy,
      badge: achievements[1].type,
      color: "cyan",
      points: [
        achievements[1].description,
        "Qualified during collegiate internal assessment rounds addressing high-priority governance challenges."
      ],
      tech: ["System Design", "Problem Solving", "Algorithm Architecture"],
    },
    {
      year: "2023 – 2027",
      type: "EDUCATION",
      role: education[0].degree,
      organization: education[0].institution,
      location: "Karamsad, Gujarat",
      icon: GraduationCap,
      badge: "Final Year (CGPA 8.90)",
      color: "cyan",
      points: [
        "Maintained high academic standing with an 8.90 CGPA across all core computer science disciplines.",
        "Deep foundation in Algorithms, Database Systems, Artificial Intelligence, and Statistical Modeling.",
        education[0].details
      ],
      tech: ["Algorithms", "Data Structures", "Database Management", "Statistics", "Machine Learning"],
    },
  ];

  return (
    <section id="journey" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        index="03 // TRAJECTORY"
        badge="Career & Academic Arc"
        title="Chronological timeline of"
        highlight="growth & milestones."
        description="From academic excellence in Information Technology to hands-on industry data analysis and competitive hackathon challenges."
      />

      <div className="relative mt-12 sm:mt-16">
        {/* Central glowing vertical timeline rail */}
        <div
          aria-hidden="true"
          className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-transparent"
        />

        <div className="space-y-12 sm:space-y-16">
          {timelineEvents.map((event, idx) => {
            const Icon = event.icon;
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Center marker node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full glass-panel border border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/25 bg-background">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                </div>

                {/* Content Card container */}
                <div
                  className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                    isEven ? "sm:pr-12" : "sm:pl-12"
                  }`}
                >
                  <TiltCard className="glass-panel p-6 sm:p-7 rounded-2xl border-cyan-400/20 hover:border-cyan-400/45 transition-colors shadow-lg">
                    {/* Event top meta bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-400/25 text-[11px] font-mono-code text-cyan-400">
                        <Calendar className="w-3 h-3" />
                        <span>{event.year}</span>
                      </div>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 border border-white/10 text-foreground-muted uppercase">
                        {event.badge}
                      </span>
                    </div>

                    {/* Role & Org */}
                    <h3 className="font-space text-lg sm:text-xl font-bold text-foreground">
                      {event.role}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono-code text-cyan-400/90 mt-1">
                      {event.organization} • {event.location}
                    </p>

                    {/* Bullet points */}
                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-foreground-muted">
                      {event.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/80 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Associated tech tags */}
                    <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap gap-1.5">
                      {event.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-black/20 dark:bg-white/5 text-foreground-subtle border border-white/5"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
