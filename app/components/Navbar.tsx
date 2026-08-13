"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top Banner (Render/Laravel style announcement strip) */}
      <div className="w-full bg-[var(--accent-subtle)] border-b border-[var(--border)] text-xs font-mono py-2 px-4 text-center">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-2 text-[11px]" style={{ color: "var(--foreground)" }}>
          <span className="pulse-dot" />
          <span className="font-medium text-[var(--muted)]">
            Open to global remote roles & contracts in 2026.
          </span>
          <a
            href="#contact"
            className="font-bold underline hover:text-[var(--accent)] transition-colors inline-flex items-center gap-0.5 ml-1"
            style={{ color: "var(--accent)" }}
          >
            Get in touch <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-50 w-full">
        <div
          className={`max-w-[1200px] mx-auto px-6 md:px-12 border-x border-b border-[var(--border)] transition-all duration-300 ${
            scrolled
              ? "bg-[var(--background)]/95 backdrop-blur-md shadow-sm"
              : "bg-[var(--background)]"
          }`}
        >
          <div className="flex items-center justify-between h-14">
            {/* Logo — Sleek Code Badge <KD /> */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 transition-all text-[var(--foreground)]"
            >
              <div
                className="flex items-center gap-0.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-black transition-all"
                style={{
                  border: "1px solid var(--accent-border)",
                  background: "var(--accent-subtle)",
                  color: "var(--foreground)",
                }}
              >
                <span className="text-[var(--accent)] font-bold">&lt;</span>
                <span className="tracking-widest group-hover:text-[var(--accent)] transition-colors">{siteConfig.initials}</span>
                <span className="text-[var(--accent)] font-bold">/&gt;</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse ml-0.5" />
              </div>
              <span
                className="font-bold text-sm tracking-tight transition-colors group-hover:text-[var(--accent)] hidden xs:inline-block"
                style={{ fontFamily: "var(--font-space)" }}
              >
                {siteConfig.name}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-xs font-mono font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors rounded-none hover:bg-[var(--surface)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-none text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              )}

              {/* GitHub Link */}
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-[var(--border)] text-xs font-mono font-semibold text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
              >
                GitHub
              </a>

              {/* Hire Me CTA Button (Render.com sharp zero-radius style) */}
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-none text-xs font-mono font-bold text-white transition-all hover:opacity-90 active:scale-95"
                style={{ background: "var(--accent)" }}
              >
                Hire Me
              </a>

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-none text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 pt-20 bg-[var(--background)]"
          >
            <nav className="max-w-[1200px] mx-auto px-6 flex flex-col py-8 gap-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-mono font-semibold text-[var(--foreground)] border-b border-[var(--border)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="pt-4 flex gap-3">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-none border border-[var(--border)] text-xs font-mono text-center flex-1"
                >
                  GitHub
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-none text-white text-xs font-mono text-center flex-1 font-bold"
                  style={{ background: "var(--accent)" }}
                >
                  Hire Me
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
