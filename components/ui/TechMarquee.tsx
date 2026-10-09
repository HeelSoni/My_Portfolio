"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function TechMarquee() {
  const skills = PORTFOLIO_DATA.marqueeSkills;
  const duplicated = [...skills, ...skills, ...skills];

  return (
    <div className="relative w-full overflow-hidden py-6 border-y border-cyan-400/10 bg-black/20 backdrop-blur-sm select-none">
      {/* Side gradient masks for smooth fade edge */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex w-max animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] gap-8 items-center">
        {duplicated.map((skill, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-xs sm:text-sm font-mono-code text-foreground-muted hover:text-cyan-400 transition-colors cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
            <span className="tracking-wider uppercase">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
