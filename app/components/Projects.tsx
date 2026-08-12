"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { useCursor } from "../context/CursorContext";

function TechChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-mono"
      style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--muted)" }}
    >
      {label}
    </span>
  );
}

const GHIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const { setIsHovered, setCursorText } = useCursor();
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="w-full bg-[var(--background)] border-t border-[var(--border)]">
      {/* Master Centered Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] py-20 md:py-28 relative">
        
        {/* Corner dots */}
        <div className="grid-dot -top-[3px] -left-[3px]" />
        <div className="grid-dot -top-[3px] -right-[3px]" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "var(--accent)" }}>
              [ 01 ] SELECTED WORK
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
            >
              Projects &{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>case studies</em>
            </h2>
          </div>
          <p className="text-xs font-mono" style={{ color: "var(--muted)" }}>
            {projects.length} featured engineering projects · 2025–2026
          </p>
        </div>

        {/* Featured Project Card — Full Width Split (Laravel Cloud style) */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-xl mb-8"
            style={{ border: "1px solid var(--border)" }}
            onMouseEnter={() => { setIsHovered(true); setCursorText("VIEW"); }}
            onMouseLeave={() => { setIsHovered(false); setCursorText(""); }}
          >
            {/* Image Box */}
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px] overflow-hidden" style={{ background: "#0d0d0e" }}>
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.25))" }} />
              <div
                className="absolute bottom-4 left-4 text-xs font-mono font-bold px-3 py-1.5 rounded-md"
                style={{ background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.12)", color: "var(--accent)" }}
              >
                {featured.impact}
              </div>
            </div>

            {/* Content Box */}
            <div className="p-8 md:p-10 flex flex-col justify-between" style={{ background: "var(--surface)" }}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                    style={{ color: "var(--accent)", background: "var(--accent-subtle)", border: "1px solid var(--accent-border)" }}
                  >
                    FEATURED PROJECT
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                    {featured.category}
                  </span>
                </div>

                <Link href={`/works/${featured.slug}`}>
                  <h3
                    className="font-bold tracking-tight mb-3 group flex items-start justify-between gap-3 hover:text-[var(--accent)] transition-colors"
                    style={{ fontFamily: "var(--font-space)", fontSize: "1.75rem", color: "var(--foreground)" }}
                  >
                    {featured.title}
                    <ArrowUpRight className="w-5 h-5 shrink-0 mt-1 opacity-50 group-hover:opacity-100" style={{ color: "var(--accent)" }} />
                  </h3>
                </Link>

                <p className="text-xs md:text-sm font-mono leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
                  {featured.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {featured.tech.map(t => <TechChip key={t} label={t} />)}
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                <a
                  href={featured.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: "var(--accent)" }}
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </a>
                <a
                  href={featured.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all hover:-translate-y-0.5"
                  style={{ border: "1px solid var(--border)", color: "var(--foreground)", background: "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "var(--accent-subtle)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}
                >
                  <GHIcon /> Repository
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3-Col Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="group rounded-xl overflow-hidden flex flex-col transition-all"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; setIsHovered(true); setCursorText("VIEW"); }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; setIsHovered(false); setCursorText(""); }}
            >
              {/* Image Box */}
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "#111" }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  style={{ filter: "grayscale(0.8) brightness(0.9)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0) brightness(1)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0.8) brightness(0.9)"; }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
                <div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono font-bold" style={{ color: "var(--accent)" }}>
                  {project.year}
                </div>
              </div>

              {/* Content Box */}
              <div className="p-5 flex flex-col gap-2.5 flex-1">
                <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--muted)" }}>
                  {project.category}
                </p>
                <Link href={`/works/${project.slug}`}>
                  <h3
                    className="font-bold tracking-tight leading-tight transition-colors flex items-center justify-between gap-2 group-hover:text-[var(--accent)]"
                    style={{ fontFamily: "var(--font-space)", fontSize: "1.05rem", color: "var(--foreground)" }}
                  >
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent)" }} />
                  </h3>
                </Link>
                <p className="text-xs font-mono leading-relaxed line-clamp-2" style={{ color: "var(--muted)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                  {project.tech.slice(0, 3).map(t => <TechChip key={t} label={t} />)}
                  {project.tech.length > 3 && <TechChip label={`+${project.tech.length - 3}`} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
