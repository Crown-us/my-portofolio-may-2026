"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Languages,
  Download,
  Terminal,
} from "lucide-react";
import { resumeData as resume } from "@/lib/resume";
import { siteConfig } from "@/lib/config";
import ControlDock from "../components/ControlDock";

export default function ResumePage() {
  const { basics, education, work, skills, languages } = resume;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-mono selection:bg-[var(--accent)] selection:text-white relative">
      <ControlDock />

      {/* Master Centered Container Frame */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] py-12 md:py-16 pb-32 md:pb-40 relative grid-bg-pattern min-h-screen">
        
        {/* Corner Dots */}
        <div className="grid-dot -top-[3px] -left-[3px]" />
        <div className="grid-dot -top-[3px] -right-[3px]" />
        <div className="grid-dot -bottom-[3px] -left-[3px]" />
        <div className="grid-dot -bottom-[3px] -right-[3px]" />

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 pb-8 border-b border-[var(--border)]">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 shrink-0"
              style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "var(--accent-subtle)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; }}
            >
              <ArrowLeft size={16} className="text-[var(--accent)]" />
              <span>Back to Home</span>
            </Link>
            <div>
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight break-words" style={{ fontFamily: "var(--font-space)", color: "var(--foreground)" }}>
                {basics.name}
              </h1>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider mt-1 break-words" style={{ color: "var(--accent)" }}>
                {basics.label}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="px-3.5 py-1.5 text-[11px] font-mono font-semibold uppercase tracking-widest flex items-center gap-2"
              style={{ border: "1px solid var(--accent-border)", background: "var(--accent-subtle)", color: "var(--accent)" }}
            >
              <span className="pulse-dot" />
              <span>{siteConfig.availabilityShort}</span>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 text-xs font-mono font-bold text-white transition-all hover:opacity-90 active:scale-95 flex items-center gap-2"
              style={{ background: "var(--accent)" }}
            >
              <Download size={14} />
              Export PDF
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-6">

            {/* OVERVIEW / SUMMARY */}
            <section
              className="p-6 md:p-8 rounded-xl"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={14} style={{ color: "var(--accent)" }} />
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]" style={{ color: "var(--accent)" }}>
                  [ EXECUTIVE OVERVIEW ]
                </p>
              </div>
              <p className="text-sm md:text-base font-mono leading-relaxed break-words" style={{ color: "var(--muted)" }}>
                {basics.summary}
              </p>
            </section>

            {/* WORK EXPERIENCE */}
            <section
              className="p-6 md:p-8 rounded-xl"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center gap-2 mb-8">
                <Briefcase size={15} style={{ color: "var(--accent)" }} />
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]" style={{ color: "var(--accent)" }}>
                  [ WORK EXPERIENCE ]
                </p>
              </div>

              <div className="space-y-0">
                {work.map((job, idx) => (
                  <div
                    key={idx}
                    className={`relative pl-7 pb-8 ${idx < work.length - 1 ? "border-l border-[var(--border)]" : ""}`}
                  >
                    {/* Dot */}
                    <div
                      className="absolute top-0 left-[-4.5px] w-2.5 h-2.5 rounded-full"
                      style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
                    />
                    {idx === work.length - 1 && (
                      <div className="absolute top-0 left-0 w-px h-3" style={{ background: "var(--border)" }} />
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                      <div>
                        <h3
                          className="font-bold text-base md:text-lg tracking-tight"
                          style={{ fontFamily: "var(--font-space)", color: "var(--foreground)" }}
                        >
                          {job.position}
                        </h3>
                        <p className="text-xs font-mono mt-0.5" style={{ color: "var(--accent)" }}>
                          {job.name} · {job.location}
                        </p>
                      </div>
                      <span
                        className="text-[10px] font-mono font-bold px-2.5 py-1 rounded"
                        style={{ border: "1px solid var(--border)", background: "var(--background)", color: "var(--muted)" }}
                      >
                        {job.startDate.split("-")[0]} — {job.endDate ? job.endDate.split("-")[0] : "Present"}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {job.highlights.map((h, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs font-mono leading-relaxed p-3 rounded-lg"
                          style={{ border: "1px solid var(--border)", background: "var(--background)", color: "var(--muted)" }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: "var(--accent)" }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section
              className="p-6 md:p-8 rounded-xl"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap size={15} style={{ color: "var(--accent)" }} />
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]" style={{ color: "var(--accent)" }}>
                  [ EDUCATION ]
                </p>
              </div>

              <div className="p-5 rounded-lg" style={{ border: "1px solid var(--border)", background: "var(--background)" }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                  <div>
                    <h3
                      className="font-bold text-base tracking-tight"
                      style={{ fontFamily: "var(--font-space)", color: "var(--foreground)" }}
                    >
                      {education[0].institution}
                    </h3>
                    <p className="text-xs font-mono mt-0.5" style={{ color: "var(--muted)" }}>
                      {education[0].area}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded"
                    style={{ border: "1px solid var(--accent-border)", background: "var(--accent-subtle)", color: "var(--accent)" }}
                  >
                    {education[0].startDate.split("-")[0]} — {education[0].endDate.split("-")[0]}
                  </span>
                </div>
                <span
                  className="inline-block px-2.5 py-1 rounded text-[10px] font-mono font-semibold"
                  style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
                >
                  {education[0].studyType}
                </span>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-6">

            {/* CONTACT CARD */}
            <div
              className="p-6 rounded-xl"
              style={{ border: "1px solid var(--accent-border)", background: "var(--accent-subtle)" }}
            >
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "var(--accent)" }}>
                [ CONTACT DIRECT ]
              </p>
              <div className="space-y-3">
                <a
                  href={`mailto:${basics.email}`}
                  className="flex items-center gap-2.5 text-xs font-mono font-semibold hover:underline"
                  style={{ color: "var(--foreground)" }}
                >
                  <Mail size={14} className="shrink-0 text-[var(--accent)]" />
                  <span className="truncate">{basics.email}</span>
                </a>
                <div className="flex items-center gap-2.5 text-xs font-mono" style={{ color: "var(--muted)" }}>
                  <MapPin size={14} className="shrink-0 text-[var(--accent)]" />
                  <span>{basics.location.city}, Indonesia</span>
                </div>
                <a
                  href={basics.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs font-mono font-semibold hover:underline"
                  style={{ color: "var(--foreground)" }}
                >
                  <Globe size={14} className="shrink-0 text-[var(--accent)]" />
                  <span className="truncate">{basics.url.replace("https://", "")}</span>
                </a>
                <div className="flex items-center gap-2.5 text-xs font-mono" style={{ color: "var(--muted)" }}>
                  <Phone size={14} className="shrink-0 text-[var(--accent)]" />
                  <span>{basics.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-5">
                {basics.profiles.map((profile, idx) => (
                  <a
                    key={idx}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 p-2 rounded-lg text-xs font-mono font-semibold transition-all"
                    style={{ border: "1px solid var(--border)", background: "var(--background)", color: "var(--foreground)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--foreground)"; }}
                  >
                    <span>{profile.network}</span> <ExternalLink size={11} />
                  </a>
                ))}
              </div>
            </div>

            {/* SKILLS */}
            <div
              className="p-6 rounded-xl"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Code2 size={15} style={{ color: "var(--accent)" }} />
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]" style={{ color: "var(--accent)" }}>
                  [ TECHNICAL SKILLS ]
                </p>
              </div>

              <div className="space-y-4">
                {skills.map((group, idx) => (
                  <div key={idx}>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: "var(--foreground)" }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                      {group.name}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.keywords.map((kw, kwIdx) => (
                        <span
                          key={kwIdx}
                          className="px-2 py-1 rounded text-[10px] font-mono"
                          style={{ border: "1px solid var(--border)", background: "var(--background)", color: "var(--muted)" }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LANGUAGES */}
            <div
              className="p-6 rounded-xl"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <Languages size={15} style={{ color: "var(--accent)" }} />
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]" style={{ color: "var(--accent)" }}>
                  [ LANGUAGES ]
                </p>
              </div>

              <div className="space-y-2">
                {languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 rounded-lg text-xs font-mono"
                    style={{ border: "1px solid var(--border)", background: "var(--background)" }}
                  >
                    <span className="font-semibold" style={{ color: "var(--foreground)" }}>{lang.language}</span>
                    <span className="font-bold text-[10px] uppercase" style={{ color: "var(--accent)" }}>{lang.fluency}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono" style={{ color: "var(--muted)" }}>
          <p>Kevin Dwi Wijaya — Portfolio Resume 2026</p>
          <p>{siteConfig.location} · {siteConfig.timezone}</p>
        </div>

      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          div { border-color: #ddd !important; }
          button { display: none !important; }
        }
      `}</style>
    </main>
  );
}

