"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Brain, Database, Layers, GraduationCap, Briefcase, MapPin, Sparkles, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";

export function AboutSection() {
  const { personal, education, experience } = PORTFOLIO_DATA;
  const edu = education[0];
  const exp = experience[0];

  const pillars = [
    {
      title: "AI & Machine Learning",
      description: "Building production ML models, LLM agents, and semantic NLP pipelines using Scikit-Learn and Hugging Face.",
      icon: Brain,
      tag: "CORE FOCUS",
    },
    {
      title: "Data Analytics & BI",
      description: "Rigorous data preprocessing, hypothesis testing, and executive visual reporting with SQL, Power BI, and Python.",
      icon: Database,
      tag: "ANALYTICS",
    },
    {
      title: "Full-Stack Engineering",
      description: "Architecting end-to-end intelligent platforms combining high-speed React/Next.js frontends with FastAPI backends.",
      icon: Layers,
      tag: "SYSTEMS",
    },
  ];

  return (
    <section id="about" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        index="01 // OVERVIEW"
        badge="Architectural Profile"
        title="Engineering intelligent data solutions from"
        highlight="the ground up."
        description="A look at my technical philosophy, educational background, and experience transforming unstructured datasets into high-impact applications."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Portrait Card with Futuristic Data-Lab Frame */}
        <div className="lg:col-span-5 flex flex-col">
          <TiltCard className="glass-panel p-6 rounded-2xl flex-1 flex flex-col justify-between border-cyan-400/20 shadow-xl">
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-cyan-400/30 group">
              <Image
                src={personal.photoUrl}
                alt={`${personal.name} - Portrait`}
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              {/* Scanline and corner accents */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-cyan-400/30 flex items-center gap-1.5 text-[11px] font-mono-code text-cyan-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>ONLINE // CANDIDATE</span>
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono-code text-foreground-muted flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <span>{personal.location}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-space text-xl font-bold text-foreground">{personal.name}</h3>
                  <p className="font-mono-code text-xs text-cyan-400">{personal.role}</p>
                </div>
                <div className="text-right font-mono-code text-xs text-foreground-subtle">
                  <span>BATCH</span>
                  <p className="text-foreground font-semibold">2023–2027</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-400/15 text-xs text-foreground-muted flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{personal.currentStatus}</span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Narrative Bio & Bento Insights */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          {/* Main Narrative Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-400/15"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="font-mono-code text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                Executive Summary
              </span>
            </div>
            <p className="font-inter text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
              {personal.aboutBio}
            </p>
          </motion.div>

          {/* Education & Internship Fast-Scan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-5 rounded-xl border-cyan-400/15 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-cyan-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" /> EDUCATION
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20 font-bold">
                    CGPA 8.90
                  </span>
                </div>
                <h4 className="font-space text-sm font-bold text-foreground">{edu.degree}</h4>
                <p className="text-xs text-foreground-muted mt-1">{edu.institution}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono-code text-foreground-subtle">
                {edu.period} • Active Student
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass-panel p-5 rounded-xl border-cyan-400/15 hover:border-cyan-400/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-cyan-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" /> EXPERIENCE
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20">
                    INTERNSHIP
                  </span>
                </div>
                <h4 className="font-space text-sm font-bold text-foreground">{exp.role}</h4>
                <p className="text-xs text-foreground-muted mt-1">{exp.company} ({exp.location})</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono-code text-foreground-subtle">
                {exp.period} • EDA & Dashboards
              </div>
            </motion.div>
          </div>

          {/* Three Core Engineering Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                  className="glass-panel p-4 rounded-xl border-cyan-400/10 hover:border-cyan-400/30 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono-code text-cyan-400/80 uppercase">
                        {pillar.tag}
                      </span>
                    </div>
                    <h5 className="font-space text-xs font-bold text-foreground">{pillar.title}</h5>
                    <p className="text-[11px] text-foreground-muted mt-1.5 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
