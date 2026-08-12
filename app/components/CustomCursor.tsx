"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../context/CursorContext";

export default function CustomCursor() {
  const { isHovered, cursorText } = useCursor();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] hidden md:block bg-[var(--accent)]"
        animate={{
          x: mousePos.x - 6,
          y: mousePos.y - 6,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 40, mass: 0.1 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden md:block border-2"
        animate={{
          x: mousePos.x - (isHovered ? 28 : 20),
          y: mousePos.y - (isHovered ? 28 : 20),
          width: isHovered ? 56 : 40,
          height: isHovered ? 56 : 40,
          borderColor: "var(--accent)",
          backgroundColor:
            isHovered && !cursorText ? "var(--accent-subtle)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.4 }}
      >
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              viewBox="0 0 100 100"
              className="w-24 h-24 absolute -inset-8"
            >
              <path
                id="cursorTextPath"
                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text fill="var(--accent)" fontSize="11" fontFamily="monospace" fontWeight="bold">
                <textPath href="#cursorTextPath" spacing="auto">
                  {cursorText} • {cursorText} • {cursorText} •
                </textPath>
              </text>
            </motion.svg>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
