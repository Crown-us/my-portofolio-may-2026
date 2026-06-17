"use client";

import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import { resumeData as resume } from "@/lib/resume";
import { MapPin, Calendar, Award, BookOpen } from "lucide-react";

export default function About() {
  const { basics, skills, education } = resume;

  return (
    <section id="about" className="px-6 py-24 bg-[#080808] text-white overflow-hidden border-t border-white/5 relative">
      
      {/* Decorative Glow Blob */}
      <div className="glow-bg bg-purple-600/10 w-[450px] h-[450px] top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto">
        
        {/* Header Title */}
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 0.5, x: 0 }}
            className="font-body text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-4 block text-accent"
          >
            WHO IS KEVIN?
          </motion.span>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] uppercase">
            ABOUT <br /> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-accent">MY BACKGROUND</span>
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Item 1: Overview Summary (Col Span 7) */}
          <div className="lg:col-span-7 glass-card p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden group min-h-[300px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-purple-600 opacity-60" />
            
            <div className="space-y-6">
              <span className="font-display text-[10px] text-accent font-bold tracking-widest uppercase block">
                ✦ Executive Summary
              </span>
              <p className="font-display text-2xl md:text-3xl font-bold leading-tight uppercase tracking-tight text-white/90">
                {basics.summary}
              </p>
              <div className="space-y-4 font-body text-sm md:text-base leading-relaxed text-white/60">
                <p>
                  Berbasis di {basics.location.city}, {basics.location.region}. Saya memadukan keahlian pengembangan aplikasi mobile modern menggunakan <span className="text-accent font-semibold">Flutter</span> dengan pembuatan website responsif performa tinggi menggunakan <span className="text-accent font-semibold">Next.js</span> dan <span className="text-accent font-semibold">Laravel</span>.
                </p>
                <p>
                  Fokus saya adalah menciptakan pengalaman pengguna yang interaktif, berani secara visual, dan optimal secara performa, memastikan kepuasan terbaik bagi klien dan pengguna akhir.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-6 text-[10px] font-mono text-white/40 uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-accent" /> {basics.location.city}, Indonesia
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-accent" /> Available for Hire
              </div>
            </div>
          </div>

          {/* Bento Item 2: Radar ID Card (Col Span 5) */}
          <div className="lg:col-span-5 flex flex-col justify-stretch">
            <Magnetic>
              <div className="glass-card rounded-2xl overflow-hidden relative group cursor-none w-full h-full flex flex-col justify-between">
                
                {/* Radar Scanning Line Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent h-1/2 w-full radar-sweep pointer-events-none opacity-40" />

                {/* ID Header */}
                <div className="bg-white/[0.02] border-b border-white/[0.05] py-3.5 px-6 flex justify-between items-center shrink-0">
                  <span className="font-display text-[9px] font-bold tracking-widest text-white/40">SECURE ID // DEV.2026</span>
                  <div className="flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[8px] text-accent uppercase font-bold tracking-wider">ACTIVE</span>
                  </div>
                </div>

                {/* Profile Card Body */}
                <div className="p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start grow justify-center">
                  {/* Photo Frame */}
                  <div className="w-28 h-28 border border-white/10 rounded-xl relative overflow-hidden shrink-0 bg-white/5 flex items-center justify-center p-1">
                    <img 
                      src="/images/kevin-profile.png" 
                      alt={basics.name}
                      className="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 border border-accent/20 rounded-lg pointer-events-none group-hover:border-accent transition-colors" />
                  </div>
                  
                  <div className="flex flex-col text-center sm:text-left justify-center pt-2">
                    <h3 className="font-display text-2xl font-black tracking-tight leading-none mb-2">{basics.name}</h3>
                    <p className="font-body text-[10px] text-white/50 font-bold tracking-wider uppercase mb-4">{basics.label}</p>
                    <span className="inline-block self-center sm:self-start bg-accent/10 border border-accent/20 text-accent text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {basics.location.city} // INDONESIA
                    </span>
                  </div>
                </div>

                {/* Footer Stamp / Metadata */}
                <div className="border-t border-white/[0.05] p-6 bg-white/[0.01] shrink-0">
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/30 uppercase tracking-widest">
                    <span>SYS_VER: 2.6.0</span>
                    <span>AUTHORIZATION_GRANTED</span>
                  </div>
                </div>
              </div>
            </Magnetic>
          </div>

          {/* Bento Item 3: Skills List (Col Span 5) */}
          <div className="lg:col-span-5 glass-card p-8 rounded-2xl flex flex-col justify-between min-h-[350px]">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-accent font-display text-[10px] font-bold tracking-widest uppercase">
                <Award size={12} /> Tech Stack & Tools
              </div>
              <p className="font-display text-lg font-bold uppercase tracking-tight text-white/90">
                Spesialisasi Teknologi yang Dikuasai
              </p>
              
              <div className="space-y-4">
                {skills.slice(0, 3).map((group, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="font-display text-[9px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-accent rounded-full" />
                      {group.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.keywords.map((kw, kwIdx) => (
                        <span 
                          key={kwIdx}
                          className="px-2.5 py-1 bg-white/[0.02] border border-white/[0.06] rounded-md font-mono text-[9px] text-white/60 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all cursor-default"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Item 4: Education & Training (Col Span 7) */}
          <div className="lg:col-span-7 glass-card p-8 rounded-2xl flex flex-col justify-between min-h-[350px]">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-accent font-display text-[10px] font-bold tracking-widest uppercase">
                <BookOpen size={12} /> Education Background
              </div>
              <p className="font-display text-lg font-bold uppercase tracking-tight text-white/90">
                Pendidikan Akademik & Sertifikasi
              </p>

              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l border-white/10 space-y-2 group/edu">
                    <div className="absolute top-1 left-[-4.5px] w-2 h-2 bg-accent rounded-full group-hover/edu:scale-125 transition-transform" />
                    <div className="flex justify-between items-start gap-4 flex-wrap">
                      <div>
                        <h4 className="font-display text-sm font-bold text-white/95 uppercase leading-none">
                          {edu.institution}
                        </h4>
                        <p className="font-body text-xs text-white/50 mt-1.5">
                          {edu.area} ({edu.studyType})
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-white/[0.03] border border-white/[0.06] rounded-lg font-mono text-[9px] text-accent uppercase tracking-wider">
                        {edu.startDate.split("-")[0]} — {edu.endDate.split("-")[0]}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {edu.courses.map((course, cIdx) => (
                        <span 
                          key={cIdx}
                          className="text-[9px] font-body text-white/40 bg-white/[0.01] px-2 py-0.5 rounded border border-white/[0.02]"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
