"use client";

import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Globe, Calendar, Tag, Cpu, Layout } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CustomCursor from "@/app/components/CustomCursor";
import { CursorProvider } from "@/app/context/CursorContext";

function ProjectDetailInner() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center font-display text-4xl bg-[var(--background)] text-[var(--foreground)]">
        PROJECT NOT FOUND.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <CustomCursor />
      <Navbar />

      {/* Master Centered Grid Container */}
      <section className="w-full bg-[var(--background)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] py-16 md:py-24 relative min-h-screen">
          
          {/* Corner dots */}
          <div className="grid-dot top-0 -left-[3px]" />
          <div className="grid-dot top-0 -right-[3px]" />

          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          {/* Title */}
          <div className="mb-12">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] font-bold tracking-tight mb-4 text-[var(--foreground)]"
            >
              {project.title}
            </motion.h1>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]">
                {project.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-mono border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)]">
                {project.year}
              </span>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-8 aspect-[16/9] border border-[var(--border)] rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Quick info */}
            <div className="md:col-span-4 grid grid-rows-2 gap-4">
              <div className="border border-[var(--border)] rounded-xl p-6 bg-[var(--surface)] flex flex-col justify-between">
                <Layout className="w-6 h-6 text-[var(--accent)] mb-3" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--muted)] mb-2">
                    Services
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.services.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded text-xs font-mono border border-[var(--border)] text-[var(--muted)]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-[var(--border)] rounded-xl p-6 bg-[var(--surface)] flex flex-col justify-between">
                <Cpu className="w-6 h-6 text-[var(--accent)] mb-3" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--muted)] mb-2">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-xs font-mono border border-[var(--border)] text-[var(--muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-6 border border-[var(--border)] rounded-xl p-8 bg-[var(--surface)]">
              <h2 className="font-display text-lg font-bold mb-4 text-[var(--foreground)]">
                Project Overview
              </h2>
              <p className="font-mono text-xs md:text-sm text-[var(--muted)] leading-relaxed mb-4">
                {project.description}
              </p>
              <div
                className="mt-4 p-3.5 rounded-lg text-xs font-mono font-bold"
                style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}
              >
                {project.impact}
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-3 border border-[var(--border)] rounded-xl p-6 bg-[var(--surface)] flex flex-col gap-3 justify-center">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--muted)] mb-1">
                Direct Access
              </p>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold text-white transition-all hover:opacity-90"
                style={{ background: "var(--accent)" }}
              >
                <Globe className="w-4 h-4" /> Live Demo
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold transition-all"
                style={{ border: "1px solid var(--border)", color: "var(--foreground)", background: "transparent" }}
              >
                <ExternalLink className="w-4 h-4" /> Repository
              </a>
            </div>

            {/* Stats */}
            <div className="md:col-span-3 border border-[var(--border)] rounded-xl p-6 bg-[var(--surface)] flex flex-col gap-4 justify-center">
              <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
                <Calendar className="w-4 h-4 text-[var(--accent)]" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">Year</p>
                  <p className="font-display font-bold text-[var(--foreground)]">{project.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4 text-[var(--accent)]" strokeWidth={1.5} />
                <div>
                  <p className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">Role</p>
                  <p className="font-display font-bold text-[var(--foreground)]">Lead Dev</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function ProjectDetail() {
  return (
    <CursorProvider>
      <ProjectDetailInner />
    </CursorProvider>
  );
}
