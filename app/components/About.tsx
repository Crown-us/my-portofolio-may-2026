"use client";

import { motion } from "framer-motion";
import { resumeData as resume } from "@/lib/resume";
import { MapPin, Calendar, Award, BookOpen, Terminal } from "lucide-react";

export default function About() {
  const { basics, skills, education } = resume;

  return (
    <section id="about" className="py-24 md:py-32 bg-background text-foreground border-t border-foreground/15 relative font-mono select-none">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-12 mb-12 border-b border-foreground/15 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00] bg-black px-2 py-0.5 font-bold mb-3 inline-block">
              [02] ARCHITECTURE &amp; BIOGRAPHY
            </span>
            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tighter uppercase text-foreground">
              ABOUT THE CREATOR
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-foreground/60">
            LOCATION: <span className="font-bold text-foreground">JAKARTA / INDONESIA (UTC+7)</span>
          </div>
        </div>

        {/* Grid Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Item 1: Executive Summary */}
          <div className="lg:col-span-7 border border-foreground/20 p-6 md:p-8 bg-foreground/[0.02] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ccff00] bg-foreground px-2 py-0.5 w-fit">
                <Terminal size={12} /> EXECUTIVE SUMMARY
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase leading-snug text-foreground">
                {basics.summary}
              </h3>

              <div className="space-y-4 text-xs md:text-sm text-foreground/80 leading-relaxed">
                <p>
                  Specializing in cross-platform mobile apps using <span className="font-bold text-foreground border-b border-[#ccff00]">Flutter</span> and high-performance Web applications with <span className="font-bold text-foreground border-b border-[#ccff00]">Next.js</span> &amp; <span className="font-bold text-foreground border-b border-[#ccff00]">Laravel</span>.
                </p>
                <p>
                  Focused on computational design, minimalist typography, and seamless interaction logic.
                </p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-foreground/10 flex flex-wrap gap-6 text-xs text-foreground/60">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-foreground" /> {basics.location.city}, Indonesia
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-foreground" /> Available for Contract / Remote
              </div>
            </div>
          </div>

          {/* Item 2: ID & System Stats */}
          <div className="lg:col-span-5 border border-foreground/20 p-6 md:p-8 bg-foreground/[0.02] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-foreground/10 text-xs">
                <span className="font-bold">DEV_ID // 2026</span>
                <span className="text-[#ccff00] bg-foreground px-2 py-0.5 font-bold text-[10px]">ACTIVE</span>
              </div>

              <div className="flex gap-4 items-center pt-2">
                <div className="w-20 h-20 border border-foreground/20 overflow-hidden shrink-0 bg-foreground/5">
                  <img
                    src="/images/kevin-profile.png"
                    alt={basics.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div>
                  <h4 className="font-display text-xl font-extrabold uppercase">{basics.name}</h4>
                  <p className="text-xs text-foreground/60 uppercase">{basics.label}</p>
                </div>
              </div>

              <div className="pt-4 space-y-2 text-xs text-foreground/80">
                <div className="flex justify-between">
                  <span className="text-foreground/50">Core Frameworks:</span>
                  <span className="font-bold">Next.js · Flutter · Laravel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">UI Aesthetics:</span>
                  <span className="font-bold">Editorial Brutalism · Monospaced</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-foreground/10 text-[10px] text-foreground/50 flex justify-between">
              <span>SYS_VER: 2026.05</span>
              <span>COMPUTATION READY</span>
            </div>
          </div>

          {/* Item 3: Skills Matrix */}
          <div className="lg:col-span-6 border border-foreground/20 p-6 md:p-8 bg-foreground/[0.02]">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground mb-4">
              <Award size={14} className="text-[#ccff00]" /> TECHNICAL MATRIX &amp; STACK
            </div>

            <div className="space-y-4">
              {skills.slice(0, 3).map((group, idx) => (
                <div key={idx} className="space-y-2">
                  <h5 className="text-xs font-bold uppercase text-foreground/60 tracking-wider">
                    {group.name}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {group.keywords.map((kw, kwIdx) => (
                      <span
                        key={kwIdx}
                        className="px-2.5 py-1 border border-foreground/20 text-xs text-foreground hover:bg-foreground hover:text-background transition-colors"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Item 4: Education & Certifications */}
          <div className="lg:col-span-6 border border-foreground/20 p-6 md:p-8 bg-foreground/[0.02]">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground mb-4">
              <BookOpen size={14} className="text-[#ccff00]" /> ACADEMIC BACKGROUND
            </div>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div key={idx} className="pb-4 border-b border-foreground/10 last:border-b-0 space-y-1">
                  <div className="flex justify-between items-start">
                    <h5 className="font-display font-extrabold text-sm uppercase">{edu.institution}</h5>
                    <span className="text-[10px] font-bold border border-foreground/20 px-2 py-0.5">
                      {edu.startDate.split("-")[0]} — {edu.endDate.split("-")[0]}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/60">{edu.area} ({edu.studyType})</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
