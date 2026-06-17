"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { useSound } from "../hooks/useSound";

interface ProjectsProps {
  setIsHovered: (value: boolean) => void;
  setCursorText: (value: string) => void;
}

export default function Projects({ setIsHovered, setCursorText }: ProjectsProps) {
  const { play: playClick } = useSound("/audio/click.mp3");

  return (
    <section id="works" className="py-24 md:py-32 bg-[#080808] text-white border-t border-white/5 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="font-body text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block text-accent"
            >
              SELECTED CASE STUDIES
            </motion.span>
            <h2 className="font-display text-5xl md:text-8xl font-extrabold tracking-tighter leading-none uppercase">
              WORKS
            </h2>
          </div>
          <span className="font-display text-2xl font-bold text-white/30">(0{projects.length})</span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <Link
              key={project.id}
              href={`/works/${project.slug}`}
              onClick={() => playClick()}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group glass-card rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => {
                  setIsHovered(true);
                  setCursorText("VIEW CASE");
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  setCursorText("");
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[16/10]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Hover badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-accent group-hover:border-accent group-hover:text-black duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                  {/* Year badge */}
                  <div className="absolute bottom-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg font-mono text-[9px] text-white/60 uppercase tracking-wider">
                    {project.year}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex justify-between items-center">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tighter text-white/90 group-hover:text-white transition-colors uppercase">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-white/40 mt-1.5 uppercase font-bold tracking-widest">
                      {project.category}
                    </p>
                  </div>
                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 justify-end max-w-[160px]">
                    {project.tech.slice(0, 2).map((t) => (
                      <span key={t} className="px-2 py-0.5 border border-white/[0.06] rounded font-mono text-[8px] text-white/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
