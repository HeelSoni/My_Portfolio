"use client";

import React, { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Printer,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Terminal,
  Brain,
  Database,
  Globe,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";

// Light 3D ambient particle constellation background for resume page
const HeroScene = dynamic(
  () => import("@/components/canvas/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null }
);

export default function ResumePage() {
  const { personal, experience, education, projects, skillCategories, certifications, achievements } =
    PORTFOLIO_DATA;
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#071116] text-white selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden font-inter">
      {/* Ambient 3D canvas background (hidden during printing) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 print:hidden">
        <HeroScene />
      </div>

      {/* Subtle background radial gradient */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none print:hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(56,189,248,0.06), transparent 80%)",
        }}
      />

      {/* ── Top Navigation Bar (Hidden during print) ───────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#071116]/80 border-b border-cyan-500/15 px-4 sm:px-8 py-3.5 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 text-xs font-mono-code text-white/80 hover:text-cyan-300 transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-space font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 hover:scale-105 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Print PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Resume Paper Container ────────────────────────────────────── */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 print:p-0 print:max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          ref={printRef}
          className="rounded-3xl p-6 sm:p-10 md:p-12 print:p-8 border border-cyan-400/20 shadow-2xl relative print:shadow-none print:border-none print:bg-white print:text-black"
          style={{
            background: "rgba(10, 24, 32, 0.85)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header Banner / Contact Info */}
          <div className="border-b border-cyan-400/20 pb-8 print:border-gray-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 font-mono-code text-[11px] mb-2.5 print:hidden">
                  <Terminal className="w-3 h-3" />
                  <span>Curriculum Vitae</span>
                </div>
                <h1 className="font-space font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight print:text-black">
                  {personal.name}
                </h1>
                <p className="font-space text-cyan-400 text-base sm:text-lg font-semibold mt-1 print:text-blue-700">
                  {personal.role}
                </p>
                <p className="text-white/60 text-xs sm:text-sm mt-1 flex items-center gap-1.5 print:text-gray-600">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 print:text-gray-500" />
                  {personal.location}
                </p>
              </div>

              {/* Direct Links */}
              <div className="flex flex-col gap-2 font-mono-code text-xs text-white/75 print:text-gray-700">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400 print:text-gray-600" />
                  <span>{personal.email}</span>
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400 print:text-gray-600" />
                  <span>{personal.linkedinDisplay}</span>
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-300 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-cyan-400 print:text-gray-600" />
                  <span>{personal.githubDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="py-6 border-b border-cyan-400/15 print:border-gray-300">
            <h2 className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 font-bold mb-2.5 flex items-center gap-2 print:text-blue-800">
              <Brain className="w-4 h-4" />
              <span>Professional Summary</span>
            </h2>
            <p className="font-inter text-sm sm:text-[15px] leading-relaxed text-white/80 print:text-gray-800">
              {personal.aboutBio}
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div className="py-6 border-b border-cyan-400/15 print:border-gray-300">
            <h2 className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2 print:text-blue-800">
              <Code2 className="w-4 h-4" />
              <span>Technical Competencies</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {skillCategories.map((category, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 print:bg-gray-50 print:border-gray-200"
                >
                  <span className="font-space text-xs font-bold text-cyan-300 block mb-1.5 print:text-gray-900">
                    {category.title}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-200 font-mono-code text-[11px] border border-cyan-500/20 print:bg-white print:text-gray-800 print:border-gray-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="py-6 border-b border-cyan-400/15 print:border-gray-300">
            <h2 className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2 print:text-blue-800">
              <Briefcase className="w-4 h-4" />
              <span>Work Experience</span>
            </h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h3 className="font-space font-bold text-base text-white print:text-black">
                      {exp.role}
                    </h3>
                    <p className="font-space text-xs text-cyan-400 font-semibold print:text-blue-700">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className="font-mono-code text-xs text-white/50 print:text-gray-600">
                    {exp.period}
                  </span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs sm:text-sm text-white/75 print:text-gray-800 leading-relaxed">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Engineering Projects */}
          <div className="py-6 border-b border-cyan-400/15 print:border-gray-300">
            <h2 className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 font-bold mb-4 flex items-center gap-2 print:text-blue-800">
              <Globe className="w-4 h-4" />
              <span>Key Engineering Projects</span>
            </h2>
            <div className="space-y-4">
              {projects.slice(0, 3).map((proj, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-space font-bold text-sm sm:text-base text-white print:text-black">
                        {proj.title}
                      </h3>
                      <span className="text-white/40 text-xs">—</span>
                      <span className="text-cyan-300 text-xs font-medium print:text-blue-700">
                        {proj.subtitle}
                      </span>
                    </div>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono-code text-[11px] text-cyan-400 hover:underline print:hidden"
                      >
                        Live Demo
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-white/75 print:text-gray-800 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {proj.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 rounded text-[10px] font-mono-code bg-white/5 text-cyan-200 border border-white/10 print:border-gray-200 print:text-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-2 print:text-blue-800">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="font-space font-bold text-sm text-white print:text-black">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-cyan-300 font-medium print:text-blue-700">
                    {edu.institution}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono-code text-white/60 print:text-gray-600">
                    <span>{edu.period}</span>
                    <span className="text-emerald-400 font-bold print:text-emerald-700">
                      {edu.score}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 print:text-gray-600 pt-1 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 font-bold mb-3 flex items-center gap-2 print:text-blue-800">
                <Award className="w-4 h-4" />
                <span>Certifications &amp; Honors</span>
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-white/85 font-medium print:text-gray-900">
                      {cert.title}
                    </span>
                    <span className="font-mono-code text-[11px] text-cyan-400/80 print:text-gray-600">
                      {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
