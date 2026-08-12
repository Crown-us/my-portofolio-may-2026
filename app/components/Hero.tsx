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
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center text-center py-20 overflow-hidden grid-bg-pattern">

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
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-6">

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
            className="font-display font-extrabold tracking-tight leading-[1.01]"
            style={{ fontSize: "clamp(3rem, 7.5vw, 6.5rem)", fontFamily: "var(--font-space)" }}
          >
            {words.map((word, i) => {
              const clean = word.replace(/[^a-zA-Z]/g, "");
              const punct = word.slice(clean.length);
              const isAccent = clean.toLowerCase() === accentWord.toLowerCase();
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="inline-block mr-[0.2em]"
                  style={isAccent ? { fontStyle: "italic", color: "var(--accent)" } : { color: "var(--foreground)" }}
                >
                  {clean}{punct}
                </motion.span>
              );
            })}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm md:text-base leading-relaxed max-w-xl font-mono"
            style={{ color: "var(--muted)" }}
          >
            {siteConfig.subtitle}
          </motion.p>

          {/* Action Buttons (Render.com sharp zero border-radius CTAs) */}
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

          {/* Location & Timezone info bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95 }}
            className="flex items-center gap-4 text-xs font-mono pt-4"
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
