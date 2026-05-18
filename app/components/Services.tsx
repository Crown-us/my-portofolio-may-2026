"use client";

import { motion } from "framer-motion";

const services = [
  "WEB DEVELOPMENT",
  "UI/UX DESIGN",
  "BRAND IDENTITY",
  "MOTION GRAPHICS",
  "CREATIVE CODING",
];

interface ServicesProps {
  setIsHovered: (value: boolean) => void;
}

export default function Services({ setIsHovered }: ServicesProps) {
  return (
    <section className="py-16 md:py-24 border-b-2 border-foreground grid-background bg-background text-foreground overflow-hidden">
      <div className="px-6 mb-12 md:mb-16">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="inline-block px-3 py-1 border border-foreground bg-background font-body text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase mb-4"
          >
            Capabilities
          </motion.div>
        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] md:leading-none break-words uppercase">
          SOLUTIONS <br /> <span className="italic">PROVIDED</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t-2 border-foreground bg-foreground gap-[2px]">
        {services.map((service, idx) => (
          <motion.div 
            key={service}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="group bg-background p-8 md:p-12 flex flex-col justify-between min-h-[280px] md:min-h-[350px] hover:bg-foreground hover:text-background transition-colors duration-500 cursor-pointer overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex justify-between items-start">
              <span className="font-display text-xs md:text-sm font-bold opacity-20 group-hover:opacity-40 tracking-widest">0{idx + 1}</span>
              <div className="w-8 h-8 md:w-12 md:h-12 border border-foreground group-hover:border-background flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-500 shrink-0">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground group-hover:bg-background" />
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              <h3 className="font-display text-2xl md:text-4xl font-extrabold mb-4 tracking-tighter leading-none uppercase">{service}</h3>
              <p className="font-body text-xs md:text-sm opacity-60 leading-relaxed max-w-[200px] md:max-w-[250px]">
                Membangun fondasi digital yang kuat dengan fokus pada performa dan skalabilitas tinggi.
              </p>
            </div>
            <div className="flex items-center gap-2 font-body text-[8px] md:text-[10px] font-bold tracking-widest uppercase mt-6 md:mt-8 overflow-hidden">
               <span className="block group-hover:translate-x-0 -translate-x-full transition-transform duration-300">Learn More</span>
               <div className="h-[1px] flex-1 bg-foreground/10 group-hover:bg-background/20" />
            </div>
          </motion.div>
        ))}
        <div className="hidden lg:flex bg-background p-12 flex-col justify-center items-center text-center border-l-[2px] border-foreground border-opacity-10">
           <div className="w-20 h-20 rounded-full border-2 border-foreground border-dashed animate-spin-slow flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-foreground rotate-45" />
           </div>
           <p className="font-display text-xl font-bold tracking-tighter uppercase">ANY CUSTOM <br /> REQUEST?</p>
        </div>
      </div>
    </section>
  );
}
