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
} from "lucide-react";
import { resumeData as resume } from "@/lib/resume";

export default function ResumePage() {
  const { basics, education, work, skills, languages } = resume;

  return (
    <main className="min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-10 font-body selection:bg-accent selection:text-black">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-8 border-b border-foreground/10">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="w-10 h-10 border border-foreground/20 rounded-xl flex items-center justify-center hover:bg-accent hover:border-accent hover:text-black transition-all"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-black uppercase tracking-tight">
                {basics.name}
              </h1>
              <p className="opacity-40 text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mt-1">
                {basics.label}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Available</span>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 bg-accent text-black font-display font-bold text-[10px] tracking-widest rounded-lg hover:brightness-110 transition-all uppercase flex items-center gap-2"
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

            {/* SUMMARY */}
            <section className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-foreground/20" />
                <h2 className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Overview</h2>
              </div>
              <p className="text-xl md:text-2xl lg:text-3xl font-display font-black leading-[1.2] uppercase italic">
                {basics.summary}
              </p>
            </section>

            {/* WORK EXPERIENCE */}
            <section className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase size={14} className="text-accent" />
                <div className="w-6 h-px bg-foreground/20" />
                <h2 className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Experience</h2>
              </div>

              <div className="space-y-0">
                {work.map((job, idx) => (
                  <div
                    key={idx}
                    className={`relative pl-8 pb-8 ${idx < work.length - 1 ? "border-l border-foreground/10" : ""}`}
                  >
                    {/* Dot */}
                    <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 bg-accent rounded-full shadow-[0_0_12px_var(--accent)]" />
                    {/* Short line for last item so dot isn't floating */}
                    {idx === work.length - 1 && (
                      <div className="absolute top-0 left-0 w-px h-3 bg-foreground/10" />
                    )}

                    <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
                      <div>
                        <h3 className="text-base md:text-lg font-display font-black uppercase">
                          {job.position}
                        </h3>
                        <p className="text-[var(--accent-text)] text-[10px] font-bold uppercase tracking-wider mt-1">
                          {job.name} · {job.location}
                        </p>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 bg-foreground/5 rounded-lg border border-foreground/5 whitespace-nowrap self-start">
                        {job.startDate.split("-")[0]} — {job.endDate ? job.endDate.split("-")[0] : "Present"}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {job.highlights.map((h, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2.5 text-xs opacity-60 leading-relaxed px-3 py-2.5 bg-foreground/[0.02] rounded-lg border border-foreground/5"
                        >
                          <span className="w-1 h-1 bg-accent rounded-full mt-1.5 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={14} className="text-accent" />
                <div className="w-6 h-px bg-foreground/20" />
                <h2 className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Education</h2>
              </div>

              <div className="bg-foreground/[0.03] border border-foreground/5 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base font-display font-black uppercase leading-tight">
                      {education[0].institution}
                    </h3>
                    <p className="opacity-50 text-[10px] font-medium uppercase tracking-wide mt-1">
                      {education[0].area}
                    </p>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 bg-accent/10 text-[var(--accent-text)] rounded-lg self-start whitespace-nowrap">
                    {education[0].startDate.split("-")[0]} — {education[0].endDate.split("-")[0]}
                  </span>
                </div>
                <span className="inline-block px-2 py-1 bg-foreground/5 rounded text-[9px] font-bold uppercase tracking-widest">
                  {education[0].studyType}
                </span>
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-5">

            {/* CONTACT */}
            <div className="bg-accent text-black p-6 rounded-2xl">
              <h2 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-5 opacity-50">Contact</h2>
              <div className="space-y-3.5">
                <a
                  href={`mailto:${basics.email}`}
                  className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide hover:opacity-70 transition-opacity"
                >
                  <Mail size={14} className="shrink-0" />
                  <span className="truncate">{basics.email}</span>
                </a>
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide">
                  <MapPin size={14} className="shrink-0" />
                  <span>{basics.location.city}, Indonesia</span>
                </div>
                <a
                  href={basics.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide hover:opacity-70 transition-opacity"
                >
                  <Globe size={14} className="shrink-0" />
                  <span className="truncate">{basics.url.replace("https://", "")}</span>
                </a>
                <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wide">
                  <Phone size={14} className="shrink-0" />
                  <span>{basics.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                {basics.profiles.map((profile, idx) => (
                  <a
                    key={idx}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 p-2.5 bg-black/10 rounded-lg hover:bg-black hover:text-accent text-[9px] font-bold uppercase tracking-wider transition-colors"
                  >
                    {profile.network} <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>

            {/* SKILLS */}
            <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <Code2 size={14} className="text-accent" />
                <div className="w-6 h-px bg-foreground/20" />
                <h2 className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Skills</h2>
              </div>

              <div className="space-y-5">
                {skills.map((group, idx) => (
                  <div key={idx}>
                    <h3 className="text-[10px] font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                      {group.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.keywords.map((kw, kwIdx) => (
                        <span
                          key={kwIdx}
                          className="px-2 py-1 bg-foreground/[0.03] border border-foreground/5 rounded-md text-[9px] font-semibold uppercase tracking-wide whitespace-nowrap hover:border-accent/30 hover:text-accent transition-colors"
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
            <div className="bg-foreground/5 border border-foreground/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <Languages size={14} className="text-accent" />
                <div className="w-6 h-px bg-foreground/20" />
                <h2 className="text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">Languages</h2>
              </div>

              <div className="space-y-2.5">
                {languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-foreground/[0.02] rounded-lg border border-foreground/5"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">{lang.language}</span>
                    <span className="text-[9px] font-bold text-accent uppercase tracking-wider">{lang.fluency}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-30">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em]">Portfolio Build · 2026</p>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em]">{basics.name}</p>
        </div>

      </div>

      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          .bg-foreground\/5 { background: #f9f9f9 !important; border-color: #e5e5e5 !important; }
          button { display: none !important; }
          .text-accent { color: #333 !important; }
          .bg-accent { background: #eee !important; }
        }
      `}</style>
    </main>
  );
}
