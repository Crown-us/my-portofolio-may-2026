"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useSound } from "../hooks/useSound";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  setIsHovered: (value: boolean) => void;
}

const menuLinks = [
  { title: "WORKS", href: "#works" },
  { title: "ABOUT", href: "#about" },
  { title: "CONTACT", href: "#contact" },
  { title: "RESUME", href: "/resume" },
];

export default function MobileMenu({ isOpen, onClose, setIsHovered }: MobileMenuProps) {
  const { play: playHover } = useSound("/audio/hover.mp3");

  const menuVariants = {
    closed: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      y: "0%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const linkVariants = {
    initial: { y: 80, opacity: 0 },
    enter: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: 0.5 + i * 0.1,
      },
    }),
    exit: (i: number) => ({
      y: 80,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as const,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[100] bg-black text-white flex flex-col p-6 md:hidden"
        >
          <div className="flex justify-between items-center mb-24">
            <span className="font-display text-2xl font-extrabold tracking-tighter">KEVIN.</span>
            <button 
              onClick={onClose}
              className="w-12 h-12 border-2 border-white flex items-center justify-center rounded-full hover:bg-white hover:text-black transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-8">
            {menuLinks.map((link, i) => (
              <div key={link.title} className="overflow-hidden">
                <motion.div
                  custom={i}
                  variants={linkVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    onMouseEnter={() => {
                      setIsHovered(true);
                      playHover();
                    }}
                    onMouseLeave={() => setIsHovered(false)}
                    className="font-display text-6xl font-extrabold tracking-tighter hover:italic transition-all inline-block"
                  >
                    {link.title}
                  </Link>
                </motion.div>
              </div>
            ))}
          </nav>

          <div className="mt-auto pt-12 border-t border-white/20 flex flex-col gap-4">
            <div className="flex justify-between items-end">
               <div>
                  <p className="font-body text-[10px] font-bold uppercase opacity-40 tracking-widest mb-2">Socials</p>
                  <div className="flex gap-6 font-body text-xs font-bold uppercase">
                    <a href="#" className="hover:underline">IG</a>
                    <a href="#" className="hover:underline">TW</a>
                    <a href="#" className="hover:underline">GH</a>
                  </div>
               </div>
               <div className="text-right">
                  <p className="font-body text-[10px] font-bold uppercase opacity-40 tracking-widest mb-2">Availability</p>
                  <p className="font-display text-xl font-bold uppercase italic">Open for Work</p>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
