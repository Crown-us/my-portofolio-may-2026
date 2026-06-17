"use client";

import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  setIsHovered: (value: boolean) => void;
}

export default function Footer({ setIsHovered }: FooterProps) {
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/kepsssz?igsh=dzVtdTF5Y3F5NjQ1" },
    { label: "Twitter", href: "https://x.com/bu_kanan" },
    { label: "Dribbble", href: "https://dribbble.com/kevindw" },
    { label: "Behance", href: "https://www.behance.net/kevinwijaya7" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kevin-dwi-wijaya-95aa812b4" },
    { label: "Github", href: "https://github.com/Crown-us" },
  ];

  return (
    <>
      {/* Marquee Strip */}
      <section className="bg-accent py-5 overflow-hidden relative border-y border-accent/20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="font-display text-[10vw] md:text-[6vw] font-extrabold px-6 leading-none uppercase tracking-tighter text-black">
                LET&apos;S WORK TOGETHER
              </span>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full mx-4 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-accent" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Footer */}
      <footer className="px-6 py-16 bg-[#040404] text-white border-t border-white/[0.04]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            {/* Brand column */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h2 className="font-display text-4xl font-extrabold tracking-tighter uppercase">KEVIN.</h2>
                <p className="font-body text-sm text-white/40 mt-3 leading-relaxed max-w-xs">
                  Creative Developer & UI/UX enthusiast based in Kediri, Indonesia. Building bold digital experiences.
                </p>
              </div>
              <a
                href="mailto:wijaya.kevinn@gmail.com"
                className="inline-flex items-center gap-2 font-body text-sm text-white/60 hover:text-accent transition-colors group"
              >
                wijaya.kevinn@gmail.com
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Spacer */}
            <div className="md:col-span-2" />

            {/* Nav column */}
            <div className="md:col-span-2 space-y-4">
              <p className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">Navigation</p>
              <ul className="space-y-3">
                {["Works", "About", "Contact", "Resume"].map((item) => (
                  <li key={item}>
                    <a
                      href={item === "Resume" ? "/resume" : `#${item.toLowerCase()}`}
                      className="font-body text-sm text-white/50 hover:text-white transition-colors"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social column */}
            <div className="md:col-span-3 space-y-4">
              <p className="font-display text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">Socials</p>
              <ul className="space-y-3">
                {socials.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-sm text-white/50 hover:text-accent transition-colors flex items-center gap-1.5 group"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      {label}
                      <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.05] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
              © 2026 Kevin Creative Studio · Indonesia
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                Available for hire
              </p>
            </div>
          </div>
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
