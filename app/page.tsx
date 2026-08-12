"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StackCloud from "./components/StackCloud";
import About from "./components/About";
import TechShowcase from "./components/TechShowcase";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import MusicPlayer from "./components/MusicPlayer";
import ControlDock from "./components/ControlDock";
import { CursorProvider } from "./context/CursorContext";

function HomeInner() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Preloader />
      <MusicPlayer />
      <CustomCursor />
      <ControlDock />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />

      <Hero />
      <StackCloud />
      <Projects />
      <About />
      <TechShowcase />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <CursorProvider>
      <HomeInner />
    </CursorProvider>
  );
}
