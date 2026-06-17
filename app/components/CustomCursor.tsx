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
      {/* Inner dot — always visible neon accent */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden md:block bg-accent"
        style={{ boxShadow: "0 0 8px rgba(204,255,0,0.8)" }}
        animate={{
          x: mousePos.x - 6,
          y: mousePos.y - 6,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 40, mass: 0.1 }}
      />

      {/* Outer ring — expands on hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block border-2 border-accent"
        style={{ boxShadow: "0 0 12px rgba(204,255,0,0.25)" }}
        animate={{
          x: mousePos.x - (isHovered ? 28 : 20),
          y: mousePos.y - (isHovered ? 28 : 20),
          width:  isHovered ? 56 : 40,
          height: isHovered ? 56 : 40,
          opacity: 1,
          borderColor: isHovered ? "var(--accent)" : "rgba(204,255,0,0.5)",
          backgroundColor: isHovered && !activeText ? "rgba(204,255,0,0.08)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.4 }}
      >
        {/* Circular text label on project hover */}
        {activeText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              viewBox="0 0 100 100"
              className="w-24 h-24 absolute -inset-8"
            >
              <path id="cursorTextPath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="font-display text-[11px] font-black uppercase" fill="rgba(204,255,0,1)">
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
