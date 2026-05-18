"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useSound } from "../hooks/useSound";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { play: playClick } = useSound("/audio/click.mp3");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
        playClick();
      }}
      className="fixed bottom-8 right-8 z-[70] w-14 h-14 bg-foreground text-background flex items-center justify-center border-2 border-foreground hover:scale-110 transition-transform brutalist-shadow"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </motion.button>
  );
}
