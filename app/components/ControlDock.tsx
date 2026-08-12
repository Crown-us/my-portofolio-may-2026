"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Volume2, VolumeX, X } from "lucide-react";
import { useSound } from "../hooks/useSound";
import { siteConfig } from "@/lib/config";

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
      {/* Floating Bottom Dock */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 22 }}
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] flex items-center gap-1 p-1 rounded-xl bg-[#111111]/95 text-white backdrop-blur-xl border border-white/10 shadow-2xl font-mono text-xs select-none max-w-[92vw]"
      >
        {/* Brand badge */}
        <button
          onClick={() => handleAction("creator")}
          className="px-2.5 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 transition-colors text-white font-bold flex items-center gap-1.5 text-xs"
          title="About this site"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          {siteConfig.initials}.
        </button>

        {/* Design Specs */}
        <button
          onClick={() => handleAction("specs")}
          style={activeTab === "specs" ? { backgroundColor: "var(--accent)", color: "#fff" } : {}}
          className={`px-2.5 py-1.5 rounded-lg transition-all hidden sm:block text-xs ${
            activeTab === "specs" ? "font-semibold" : "hover:bg-white/10 text-white/70"
          }`}
        >
          Design
        </button>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => {
              if (soundEnabled) playClick();
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 flex items-center gap-1.5 text-xs"
            title="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-[var(--accent)]" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />
            )}
            <span className="hidden xs:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
        )}

        {/* Sound toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70"
          title="Toggle SFX"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[var(--accent)]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-white/30" />
          )}
        </button>

        {/* CTA */}
        <a
          href="#contact"
          style={{ backgroundColor: "var(--accent)" }}
          className="px-3 py-1.5 rounded-lg font-bold hover:brightness-110 transition-all active:scale-95 flex items-center gap-1 text-white text-xs"
        >
          Hire Me
        </a>
      </motion.div>

      {/* Pop-up panel */}
      <AnimatePresence>
        {activeTab && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[80] p-5 rounded-xl bg-[#111111]/98 text-white border border-white/10 backdrop-blur-2xl shadow-2xl font-mono text-xs w-[90vw] max-w-sm"
          >
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-white/10">
              <span className="font-bold uppercase tracking-wider text-[var(--accent)] text-[11px]">
                {activeTab === "creator" ? "System Info" : "Design System"}
              </span>
              <button
                onClick={() => setActiveTab(null)}
                className="p-1 hover:bg-white/10 rounded-md text-white/50 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {activeTab === "creator" && (
              <div className="space-y-2.5 text-white/75">
                {[
                  ["Name", siteConfig.name],
                  ["Role", siteConfig.title],
                  ["Location", siteConfig.location],
                  ["Status", siteConfig.availabilityShort],
                ].map(([key, val]) => (
                  <div key={key} className="flex justify-between gap-4">
                    <span className="text-white/40">{key}:</span>
                    <span className="font-semibold text-white text-right">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "specs" && (
              <div className="space-y-2.5 text-white/75">
                {[
                  ["Display Font", siteConfig.designSystem.displayFont],
                  ["Mono Font", siteConfig.designSystem.monoFont],
                  ["Dark Accent", siteConfig.designSystem.darkAccent],
                  ["Palette", siteConfig.designSystem.palette],
                  ["Stack", "Next.js 16 · Framer Motion · Lenis"],
                ].map(([key, val]) => (
                  <div key={key} className="flex justify-between gap-4">
                    <span className="text-white/40">{key}:</span>
                    <span className="font-semibold text-white text-right">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
