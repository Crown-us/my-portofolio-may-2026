"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useSound } from "../hooks/useSound";

interface HeroProps {
  setIsHovered: (value: boolean) => void;
}

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Built" },
  { value: "3", label: "Tech Stacks" },
];

export default function Hero({ setIsHovered }: HeroProps) {
  const { play: playHover } = useSound("/audio/hover.mp3");

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-[#060606] text-white overflow-hidden border-b border-white/5">

      {/* Background Glowing Mesh */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 pt-24 pb-32">

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.04] rounded-full font-body text-[10px] font-bold tracking-[0.25em] uppercase mb-10"
        >
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          Available for Work · Kediri, Indonesia
        </motion.div>

        {/* Heading */}
        <div className="max-w-5xl mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold tracking-tighter leading-[0.9] uppercase"
          >
            <span className="block text-[clamp(3.5rem,9vw,8rem)] text-white">
              CREATIVE
            </span>
            <span className="block text-[clamp(3.5rem,9vw,8rem)] text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-accent">
              DEVELOPER
            </span>
            <span className="block text-[clamp(3rem,7vw,6.5rem)] italic text-white/30">
              &amp; UI/UX DESIGNER
            </span>
          </motion.h1>
        </div>

        {/* Bottom row: desc + CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10"
        >
          {/* Description */}
          <p className="font-body text-base md:text-lg text-white/50 leading-relaxed max-w-lg">
            Saya membangun website dan aplikasi mobile dengan desain premium,
            responsif, dan interaksi yang menyeimbangkan keindahan visual
            serta performa tinggi — menggunakan{" "}
            <span className="text-white/80 font-semibold">Flutter</span>,{" "}
            <span className="text-white/80 font-semibold">Next.js</span>, dan{" "}
            <span className="text-white/80 font-semibold">Laravel</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 shrink-0">
            <Magnetic>
              <a
                href="#contact"
                className="bg-accent text-black px-7 py-4 font-display font-black text-sm tracking-wider hover:brightness-110 transition-all rounded-xl inline-flex items-center gap-2 cursor-pointer"
                onMouseEnter={() => { setIsHovered(true); playHover(); }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                MULAI PROYEK <ArrowRight size={15} />
              </a>
            </Magnetic>
            <Magnetic>
              <Link
                href="/resume"
                className="bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 text-white px-7 py-4 font-display font-black text-sm tracking-wider transition-all rounded-xl inline-block"
                onMouseEnter={() => { setIsHovered(true); playHover(); }}
                onMouseLeave={() => setIsHovered(false)}
              >
                LIHAT CV
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-px mt-16 border border-white/[0.06] rounded-2xl overflow-hidden w-fit"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="px-8 py-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-r border-white/[0.06] last:border-r-0 flex flex-col gap-1"
            >
              <span className="font-display text-2xl md:text-3xl font-black text-accent tracking-tighter">
                {stat.value}
              </span>
              <span className="font-body text-[10px] text-white/40 uppercase tracking-widest font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3 text-white/30">
        <span className="font-body text-[9px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownRight size={16} />
        </motion.div>
      </div>

      <style jsx>{`
        .bg-accent\\/8 { background-color: rgba(204, 255, 0, 0.08); }
        .bg-purple-600\\/8 { background-color: rgba(147, 51, 234, 0.08); }
      `}</style>
    </section>
  );
}
