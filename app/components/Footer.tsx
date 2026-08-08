"use client";

import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  setIsHovered?: (value: boolean) => void;
}

export default function Footer({ setIsHovered }: FooterProps) {
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/kepsssz?igsh=dzVtdTF5Y3F5NjQ1" },
    { label: "Twitter / X", href: "https://x.com/bu_kanan" },
    { label: "Dribbble", href: "https://dribbble.com/kevindw" },
    { label: "Behance", href: "https://www.behance.net/kevinwijaya7" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kevin-dwi-wijaya-95aa812b4" },
    { label: "Github", href: "https://github.com/Crown-us" },
  ];

  return (
    <>
      {/* Editorial Marquee Strip */}
      <section className="bg-[#ccff00] text-black py-4 overflow-hidden relative border-y border-black font-mono font-bold select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="font-display text-[8vw] md:text-[5vw] font-extrabold px-6 leading-none uppercase tracking-tighter">
                CODE-DRIVEN DESIGN STUDIO
              </span>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-black rounded-full mx-4 flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 text-[#ccff00]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial Monospace Footer */}
      <footer className="px-6 py-16 bg-background text-foreground border-t border-foreground/15 font-mono select-none">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Brand / Studio Info */}
            <div className="md:col-span-6 space-y-4">
              <h2 className="font-display text-3xl md:text-5xl font-extrabold uppercase tracking-tighter">
                KD / STUDIO
              </h2>
              <p className="text-xs text-foreground/70 max-w-sm leading-relaxed">
                Fullstack Engineering &amp; Avant-Garde Typography Systems. Based in Jakarta, Indonesia. Operating Worldwide.
              </p>
              <div className="pt-2 text-xs">
                <span className="text-foreground/50">DIRECT EMAIL: </span>
                <a href="mailto:wijaya.kevinn@gmail.com" className="font-bold underline hover:text-[#ccff00] transition-colors">
                  wijaya.kevinn@gmail.com
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <p className="font-bold uppercase tracking-wider text-[#ccff00] bg-black px-2 py-0.5 w-fit">
                NAVIGATION
              </p>
              <ul className="space-y-2">
                {[
                  { label: "PROJECTS", href: "#projects" },
                  { label: "ABOUT", href: "#about" },
                  { label: "CONTACT", href: "#contact" },
                  { label: "RESUME [PDF]", href: "/resume" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground hover:underline transition-colors"
                      onMouseEnter={() => setIsHovered && setIsHovered(true)}
                      onMouseLeave={() => setIsHovered && setIsHovered(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Channels */}
            <div className="md:col-span-3 space-y-3 text-xs">
              <p className="font-bold uppercase tracking-wider text-[#ccff00] bg-black px-2 py-0.5 w-fit">
                CHANNELS
              </p>
              <ul className="space-y-2">
                {socials.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-foreground flex items-center justify-between group transition-colors"
                      onMouseEnter={() => setIsHovered && setIsHovered(true)}
                      onMouseLeave={() => setIsHovered && setIsHovered(false)}
                    >
                      <span>{label}</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-foreground/15 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-foreground/50 gap-4">
            <p>© 2026 KEVIN DWI WIJAYA. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
              <span>DESIGNED &amp; CODED IN JAKARTA, ID</span>
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
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </>
  );
}
