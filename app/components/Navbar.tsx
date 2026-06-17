"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSound } from "../hooks/useSound";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  setIsHovered: (value: boolean) => void;
}

export default function Navbar({ setIsHovered }: NavbarProps) {
  const { play: playHover } = useSound("/audio/hover.mp3");
  const { play: playClick } = useSound("/audio/click.mp3");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`px-6 py-4 flex justify-between items-center sticky top-0 z-[60] transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}>
        {/* Logo + Status */}
        <div className="flex items-center gap-8">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-2xl font-extrabold tracking-tighter text-white"
            onMouseEnter={() => { setIsHovered(true); playHover(); }}
            onMouseLeave={() => setIsHovered(false)}
          >
            KEVIN.
          </motion.span>
          <div className="hidden md:flex items-center gap-2 font-body text-[9px] font-bold tracking-[0.2em] uppercase text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>BASED IN INDONESIA</span>
            <span className="mx-1 opacity-40">·</span>
            <span>AVAILABLE FOR WORK</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10 font-body text-xs font-bold tracking-widest uppercase">
          {["WORKS", "ABOUT", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group overflow-hidden py-2 text-white/50 hover:text-white transition-colors"
              onClick={() => playClick()}
              onMouseEnter={() => { setIsHovered(true); playHover(); }}
              onMouseLeave={() => setIsHovered(false)}
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Link
            href="/resume"
            onClick={() => playClick()}
            onMouseEnter={() => { setIsHovered(true); playHover(); }}
            onMouseLeave={() => setIsHovered(false)}
            className="px-5 py-2 bg-white/[0.06] border border-white/[0.08] rounded-xl text-white text-[10px] font-bold tracking-[0.2em] hover:bg-accent hover:border-accent hover:text-black transition-all inline-block"
          >
            RESUME
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden font-bold text-xs tracking-[0.2em] border border-white/20 px-4 py-2 rounded-xl hover:bg-white/10 transition-all text-white"
        >
          MENU
        </button>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        setIsHovered={setIsHovered}
      />
    </>
  );
}
