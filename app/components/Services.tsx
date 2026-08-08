"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    num: "01",
    title: "WEB ENGINEERING",
    desc: "Building high-performance web apps & design systems using Next.js 16, React, & Tailwind CSS with component-driven architecture.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind"]
  },
  {
    num: "02",
    title: "MOBILE APP DEVELOPMENT",
    desc: "Developing cross-platform native iOS & Android applications with Flutter & Dart, integrated REST APIs & Supabase/Firebase.",
    tags: ["Flutter", "Dart", "Firebase", "REST API"]
  },
  {
    num: "03",
    title: "COMPUTATIONAL UI/UX",
    desc: "Architecting minimalist, high-impact user interfaces in Figma, establishing design tokens, micro-interactions, & wireframes.",
    tags: ["Figma", "Design Systems", "Prototyping"]
  },
  {
    num: "04",
    title: "BACKEND & API ARCHITECTURE",
    desc: "Engineering scalable backend systems & APIs with Laravel & Node.js, backed by PostgreSQL/MySQL databases.",
    tags: ["Laravel", "Node.js", "PostgreSQL", "REST API"]
  },
  {
    num: "05",
    title: "BRAND & DIGITAL IDENTITY",
    desc: "Crafting bold brand identity, visual style guides, and editorial typography guidelines for modern digital products.",
    tags: ["Visual Identity", "Typography", "Art Direction"]
  },
];

interface ServicesProps {
  setIsHovered?: (value: boolean) => void;
}

export default function Services({ setIsHovered }: ServicesProps) {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground border-t border-foreground/15 relative font-mono select-none">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-12 mb-12 border-b border-foreground/15 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00] bg-black px-2 py-0.5 font-bold mb-3 inline-block">
              [04] CAPABILITIES &amp; SERVICES
            </span>
            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tighter uppercase text-foreground">
              WHAT I BUILD
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-foreground/60">
            SOLUTIONS: <span className="font-bold text-foreground">END-TO-END DEVELOPMENT</span>
          </div>
        </div>

        {/* Services List */}
        <div className="divide-y divide-foreground/15">
          {services.map((service, idx) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group grid grid-cols-12 items-center gap-4 py-6 md:py-8 cursor-pointer hover:bg-foreground/[0.03] transition-colors px-2 -mx-2"
              onMouseEnter={() => setIsHovered && setIsHovered(true)}
              onMouseLeave={() => setIsHovered && setIsHovered(false)}
            >
              {/* Number */}
              <span className="col-span-1 font-bold text-xs text-[#ccff00] bg-foreground px-2 py-0.5 w-fit">
                [{service.num}]
              </span>

              {/* Title */}
              <h3 className="col-span-11 md:col-span-4 font-display text-xl md:text-3xl font-extrabold uppercase leading-none group-hover:text-[#ccff00] transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="hidden md:block col-span-4 text-xs text-foreground/70 leading-relaxed">
                {service.desc}
              </p>

              {/* Tags */}
              <div className="hidden md:flex col-span-3 flex-wrap gap-1.5 justify-end">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 border border-foreground/20 text-[10px] text-foreground/80 group-hover:border-foreground transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mobile Desc & Tags */}
              <div className="col-span-11 md:hidden col-start-2 space-y-2 pt-2 text-xs">
                <p className="text-foreground/70">{service.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 border border-foreground/20 text-[10px]">
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
