"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "01",
    title: "WEB DEVELOPMENT",
    desc: "Membangun website modern, responsif, dan cepat menggunakan Next.js, React, dan Tailwind CSS dengan pendekatan component-driven.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"]
  },
  {
    num: "02",
    title: "MOBILE DEVELOPMENT",
    desc: "Mengembangkan aplikasi mobile cross-platform dengan Flutter dan Dart, mengintegrasikan REST API dan Firebase untuk pengalaman native.",
    tags: ["Flutter", "Dart", "Firebase", "REST API"]
  },
  {
    num: "03",
    title: "UI/UX DESIGN",
    desc: "Merancang antarmuka yang intuitif dan menarik secara visual menggunakan Figma, dari wireframe hingga design system lengkap.",
    tags: ["Figma", "Prototyping", "Design System"]
  },
  {
    num: "04",
    title: "BACKEND & API",
    desc: "Membangun backend skalabel dengan Laravel dan mengintegrasikan database MySQL/PostgreSQL untuk performa tinggi.",
    tags: ["Laravel", "MySQL", "REST API", "Supabase"]
  },
  {
    num: "05",
    title: "BRAND IDENTITY",
    desc: "Membantu brand membangun identitas visual yang kuat dan konsisten, dari logo hingga panduan gaya visual lengkap.",
    tags: ["Logo Design", "Visual Identity", "Art Direction"]
  },
];

interface ServicesProps {
  setIsHovered: (value: boolean) => void;
}

export default function Services({ setIsHovered }: ServicesProps) {
  return (
    <section className="py-24 md:py-32 bg-[#060606] text-white overflow-hidden border-t border-white/5 relative">
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-body text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block text-accent"
            >
              WHAT I DO
            </motion.span>
            <h2 className="font-display text-5xl sm:text-7xl font-extrabold tracking-tighter leading-[0.95] uppercase">
              SERVICES &<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-accent">CAPABILITIES</span>
            </h2>
          </div>
          <p className="font-body text-sm text-white/50 max-w-xs leading-relaxed md:text-right">
            Solusi digital end-to-end — dari desain UI sampai deployment production.
          </p>
        </div>

        {/* Services List */}
        <div className="divide-y divide-white/[0.06]">
          {services.map((service, idx) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="group grid grid-cols-12 items-center gap-4 py-7 md:py-9 cursor-pointer hover:bg-white/[0.015] transition-colors px-4 -mx-4 rounded-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Number */}
              <span className="col-span-1 font-mono text-[10px] text-white/20 font-bold tracking-widest">
                {service.num}
              </span>

              {/* Title */}
              <h3 className="col-span-11 md:col-span-3 font-display text-xl md:text-2xl font-extrabold tracking-tighter text-white/80 group-hover:text-white transition-colors uppercase leading-tight">
                {service.title}
              </h3>

              {/* Desc — hidden on mobile, shown from md */}
              <p className="hidden md:block col-span-4 font-body text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                {service.desc}
              </p>

              {/* Tags */}
              <div className="hidden md:flex col-span-3 flex-wrap gap-1.5 justify-end">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 border border-white/[0.06] rounded-md font-mono text-[9px] text-white/40 group-hover:border-accent/30 group-hover:text-accent/80 transition-all whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="hidden md:flex col-span-1 justify-end">
                <div className="w-9 h-9 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:border-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                  <ArrowUpRight size={15} />
                </div>
              </div>

              {/* Mobile: desc + tags below title */}
              <div className="col-span-11 md:hidden col-start-2 space-y-3">
                <p className="font-body text-xs text-white/40 leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-white/[0.06] rounded font-mono text-[9px] text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
