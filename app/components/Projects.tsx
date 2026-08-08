"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import Link from "next/link";
import { useSound } from "../hooks/useSound";

interface ProjectsProps {
  setIsHovered?: (value: boolean) => void;
  setCursorText?: (value: string) => void;
}

export default function Projects({ setIsHovered, setCursorText }: ProjectsProps) {
  const { play: playClick } = useSound("/audio/click.mp3");

  return (
    <section id="projects" className="py-24 md:py-32 bg-background text-foreground border-t border-foreground/15 relative overflow-hidden font-mono">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-12 mb-12 border-b border-foreground/15 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00] bg-black px-2 py-0.5 font-bold mb-3 inline-block">
              [01] SELECTED CASE STUDIES
            </span>
            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tighter uppercase text-foreground">
              PROJECTS &amp; SYSTEMS
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-foreground/60">
            TOTAL REPOS: <span className="font-bold text-foreground">0{projects.length}</span> / 2026 EDITION
          </div>
        </div>

        {/* Projects Editorial List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Link
              key={project.id}
              href={`/works/${project.slug}`}
              onClick={() => playClick()}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative border border-foreground/20 bg-foreground/[0.02] hover:bg-foreground/[0.05] hover:border-foreground/40 transition-all p-4 md:p-6 cursor-pointer flex flex-col justify-between h-full"
                onMouseEnter={() => {
                  if (setIsHovered) setIsHovered(true);
                  if (setCursorText) setCursorText("VIEW");
                }}
                onMouseLeave={() => {
                  if (setIsHovered) setIsHovered(false);
                  if (setCursorText) setCursorText("");
                }}
              >
                {/* Top Bar inside Card */}
                <div className="flex justify-between items-center pb-4 mb-4 border-b border-foreground/10 text-xs font-mono">
                  <span className="font-bold text-[#ccff00] bg-foreground text-background px-2 py-0.5">
                    [{String(idx + 1).padStart(2, "0")}]
                  </span>
                  <span className="text-foreground/60 uppercase">{project.category}</span>
                  <span className="text-foreground/40 font-bold">{project.year}</span>
                </div>

                {/* Thumbnail Image */}
                <div className="relative overflow-hidden mb-6 border border-foreground/10 aspect-[16/10]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-3 right-3 p-2 bg-foreground text-background font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-display text-2xl md:text-4xl font-extrabold uppercase text-foreground group-hover:text-[#ccff00] transition-colors leading-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-foreground/70 line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-foreground/10 text-[10px] font-mono">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 border border-foreground/20 text-foreground/80">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
