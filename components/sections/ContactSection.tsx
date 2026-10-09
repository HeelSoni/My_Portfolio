"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Copy,
  Check,
  Terminal,
  Clock,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";

export function ContactSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Transmission error. Please try again.");
      }
    } catch {
      // Fallback: Open user's mail client directly
      const mailtoSubject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`);
      const mailtoBody = encodeURIComponent(
        `Hi Heel,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
      );
      window.location.href = `mailto:${personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setStatus("success");
    }
  };

  return (
    <section id="contact" className="relative py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        index="06 // TRANSMISSION"
        badge="Initiate Connection"
        title="Let's build intelligent products"
        highlight="together."
        description="I am actively seeking AI/ML, data analytics, and full-stack engineering internships and junior roles. Let's discuss how I can contribute."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Access & Coordinates */}
        <div className="lg:col-span-5 space-y-4">
          <TiltCard className="glass-panel p-6 sm:p-7 rounded-2xl border-cyan-400/20 shadow-xl space-y-6">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-code uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>Direct Telemetry</span>
            </div>

            {/* Email Direct Copy Box */}
            <div className="p-4 rounded-xl bg-black/30 dark:bg-white/5 border border-cyan-400/20 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[10px] font-mono-code text-foreground-subtle block">
                  PRIMARY INBOX
                </span>
                <span className="font-mono-code text-sm sm:text-base text-foreground font-semibold truncate block">
                  {personal.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 transition-colors shrink-0 cursor-pointer"
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Grid */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-mono-code text-foreground-subtle uppercase tracking-wider block">
                Verified Social Profiles
              </span>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl glass-panel border-cyan-400/15 hover:border-cyan-400/40 text-foreground group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-space text-sm font-bold block">LinkedIn</span>
                    <span className="text-[11px] font-mono-code text-foreground-subtle">
                      {personal.linkedinDisplay}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl glass-panel border-cyan-400/15 hover:border-cyan-400/40 text-foreground group transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-cyan-400 border border-white/10">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-space text-sm font-bold block">GitHub</span>
                    <span className="text-[11px] font-mono-code text-foreground-subtle">
                      {personal.githubDisplay}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Location & Response Time */}
            <div className="pt-4 border-t border-white/5 space-y-2 text-xs font-mono-code text-foreground-muted">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-foreground-subtle">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Location:
                </span>
                <span className="text-foreground">{personal.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-foreground-subtle">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> Response Time:
                </span>
                <span className="text-emerald-400 font-medium">Within 24 Hours</span>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right Column: Interactive Sendable Transmission Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border-cyan-400/20 shadow-xl space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="font-mono-code text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                TRANSMIT MESSAGE // SECURE RELAY
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                RELAY ACTIVE
              </span>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-space text-xl font-bold text-foreground">
                    Transmission Received!
                  </h3>
                  <p className="font-space text-foreground-muted text-sm max-w-md">
                    Thank you for reaching out. Your message has been routed to Heel Soni&apos;s direct inbox. You will receive a response shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 font-mono-code text-xs transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-2.5 text-rose-400 text-xs font-mono-code">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono-code text-foreground-muted mb-1.5">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Recruiter / Engineering Manager"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/25 dark:bg-white/5 border border-cyan-400/15 focus:border-cyan-400 focus:outline-none text-foreground text-sm font-inter transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-foreground-muted mb-1.5">
                        YOUR EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/25 dark:bg-white/5 border border-cyan-400/15 focus:border-cyan-400 focus:outline-none text-foreground text-sm font-inter transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-foreground-muted mb-1.5">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      placeholder="AI/ML Internship / Role Opportunity"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/25 dark:bg-white/5 border border-cyan-400/15 focus:border-cyan-400 focus:outline-none text-foreground text-sm font-inter transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-foreground-muted mb-1.5">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Hi Heel, we are impressed by your AI/ML projects and would like to schedule an interview..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/25 dark:bg-white/5 border border-cyan-400/15 focus:border-cyan-400 focus:outline-none text-foreground text-sm font-inter transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 text-slate-950 font-space font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

