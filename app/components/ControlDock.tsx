"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Volume2, VolumeX, Terminal, ExternalLink } from "lucide-react";
import { useSound } from "../hooks/useSound";

export default function ControlDock() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { play: playClick } = useSound("/audio/click.mp3");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAction = (tabName: string) => {
    if (soundEnabled) playClick();
    setActiveTab(activeTab === tabName ? null : tabName);
  };

  return (
    <>
      {/* Floating Bottom Dock (matching the reference UI bar) */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-1.5 p-1.5 rounded-xl bg-[#1c1c1e]/90 text-white backdrop-blur-md border border-white/10 shadow-2xl font-mono text-xs select-none max-w-[92vw] overflow-x-auto scrollbar-none"
      >
        {/* Brand Icon / Logo Badge */}
        <button
          onClick={() => handleAction("creator")}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-bold flex items-center gap-1.5"
          title="Creator Specs"
        >
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
          <span>w.</span>
        </button>

        {/* Creator Info Tab */}
        <button
          onClick={() => handleAction("creator")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === "creator"
              ? "bg-[#ccff00] text-black font-semibold shadow"
              : "hover:bg-white/10 text-white/80"
          }`}
        >
          Creator
        </button>

        {/* Font & Color Specs */}
        <button
          onClick={() => handleAction("specs")}
          className={`px-3 py-1.5 rounded-lg transition-all hidden sm:block ${
            activeTab === "specs"
              ? "bg-[#ccff00] text-black font-semibold shadow"
              : "hover:bg-white/10 text-white/80"
          }`}
        >
          Font & Color
        </button>

        {/* System Details */}
        <button
          onClick={() => handleAction("details")}
          className={`px-3 py-1.5 rounded-lg transition-all hidden md:block ${
            activeTab === "details"
              ? "bg-[#ccff00] text-black font-semibold shadow"
              : "hover:bg-white/10 text-white/80"
          }`}
        >
          Details
        </button>

        {/* Theme Toggle Button */}
        {mounted && (
          <button
            onClick={() => {
              if (soundEnabled) playClick();
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/80 flex items-center gap-1.5"
            title="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={14} className="text-[#ccff00]" /> : <Moon size={14} className="text-yellow-400" />}
            <span className="hidden xs:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        )}

        {/* Sound Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/80"
          title="Toggle SFX"
        >
          {soundEnabled ? <Volume2 size={14} className="text-[#ccff00]" /> : <VolumeX size={14} className="text-white/40" />}
        </button>

        {/* Primary CTA / Visit Site Badge (Yellow highlighted pill as in picture) */}
        <a
          href="#projects"
          className="px-3.5 py-1.5 rounded-lg bg-[#ccff00] text-black font-bold hover:bg-[#b8e600] transition-transform active:scale-95 flex items-center gap-1"
        >
          <span>Explore</span>
          <ExternalLink size={12} />
        </a>
      </motion.div>

      {/* Pop-up Modals for Dock Options */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[85] w-[90vw] max-w-md p-5 rounded-2xl bg-[#121214] text-white border border-white/15 shadow-2xl font-mono text-xs"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-[#ccff00] font-bold uppercase tracking-wider flex items-center gap-2">
                <Terminal size={14} />
                {activeTab === "creator" && "Creator Profile"}
                {activeTab === "specs" && "Typography & Palette Specs"}
                {activeTab === "details" && "Architecture & Tech"}
              </span>
              <button
                onClick={() => setActiveTab(null)}
                className="text-white/50 hover:text-white text-base px-1"
              >
                ✕
              </button>
            </div>

            {activeTab === "creator" && (
              <div className="space-y-2 text-white/80 leading-relaxed">
                <p className="font-bold text-white text-sm">Kevin Dwi Wijaya</p>
                <p>Full-Stack Creative Developer & UI Architect based in Jakarta, Indonesia.</p>
                <div className="pt-2 flex flex-wrap gap-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-white/10">Next.js 16</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Flutter</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">Laravel</span>
                  <span className="px-2 py-0.5 rounded bg-white/10">TypeScript</span>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-2 text-white/80">
                <div className="flex justify-between">
                  <span className="text-white/50">Display Font:</span>
                  <span className="font-bold text-white">Syne Bold / Extra Bold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Body & Code Font:</span>
                  <span className="font-bold text-white">JetBrains Mono</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50">Primary Palette:</span>
                  <span className="font-bold text-[#ccff00]">#CCFF00 (Neon) & Off-White</span>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-2 text-white/80">
                <p>Inspired by avant-garde editorial brutalism & computational design grids.</p>
                <p className="text-[#ccff00]">Built with Turbopack, Framer Motion, Lenis Smooth Scroll.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
