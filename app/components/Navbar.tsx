"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSound } from "../hooks/useSound";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  setIsHovered?: (value: boolean) => void;
}

export default function Navbar({ setIsHovered }: NavbarProps) {
  const { play: playHover } = useSound("/audio/hover.mp3");
  const { play: playClick } = useSound("/audio/click.mp3");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Live Location Clocks
  const [jktTime, setJktTime] = useState("");
  const [amsTime, setAmsTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    const updateClocks = () => {
      const now = new Date();
      // Jakarta Time (UTC+7)
      const jktStr = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit" });
      // Amsterdam Time (UTC+1/2)
      const amsStr = now.toLocaleTimeString("en-GB", { timeZone: "Europe/Amsterdam", hour: "2-digit", minute: "2-digit" });

      setJktTime(jktStr.replace(":", " "));
      setAmsTime(amsStr.replace(":", " "));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <nav
        className={`px-6 py-4 flex justify-between items-center sticky top-0 z-[60] font-mono text-xs uppercase tracking-tight transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md border-b border-foreground/10 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Top Left Logo / Studio Code (matching 2xA / STUDIO in reference image) */}
        <div className="flex items-center gap-6">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-extrabold text-sm tracking-tight text-foreground hover:opacity-70 transition-opacity"
            onMouseEnter={() => {
              if (setIsHovered) setIsHovered(true);
              playHover();
            }}
            onMouseLeave={() => setIsHovered && setIsHovered(false)}
          >
            KD / STUDIO
          </motion.a>

          {/* Live Location Clocks matching ATH(GR) 14 17  AMS(NL) 13 17 */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-mono text-foreground/60 select-none">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping" />
              <span>JKT(ID)</span>
              <span className="font-bold text-foreground">{jktTime || "04 00"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>AMS(NL)</span>
              <span className="font-bold text-foreground">{amsTime || "22 00"}</span>
            </div>
          </div>
        </div>

        {/* Top Right Monospace Nav Links (ABOUT, PROJECTS, CONTACT) */}
        <div className="hidden md:flex items-center gap-8 font-mono text-xs font-semibold tracking-wider">
          {[
            { label: "ABOUT", href: "#about" },
            { label: "PROJECTS", href: "#projects" },
            { label: "CONTACT", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative group py-1 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => playClick()}
              onMouseEnter={() => {
                if (setIsHovered) setIsHovered(true);
                playHover();
              }}
              onMouseLeave={() => setIsHovered && setIsHovered(false)}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-foreground group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Link
            href="/resume"
            onClick={() => playClick()}
            onMouseEnter={() => {
              if (setIsHovered) setIsHovered(true);
              playHover();
            }}
            onMouseLeave={() => setIsHovered && setIsHovered(false)}
            className="px-3.5 py-1.5 border border-foreground/30 hover:border-foreground rounded-none text-[11px] font-mono tracking-wider text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            [RESUME]
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden font-mono font-bold text-xs tracking-wider border border-foreground/30 px-3 py-1.5 rounded-none text-foreground hover:bg-foreground hover:text-background transition-all"
        >
          [MENU]
        </button>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        setIsHovered={setIsHovered || (() => {})}
      />
    </>
  );
}
