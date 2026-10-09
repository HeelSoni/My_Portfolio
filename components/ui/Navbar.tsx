"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Journey", href: "#journey" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ["hero", "about", "skills", "journey", "projects", "achievements", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl rounded-2xl transition-all duration-300 px-4 py-3 sm:px-6 flex items-center justify-between ${
          scrolled
            ? "glass-nav shadow-lg shadow-black/20"
            : "bg-transparent border border-transparent"
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand identity */}
        <Link
          href="#hero"
          className="flex items-center gap-2.5 group cursor-pointer"
          aria-label="Heel Soni Home"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-space font-bold tracking-tight text-sm text-foreground flex items-center gap-1.5">
              HEEL SONI
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-mono-code text-cyan-400/80 -mt-0.5 tracking-wider uppercase">
              AI & Data Lab
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 bg-black/20 dark:bg-black/40 backdrop-blur-md px-2 py-1.5 rounded-xl border border-white/5 dark:border-white/5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-xs font-mono-code transition-colors rounded-lg ${
                  isActive
                    ? "text-cyan-400 font-medium"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-cyan-400/10 border border-cyan-400/30 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right action tools: Resume + Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono-code font-medium bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 hover:border-cyan-400 transition-all"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle visual theme"
              className="p-2 rounded-lg text-foreground-muted hover:text-foreground bg-black/10 dark:bg-white/5 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-400/30 transition-all cursor-pointer"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-cyan-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-600" />
              )}
            </button>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded-lg text-foreground-muted hover:text-foreground bg-black/10 dark:bg-white/5 border border-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 p-5 rounded-2xl glass-panel md:hidden flex flex-col gap-3 shadow-2xl z-50"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-mono-code text-foreground-muted hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono-code text-foreground-subtle">Resume</span>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 text-xs font-mono-code text-cyan-400 font-semibold"
              >
                Download PDF
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
