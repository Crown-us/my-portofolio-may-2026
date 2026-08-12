"use client";

import { motion } from "framer-motion";
import {
  Globe, Smartphone, Layers, Server, Zap, GitBranch,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Layers, Server, Zap, GitBranch,
};

function TechChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-mono font-medium"
      style={{
        border: "1px solid var(--border)",
        background: "var(--surface)",
        color: "var(--muted)",
      }}
    >
      {label}
    </span>
  );
}

export default function About() {
  const { capabilities } = siteConfig;

  return (
    <section id="about" className="w-full bg-[var(--background)] border-t border-[var(--border)]">
      {/* Master Centered Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] py-20 md:py-28 relative">
        
        {/* Corner dots */}
        <div className="grid-dot -top-[3px] -left-[3px]" />
        <div className="grid-dot -top-[3px] -right-[3px]" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "var(--accent)" }}>
              [ 02 ] WHAT I DO
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
            >
              Built for{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>every layer</em>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono" style={{ color: "var(--muted)" }}>{siteConfig.location} / {siteConfig.timezone}</p>
            <p className="text-xs font-mono font-semibold mt-1" style={{ color: "var(--accent)" }}>{siteConfig.availabilityShort}</p>
          </div>
        </div>

        {/* Bento Grid — 3x2 Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {capabilities.map((cap, i) => {
            const Icon = iconMap[cap.icon] ?? Globe;
            const isTopRow = i < 3;
            const col = i % 3;

            return (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="p-7 group transition-all duration-200 cursor-default"
                style={{
                  borderBottom: isTopRow ? "1px solid var(--border)" : "none",
                  borderRight: col < 2 ? "1px solid var(--border)" : "none",
                  background: "transparent",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--surface)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
              >
                {/* Icon */}
                <Icon className="w-5 h-5 mb-4" strokeWidth={1.5} style={{ color: "var(--accent)" }} />

                {/* Label */}
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.1em] mb-2" style={{ color: "var(--accent)" }}>
                  {cap.label}
                </p>

                {/* Description */}
                <p className="text-[12px] font-mono leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                  {cap.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cap.tags.map(tag => <TechChip key={tag} label={tag} />)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bio strip below grid */}
        <div
          className="mt-8 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs font-mono leading-relaxed max-w-lg" style={{ color: "var(--muted)" }}>
            D3 Informatics graduate from Politeknik Negeri Malang (Polinema). Experienced in building
            cross-platform digital products with Next.js, Flutter, and Laravel.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <span className="pulse-dot" />
            <span className="text-xs font-mono font-semibold" style={{ color: "var(--foreground)" }}>
              {siteConfig.availability}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
