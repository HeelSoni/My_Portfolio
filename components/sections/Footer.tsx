"use client";

import React from "react";
import { ArrowUp, Terminal, Heart } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Footer() {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-cyan-400/15 bg-black/40 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Telemetry */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="font-space font-bold text-sm text-foreground">
              {personal.name}
            </span>
          </div>
          <span className="hidden sm:inline text-foreground-subtle">•</span>
          <span className="text-xs font-mono-code text-foreground-muted">
            AI/ML Developer & Data Analyst
          </span>
          <span className="hidden sm:inline text-foreground-subtle">•</span>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono-code text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYSTEMS NOMINAL</span>
          </div>
        </div>

        {/* Center / Copyright */}
        <div className="text-xs font-mono-code text-foreground-subtle text-center">
          © 2026 {personal.name}. Crafted with Next.js, R3F & Tailwind.
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass-panel text-xs font-mono-code text-foreground-muted hover:text-cyan-400 hover:border-cyan-400/40 transition-colors cursor-pointer"
          aria-label="Back to top"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>
      </div>
    </footer>
  );
}
