"use client";

import React, { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { ArrowRight, FileText, MapPin, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

// ── 3D Canvas (SSR: false for instant initial text paint) ─────────────────────
const HeroScene = dynamic(
  () => import("@/components/canvas/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

// ── Per-letter 3D perspective entrance ────────────────────────────────────────
function SplitWord({
  word,
  className,
  baseDelay = 0,
}: {
  word: string;
  className?: string;
  baseDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });

  return (
    <span
      ref={ref}
      className={`inline-flex whitespace-nowrap ${className || ""}`}
      style={{ perspective: "800px" }}
    >
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: 30 }}
          animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: baseDelay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: "inline-block",
            transformOrigin: "50% 0%",
            willChange: "transform, opacity",
          }}
        >
          {ch === " " ? "\u00a0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const { personal, stats } = PORTFOLIO_DATA;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex flex-col justify-between"
      style={{ height: "100svh", background: "#081318" }}
      aria-label="Heel Soni — AI/ML & Data Developer Portfolio"
    >
      {/* ══════════════════════════════════════════════════════════
          LAYER 0 — Full-viewport 3D WebGL Canvas
      ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroScene />
      </div>

      {/* ── LAYER 1 — Strong vignette so constellation lines fade behind text ── */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 72% 58% at 50% 48%, rgba(8,19,24,0.5) 0%, rgba(8,19,24,0.85) 100%)",
            "linear-gradient(to bottom, rgba(8,19,24,0.90) 0%, rgba(8,19,24,0.22) 22%, rgba(8,19,24,0.22) 72%, rgba(8,19,24,0.98) 100%)",
          ].join(", "),
        }}
      />

      {/* ── LAYER 2 — Hero content ─────────────────────────────────────── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-28 pb-6 text-center max-w-5xl mx-auto w-full">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono-code"
          style={{
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.25)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 20px rgba(16, 185, 129, 0.1)",
          }}
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-medium tracking-wide">
            Open to internships &amp; junior roles
          </span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-white/50">
            <MapPin className="w-3 h-3 text-cyan-400" />
            {personal.location}
          </span>
        </motion.div>

        {/* ── HEEL SONI Title ──────────────────────────────────────── */}
        <h1
          className="font-space font-black text-white select-none tracking-tight"
          style={{
            fontSize: "clamp(3.5rem, 10vw, 9rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            textShadow: "0 2px 60px rgba(56, 189, 248, 0.18)",
          }}
          aria-label="Heel Soni — AI/ML Developer & Data Analyst"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <SplitWord word="HEEL" baseDelay={0.15} />
            <SplitWord
              word="SONI"
              baseDelay={0.3}
            />
          </div>
        </h1>

        {/* ── Role badge ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full font-mono-code text-xs sm:text-sm font-semibold tracking-wider text-cyan-300"
          style={{
            background: "rgba(56, 189, 248, 0.07)",
            border: "1px solid rgba(56, 189, 248, 0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="text-white/30">//</span>
          <span>AI/ML Developer &amp; Data Analyst</span>
          <span className="text-white/30">//</span>
        </motion.div>

        {/* ── Tagline ───────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="mt-4 font-space text-white/60 text-sm sm:text-base max-w-md leading-relaxed"
        >
          Turning raw data into intelligent products — ML pipelines, analytics &amp; full-stack apps.
        </motion.p>

        {/* ── CTA Buttons & Socials ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.88 }}
          className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <MagneticButton>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full font-space font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(56,189,248,0.25), rgba(14,116,144,0.4))",
                border: "1px solid rgba(56, 189, 248, 0.45)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 25px rgba(56, 189, 248, 0.25)",
              }}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full font-space font-medium text-sm text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
              }}
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Resume</span>
            </Link>
          </MagneticButton>

          {/* Clean Social Dock */}
          <div className="flex items-center gap-2 pl-2">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 sm:p-3 rounded-full text-white/50 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 sm:p-3 rounded-full text-white/50 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personal.email}`}
              aria-label="Email Heel Soni"
              className="p-2.5 sm:p-3 rounded-full text-white/50 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── LAYER 3 — Bottom Metrics Strip ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="relative z-20 w-full"
        style={{
          background: "rgba(8, 19, 24, 0.85)",
          borderTop: "1px solid rgba(56, 189, 248, 0.12)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-cyan-400/10">
            {stats.map((stat, idx) => (
              <div key={idx} className="py-3 sm:py-4 px-4 sm:px-6">
                <div className="font-mono-code text-[9px] text-cyan-400/60 tracking-[0.16em] mb-0.5">
                  {"0" + (idx + 1)} //
                </div>
                <div className="font-space text-lg sm:text-2xl font-bold text-white leading-tight">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isDecimal={stat.isDecimal}
                  />
                </div>
                <div className="text-[10px] text-white/40 font-mono-code leading-tight mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

