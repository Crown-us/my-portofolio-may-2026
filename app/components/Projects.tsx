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
    <section id="works" className="px-6 py-24 bg-background text-foreground">
      <div className="flex justify-between items-end mb-24">
        <div>
          <span className="font-body text-xs font-bold uppercase tracking-widest mb-4 block opacity-50">Selected Case Studies</span>
          <h2 className="font-display text-6xl md:text-9xl font-extrabold tracking-tighter leading-none">WORKS</h2>
        </div>
        <span className="font-display text-2xl font-bold">(0{projects.length})</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
        {projects.map((project, idx) => (
          <Link 
            key={project.id}
            href={`/works/${project.slug}`}
            onClick={() => playClick()}
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onMouseEnter={() => {
                setIsHovered(true);
                setCursorText("VIEW CASE");
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setCursorText("");
              }}
            >
              <div className="aspect-[16/10] overflow-hidden border-2 border-foreground relative mb-8">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {/* Badge hidden in favor of cursor text */}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-display text-4xl font-extrabold mb-2">{project.title}</h3>
                  <p className="font-body text-sm font-bold opacity-50 tracking-widest uppercase">{project.category}</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-[1px] bg-foreground opacity-20" />
                   <span className="font-display text-xl">0{project.id}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
