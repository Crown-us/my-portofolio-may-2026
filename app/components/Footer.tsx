"use client";

import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  setIsHovered: (value: boolean) => void;
}

export default function Footer({ setIsHovered }: FooterProps) {
  return (
    <>
      {/* Marquee Footer */}
      <section className="bg-foreground text-background py-6 md:py-8 border-y-2 border-foreground overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee py-2 md:py-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="font-display text-[12vw] md:text-[8vw] font-extrabold px-4 md:px-8 leading-none uppercase tracking-tighter">
                LET'S WORK TOGETHER
              </span>
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-background rounded-full mx-2 md:mx-4 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 text-foreground" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Footer */}
      <footer className="px-6 py-12 flex flex-col items-center border-t-2 border-foreground bg-background text-foreground">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <div className="max-w-md">
            <h4 className="font-display text-4xl font-extrabold mb-8 tracking-tighter uppercase">Say Hello.</h4>
            <p className="font-body text-xl mb-8 opacity-80">Tersedia untuk proyek baru, kolaborasi, atau sekedar menyapa.</p>
            <a href="mailto:wijaya.kevinn@gmail.com" className="font-display text-2xl md:text-4xl font-bold border-b-4 border-foreground hover:bg-foreground hover:text-background transition-all px-2 italic">wijaya.kevinn@gmail.com</a>
          </div>
          <div className="grid grid-cols-2 gap-x-16 gap-y-4 font-body font-bold uppercase tracking-widest text-xs">
            <a href="https://www.instagram.com/kepsssz?igsh=dzVtdTF5Y3F5NjQ1" target="_blank" rel="noopener noreferrer" className="hover:line-through" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Instagram</a>
            <a href="https://x.com/bu_kanan" target="_blank" rel="noopener noreferrer" className="hover:line-through" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Twitter</a>
            <a href="https://dribbble.com/kevindw" target="_blank" rel="noopener noreferrer" className="hover:line-through" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Dribbble</a>
            <a href="https://www.behance.net/kevinwijaya7" target="_blank" rel="noopener noreferrer" className="hover:line-through" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Behance</a>
            <a href="https://www.linkedin.com/in/kevin-dwi-wijaya-95aa812b4" target="_blank" rel="noopener noreferrer" className="hover:line-through" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>LinkedIn</a>
            <a href="https://github.com/Crown-us" target="_blank" rel="noopener noreferrer" className="hover:line-through" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>Github</a>
          </div>
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between items-center border-t border-foreground/10 pt-8 opacity-40">
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em]">© 2026 KEVIN CREATIVE STUDIO • INDONESIA</p>
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em]">ALL RIGHTS RESERVED</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
}
