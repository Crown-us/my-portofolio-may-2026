"use client";

import { motion } from "framer-motion";
import { MoveDown } from "lucide-react";
import Link from "next/link";
import Magnetic from "./Magnetic";
import { useSound } from "../hooks/useSound";

interface HeroProps {
  setIsHovered: (value: boolean) => void;
}

export default function Hero({ setIsHovered }: HeroProps) {
  const { play: playHover } = useSound("/audio/hover.mp3");

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b-2 border-foreground grid-background bg-background">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 border border-foreground/10 bg-foreground/5 rounded-full font-body text-[10px] font-bold tracking-[0.3em] uppercase mb-8 text-foreground"
          >
            Crafting Digital Excellence
          </motion.div>
          
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="font-display text-[clamp(3.5rem,15vw,12rem)] leading-[0.8] font-extrabold tracking-tighter mb-12 relative glitch-text text-foreground hover-weight cursor-default"
            data-text="CREATIVE DEVELOPER"
          >
            CREATIVE <br /> 
            <span className="italic text-glitch" data-text="DEVELOPER">DEVELOPER</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <p className="font-body text-xl md:text-2xl leading-tight mb-12 opacity-80 text-foreground">
              SAYA MEMBANGUN PENGALAMAN DIGITAL YANG <span className="font-bold underline decoration-accent decoration-4 underline-offset-4">BERANI</span> DAN EKSPERIMENTAL DENGAN SENTUHAN BRUTALISME MODERN.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Magnetic>
                <a 
                  href="#contact"
                  className="bg-foreground text-background px-10 py-5 font-display font-bold text-lg border-2 border-foreground hover:bg-background hover:text-foreground transition-all brutalist-shadow text-center inline-block"
                  onMouseEnter={() => {
                    setIsHovered(true);
                    playHover();
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  MULAI PROYEK
                </a>
              </Magnetic>
              <Magnetic>
                <Link 
                  href="/resume"
                  className="bg-background text-foreground px-10 py-5 font-display font-bold text-lg border-2 border-foreground hover:bg-foreground hover:text-background transition-all text-center inline-block"
                  onMouseEnter={() => {
                    setIsHovered(true);
                    playHover();
                  }}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  LIHAT CV
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-6 flex justify-between items-end">
        <div className="flex flex-col gap-1 text-foreground">
          <span className="font-body text-[10px] font-bold opacity-40 uppercase tracking-widest">Local Time</span>
          <span className="font-display text-xl font-bold uppercase">JAKARTA / {new Date().getHours()}:{new Date().getMinutes()}</span>
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-4 text-foreground"
        >
          <span className="font-body text-[10px] font-bold uppercase tracking-widest vertical-text">Scroll</span>
          <div className="w-[2px] h-12 bg-foreground/20 relative overflow-hidden">
             <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-foreground" 
             />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
}
