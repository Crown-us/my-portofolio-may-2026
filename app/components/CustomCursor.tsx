"use client";

import { motion } from "framer-motion";

interface CustomCursorProps {
  mousePos: { x: number; y: number };
  isHovered: boolean;
  activeText?: string;
}

export default function CustomCursor({ mousePos, isHovered, activeText }: CustomCursorProps) {
  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          scale: isHovered ? 4 : 1,
          backgroundColor: isHovered ? "var(--accent)" : "var(--foreground)",
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.2 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-12 h-12 border border-foreground rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          scale: isHovered ? (activeText ? 2.5 : 1.5) : 1,
          opacity: isHovered ? (activeText ? 1 : 0) : 1,
          borderColor: isHovered ? "var(--accent)" : "var(--foreground)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
      >
        {activeText && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
             <motion.svg 
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               viewBox="0 0 100 100" 
               className="w-24 h-24"
             >
                <path id="cursorTextPath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                <text className="font-display text-[10px] font-bold uppercase fill-accent">
                  <textPath href="#cursorTextPath" spacing="auto">
                    {activeText} • {activeText} • {activeText} •
                  </textPath>
                </text>
             </motion.svg>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
