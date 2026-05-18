"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSound } from "../hooks/useSound";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  setIsHovered: (value: boolean) => void;
}

export default function Navbar({ setIsHovered }: NavbarProps) {
  const { play: playHover } = useSound("/audio/hover.mp3");
  const { play: playClick } = useSound("/audio/click.mp3");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="px-6 py-4 flex justify-between items-center border-b-2 border-black sticky top-0 bg-white/80 backdrop-blur-md z-[60]">
        <div className="flex items-center gap-8">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display text-2xl font-extrabold tracking-tighter"
            onMouseEnter={() => {
              setIsHovered(true);
              playHover();
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            KEVIN.
          </motion.span>
          <div className="hidden md:flex space-x-8 font-body text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
             <span>BASED IN INDONESIA</span>
             <span className="w-1 h-1 bg-black rounded-full my-auto" />
             <span>AVAILABLE FOR WORK</span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-12 font-body text-xs font-bold tracking-widest uppercase">
          {["WORKS", "ABOUT", "CONTACT"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="relative group overflow-hidden py-2"
              onClick={() => playClick()}
              onMouseEnter={() => {
                setIsHovered(true);
                playHover();
              }}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-500">{item}</span>
              <span className="absolute top-0 left-0 block translate-y-full group-hover:translate-y-0 transition-transform duration-500 py-2">{item}</span>
            </a>
          ))}
          <button 
            onClick={() => playClick()}
            onMouseEnter={() => playHover()}
            className="bg-black text-white px-6 py-2 text-[10px] font-bold tracking-[0.2em] hover:bg-white hover:text-black border border-black transition-all"
          >
            RESUME
          </button>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden font-bold text-xs tracking-[0.2em] border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
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
