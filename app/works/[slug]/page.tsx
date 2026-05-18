"use client";

import { projects } from "@/lib/projects";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Globe, Layout, Cpu, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CustomCursor from "@/app/components/CustomCursor";
import { useState, useEffect } from "react";

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center font-display text-4xl bg-background text-foreground">
        PROJECT NOT FOUND.
      </div>
    );
  }

  return (
    <main className="min-h-screen selection:bg-foreground selection:text-background cursor-none grid-background transition-colors duration-300 bg-background text-foreground">
      <CustomCursor mousePos={mousePos} isHovered={isHovered} />
      <Navbar setIsHovered={setIsHovered} />

      <section className="px-6 pt-32 pb-24 container mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 font-body text-sm font-bold uppercase tracking-widest hover:line-through mb-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ArrowLeft size={16} /> BACK TO WORKS
        </Link>

        {/* Title Section */}
        <div className="mb-16">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-[clamp(3rem,10vw,10rem)] leading-[0.8] font-extrabold tracking-tighter uppercase mb-4"
          >
            {project.title}
          </motion.h1>
          <div className="flex gap-4">
            <span className="px-4 py-1 border border-foreground font-body text-xs font-bold uppercase">{project.category}</span>
            <span className="px-4 py-1 border border-foreground font-body text-xs font-bold uppercase">{project.year}</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Main Visual Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-8 aspect-[16/9] border-2 border-foreground overflow-hidden relative group"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
            />
          </motion.div>

          {/* Quick Info Box */}
          <div className="md:col-span-4 grid grid-rows-2 gap-4">
             <div className="bg-foreground text-background p-8 flex flex-col justify-between border-2 border-foreground brutalist-shadow">
                <Layout className="opacity-20" size={40} />
                <div>
                  <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-60">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.services.map(s => (
                      <span key={s} className="font-display text-xl font-bold uppercase italic">{s}</span>
                    ))}
                  </div>
                </div>
             </div>
             <div className="bg-background p-8 flex flex-col justify-between border-2 border-foreground">
                <div className="flex justify-between items-start">
                  <Cpu className="opacity-20" size={40} />
                  <div className="w-10 h-10 border border-foreground flex items-center justify-center rotate-45">
                    <div className="w-2 h-2 bg-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-60">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-foreground text-background font-body text-[10px] font-bold uppercase">{t}</span>
                    ))}
                  </div>
                </div>
             </div>
          </div>

          {/* Detailed Overview Box */}
          <div className="md:col-span-6 bg-background border-2 border-foreground p-12">
             <h2 className="font-display text-2xl font-bold uppercase mb-8 border-b-2 border-foreground pb-4 inline-block">The Challenge</h2>
             <p className="font-body text-2xl md:text-3xl leading-[1.1] tracking-tight">
               {project.description}
             </p>
             <p className="font-body text-lg mt-8 opacity-60 leading-relaxed text-foreground/70">
               Setiap detail dipikirkan matang-matang untuk menghasilkan produk yang tidak hanya estetik secara brutalist, tetapi juga memiliki fondasi kode yang kokoh dan performa yang gahar.
             </p>
          </div>

          {/* Live Links Box */}
          <div className="md:col-span-3 bg-background border-2 border-foreground p-8 flex flex-col justify-center gap-6">
             <h3 className="font-body text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Direct Access</h3>
             <a 
                href={project.link} 
                target="_blank" 
                className="flex items-center justify-between group p-6 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="font-display text-2xl font-bold uppercase">LIVE SITE</span>
                <Globe size={24} className="group-hover:rotate-45 transition-transform" />
              </a>
              <a 
                href="#" 
                className="flex items-center justify-between group p-6 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="font-display text-2xl font-bold uppercase">REPOSITORY</span>
                <ExternalLink size={24} />
              </a>
          </div>

          {/* Secondary Stats Box */}
          <div className="md:col-span-3 border-2 border-foreground p-8 bg-foreground/5 flex flex-col justify-between">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-foreground/10 pb-4">
                  <Calendar size={20} className="opacity-40" />
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase opacity-40">Year</p>
                    <p className="font-display text-xl font-bold text-foreground">{project.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Tag size={20} className="opacity-40" />
                  <div>
                    <p className="font-body text-[10px] font-bold uppercase opacity-40">Role</p>
                    <p className="font-display text-xl font-bold uppercase italic text-foreground">Lead Dev</p>
                  </div>
                </div>
             </div>
             <div className="pt-8 text-[10px] font-bold opacity-30 uppercase tracking-[0.3em] text-foreground">
               Verified Project © 2026
             </div>
          </div>

        </div>
      </section>

      <Footer setIsHovered={setIsHovered} />
    </main>
  );
}
