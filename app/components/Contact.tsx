"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ArrowRight } from "lucide-react";
import { useSound } from "../hooks/useSound";

export default function Contact() {
  const { play: playHover } = useSound("/audio/hover.mp3");
  const { play: playClick } = useSound("/audio/click.mp3");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    
    // Construct WhatsApp message
    const whatsappNumber = "6285117394878"; // User's actual number
    const text = `Halo Kevin, saya ${formData.name} (${formData.email}).\n\nPesan: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
    
    setFormState("success");
    
    // Reset after some time
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="px-6 py-16 md:py-24 border-t-2 border-foreground bg-background text-foreground relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 border-2 border-foreground/5 rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Headline and Info */}
          <div className="lg:col-span-7 flex flex-col lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="font-body text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6 md:mb-8 block opacity-50">
                Get In Touch
              </span>
              <h2 className="font-display font-extrabold tracking-[-0.04em] leading-[0.8] uppercase flex flex-col gap-0 mb-10">
                <span className="text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-9xl block">LET'S</span>
                <span className="text-6xl sm:text-8xl md:text-9xl lg:text-8xl xl:text-9xl block italic text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/40 py-2 -ml-1">BUILD</span>
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl block opacity-90">GREAT.</span>
              </h2>
              <p className="font-body text-base md:text-xl opacity-60 max-w-md mb-8 md:mb-12 leading-relaxed">
                Punya ide gila atau sekedar mau diskusi? Drop pesan lo di sini, gue bakal bales secepat mungkin.
              </p>
            </motion.div>

            {/* Quick Links / Socials for desktop info */}
            <div className="flex flex-col gap-4">
              <motion.a 
                href="mailto:wijaya.kevinn@gmail.com"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 group cursor-pointer p-4 border-2 border-foreground/10 hover:border-foreground transition-all"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors shrink-0">
                  <ArrowRight size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-lg font-bold uppercase tracking-tight leading-none">Collaboration</span>
                  <span className="font-body text-[10px] opacity-40 uppercase tracking-widest font-bold mt-1">wijaya.kevinn@gmail.com</span>
                </div>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/kevin-dwi-wijaya-95aa812b4"
                target="_blank"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 group cursor-pointer p-4 border-2 border-foreground/10 hover:border-foreground transition-all"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
              >
                <div className="w-10 h-10 border-2 border-foreground flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors shrink-0">
                  <ArrowRight size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-lg font-bold uppercase tracking-tight leading-none">Project Inquiry</span>
                  <span className="font-body text-[10px] opacity-40 uppercase tracking-widest font-bold mt-1">Hire me on LinkedIn</span>
                </div>
              </motion.a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-5 relative mt-8 md:mt-0 z-20">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-foreground text-background p-8 md:p-12 brutalist-shadow border-2 border-foreground flex flex-col items-center text-center py-20 md:py-32"
                >
                  <CheckCircle2 size={60} className="mb-6" />
                  <h3 className="font-display text-3xl md:text-5xl font-extrabold mb-4 uppercase tracking-tighter leading-none">Pesan Terkirim!</h3>
                  <p className="font-body text-base md:text-xl opacity-80">Sambil nunggu balesan, mending ngopi dulu bro.</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  onSubmit={handleSubmit}
                  className="space-y-10 md:space-y-14"
                >
                  <div className="group relative">
                    <label className="block font-display text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-3 opacity-30 group-focus-within:opacity-100 transition-all">
                      01. Your Name
                    </label>
                    <input 
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="SIAPA NAMA LO?"
                      className="w-full bg-transparent border-b-4 border-foreground/10 focus:border-foreground py-4 md:py-6 outline-none font-display text-xl md:text-4xl font-bold uppercase transition-all placeholder:text-foreground/5"
                    />
                  </div>

                  <div className="group relative">
                    <label className="block font-display text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-3 opacity-30 group-focus-within:opacity-100 transition-all">
                      02. Your Email
                    </label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="EMAIL AKTIF LO?"
                      className="w-full bg-transparent border-b-4 border-foreground/10 focus:border-foreground py-4 md:py-6 outline-none font-display text-xl md:text-4xl font-bold uppercase transition-all placeholder:text-foreground/5"
                    />
                  </div>

                  <div className="group relative">
                    <label className="block font-display text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] mb-3 opacity-30 group-focus-within:opacity-100 transition-all">
                      03. Your Message
                    </label>
                    <textarea 
                      required
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="MAU NGOMONG APA NIH?"
                      className="w-full bg-transparent border-b-4 border-foreground/10 focus:border-foreground py-4 md:py-6 outline-none font-display text-xl md:text-4xl font-bold uppercase transition-all placeholder:text-foreground/5 resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    disabled={formState === "submitting"}
                    className="w-full bg-foreground text-background py-6 md:py-10 flex items-center justify-center gap-6 group overflow-hidden relative brutalist-shadow"
                  >
                    <span className="font-display text-2xl md:text-4xl font-black uppercase tracking-tighter relative z-10">
                      {formState === "submitting" ? "SENDING..." : "KIRIM PESAN"}
                    </span>
                    <Send size={24} className={formState === "submitting" ? "animate-bounce" : "group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform relative z-10"} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
