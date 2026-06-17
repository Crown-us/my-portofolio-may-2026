"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "HELLO",
  "HALO",
  "SELAMAT DATANG",
  "BIENVENUE",
  "WELCOME",
  "WILLKOMMEN",
  "BIENVENIDOS",
  "BENVENUTO",
  "KEVIN.",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("portfolio-visited") === "true";
    if (hasVisited) {
      setIsComplete(true);
      setProgress(100);
      setIndex(words.length - 1);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            sessionStorage.setItem("portfolio-visited", "true");
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("portfolio-visited") === "true";
    if (hasVisited || index === words.length - 1) return;
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : index === words.length - 2 ? 800 : 200);
    return () => clearTimeout(timeout);
  }, [index]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }}
          className="fixed inset-0 z-[99999] bg-black text-white flex flex-col items-center justify-center"
        >
          <div className="relative h-[120px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={words[index]}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
                className="font-display text-5xl md:text-8xl font-extrabold tracking-tighter absolute"
              >
                {words[index]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <div className="absolute bottom-12 left-6 right-6 flex justify-between items-end">
            <div className="flex flex-col">
                <span className="font-body text-xs font-bold opacity-30 uppercase tracking-widest mb-2">Initializing</span>
                <div className="w-48 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_8px_rgba(204,255,0,0.8)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            <div className="font-display text-6xl md:text-9xl font-extrabold leading-none tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
              {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
