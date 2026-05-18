"use client";

import { motion, useScroll, useSpring, useVelocity, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ThemeToggle from "./components/ThemeToggle";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or wait for preloader to finish
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Matches the preloader logic roughly
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Scroll Skew Logic
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useSpring(scrollVelocity, {
    stiffness: 100,
    damping: 30
  });
  const skew = useTransform(skewVelocity, [-1000, 1000], [-5, 5]);

  return (
    <main className="min-h-screen flex flex-col selection:bg-accent selection:text-black cursor-none transition-colors duration-300">
      <Preloader />
      <ThemeToggle />
      <MusicPlayer />
      <CustomCursor mousePos={mousePos} isHovered={isHovered} activeText={cursorText} />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar setIsHovered={setIsHovered} />
      
      <motion.div style={{ skewY: skew }}>
        <Hero setIsHovered={setIsHovered} />
        
        <About />
        
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
      </motion.div>

      <style jsx global>{`
        .h-1px { height: 1px; }
      `}</style>
    </main>
  );
}
