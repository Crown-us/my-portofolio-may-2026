"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import MusicPlayer from "./components/MusicPlayer";
import ControlDock from "./components/ControlDock";

import GenerativeCode from "./components/GenerativeCode";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground selection:bg-[#ccff00] selection:text-black">
      <Preloader />
      <MusicPlayer />
      <CustomCursor mousePos={mousePos} isHovered={isHovered} activeText={cursorText} />
      <ControlDock />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#ccff00] origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar setIsHovered={setIsHovered} />

      <div>
        <Hero setIsHovered={setIsHovered} />
        <About />
        <GenerativeCode />
        <Services setIsHovered={setIsHovered} />
        <Projects
          setIsHovered={(val: boolean) => {
            setIsHovered(val);
            if (!val) setCursorText("");
          }}
          setCursorText={setCursorText}
        />
        <Contact />
        <Footer setIsHovered={setIsHovered} />
      </div>
    </main>
  );
}
