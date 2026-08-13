"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Terminal, Code2 } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Hero() {
  const words = siteConfig.tagline.split(" ");
  const accentWord = siteConfig.taglineAccent;

  return (
    <section className="w-full relative bg-[var(--background)]">
      {/* Centered Master Grid Frame */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] relative min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-center py-14 md:py-20 pb-28 md:pb-36 grid-bg-pattern">

        {/* Grid Corner Dot Accents */}
        <div className="grid-dot top-0 -left-[3px]" />
        <div className="grid-dot top-0 -right-[3px]" />
        <div className="grid-dot bottom-0 -left-[3px]" />
        <div className="grid-dot bottom-0 -right-[3px]" />

        {/* Radial glow background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255, 68, 58, 0.09) 0%, transparent 70%)",
          }}
        />

        {/* Content Box */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-5 md:gap-6 w-full">

          {/* Availability pill (Render sharp tech badge style) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-2 px-3.5 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-widest border rounded-none"
            style={{
              borderColor: "var(--accent-border)",
              background: "var(--accent-subtle)",
              color: "var(--accent)",
            }}
          >
            <span className="pulse-dot" />
            {siteConfig.availabilityShort}
          </motion.div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold tracking-tight leading-[1.05] max-w-full break-words"
            style={{ fontSize: "clamp(2.1rem, 5.2vw, 4.8rem)", fontFamily: "var(--font-space)" }}
          >
            {words.map((word, i) => {
              const clean = word.replace(/[^a-zA-Z-]/g, "");
              const isAccent = clean.toLowerCase() === accentWord.toLowerCase();
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block mr-[0.22em] max-w-full"
                  style={isAccent ? { fontStyle: "italic", color: "var(--accent)" } : { color: "var(--foreground)" }}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-mono px-2"
            style={{ color: "var(--muted)" }}
          >
            {siteConfig.subtitle}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none text-xs font-mono font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "var(--accent)" }}
            >
              View Featured Projects <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="/resume"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-none text-xs font-mono font-bold transition-all"
              style={{ border: "1px solid var(--border)", color: "var(--foreground)", background: "var(--surface)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "var(--accent-subtle)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; }}
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </motion.div>

          {/* HR & Recruiter Fast-Facts Strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 p-3 rounded-lg"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center justify-center p-2 text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  {stat.label}
                </span>
                <span className="text-xs font-mono font-bold mt-0.5" style={{ color: "var(--foreground)" }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Location & Timezone info bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono pt-1"
            style={{ color: "var(--muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" /> {siteConfig.location}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" /> {siteConfig.timezone}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
