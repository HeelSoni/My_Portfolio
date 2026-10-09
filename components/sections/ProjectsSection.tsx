"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  BarChart2,
  Cpu,
  Layers,
  Globe,
  FileSpreadsheet,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";

type FilterTab = "All" | "AI" | "Data" | "Full-Stack" | "Web";

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const { projects, githubRepositories } = PORTFOLIO_DATA;

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    if (activeTab === "AI") return project.category === "AI" || project.tech.includes("Python") || project.tech.includes("Hugging Face");
    if (activeTab === "Data") return project.category === "Data" || project.tech.includes("SQL") || project.tech.includes("Plotly") || project.tech.includes("Recharts");
    if (activeTab === "Full-Stack") return project.category === "Full-Stack" || project.tech.includes("FastAPI") || project.tech.includes("React");
    if (activeTab === "Web") return project.category === "Web" || project.tech.includes("HTML5");
    return true;
  });

  return (
    <section id="projects" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        index="04 // PORTFOLIO"
        badge="Engineered Systems"
        title="Featured applications &"
        highlight="intelligent platforms."
        description="Every project is built from scratch with production logic, real APIs, and intuitive user experiences. No templates, no mock metrics."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-start gap-2 mb-10">
        {(["All", "AI", "Data", "Full-Stack", "Web"] as FilterTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer ${
              activeTab === tab
                ? "text-cyan-400 font-semibold"
                : "text-foreground-muted hover:text-foreground bg-black/10 dark:bg-white/5 border border-white/5 hover:border-cyan-400/25"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeProjectFilter"
                className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/40 rounded-xl -z-10 shadow-lg shadow-cyan-500/15"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            <span>{tab}</span>
          </button>
        ))}
      </div>

      {/* Bento Grid Projects */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="flex"
            >
              <TiltCard className="glass-panel p-6 rounded-2xl w-full border-cyan-400/15 hover:border-cyan-400/40 transition-all flex flex-col justify-between group shadow-xl">
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-code text-[11px] text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/20">
                        {project.category}
                      </span>
                      {project.isCaseStudy && (
                        <span className="font-mono-code text-[11px] text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-400/25">
                          CASE STUDY
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="p-2 rounded-lg text-foreground-muted hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-400/30 transition-colors"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="p-2 rounded-lg text-foreground-muted hover:text-cyan-400 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-400/30 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-space text-xl font-bold text-foreground group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono-code text-xs text-cyan-400/90 mt-1">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-foreground-muted leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metric Stat badge if available */}
                  {project.stats && (
                    <div className="mt-4 p-2.5 rounded-lg bg-black/20 dark:bg-white/5 border border-white/5 flex items-center gap-2 text-xs font-mono-code text-foreground-subtle">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{project.stats}</span>
                    </div>
                  )}
                </div>

                {/* Footer with tech tags and action link */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-black/30 dark:bg-white/5 text-foreground-muted border border-cyan-400/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono-code text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                      >
                        <span>Launch Live Demo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="font-mono-code text-foreground-subtle">
                        Excel Modeling & Pivot Levers
                      </span>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-code text-foreground-subtle hover:text-foreground text-[11px] transition-colors"
                      >
                        View Source
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* "More on GitHub" Row */}
      <div className="mt-16 pt-10 border-t border-cyan-400/15">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-space text-lg font-bold text-foreground flex items-center gap-2">
              <GithubIcon className="w-5 h-5 text-cyan-400" />
              <span>More Open-Source Repositories</span>
            </h4>
            <p className="text-xs text-foreground-muted font-mono-code mt-0.5">
              Additional machine learning models and experiments on GitHub
            </p>
          </div>
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono-code text-cyan-400 hover:bg-cyan-500/10 border border-cyan-400/20 transition-all"
          >
            <span>View All Repos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {githubRepositories.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-5 rounded-xl border-cyan-400/15 hover:border-cyan-400/40 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code text-foreground-subtle mb-2">
                  <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors font-bold flex items-center gap-1">
                    <GithubIcon className="w-3.5 h-3.5" />
                    {repo.name}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {repo.description}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-white/5 flex gap-2">
                {repo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono-code text-foreground-subtle"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
