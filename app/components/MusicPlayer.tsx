"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    audioRef.current = new Audio("/audio/background-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15; // Set volume low for background
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Playback failed:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[70] flex items-center gap-4">
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={togglePlay}
        className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border-color)] text-[var(--foreground)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
        aria-label="Toggle Music"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Pause size={16} fill="currentColor" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Play size={16} className="ml-0.5" fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="bg-[var(--surface)] border border-[var(--border-color)] rounded-lg px-3 py-2 flex items-center gap-2"
          >
            <div className="flex gap-0.5 items-end h-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: [3, 12, 6, 10, 4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                  className="w-0.5 bg-[var(--accent)] rounded-full"
                />
              ))}
            </div>
            <span className="font-mono text-[10px] font-semibold text-[var(--muted-text)] uppercase tracking-wider">
              Now Playing
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
