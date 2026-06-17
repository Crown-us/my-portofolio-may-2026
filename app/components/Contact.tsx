"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, ExternalLink } from "lucide-react";
import { useSound } from "../hooks/useSound";

export default function Contact() {
  const { play: playHover } = useSound("/audio/hover.mp3");
  const { play: playClick } = useSound("/audio/click.mp3");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    const whatsappNumber = "6285117394878";
    const text = `Halo Kevin, saya ${formData.name} (${formData.email}).\n\nPesan: ${formData.message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank");
    setFormState("success");
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: "wijaya.kevinn@gmail.com", href: "mailto:wijaya.kevinn@gmail.com" },
    { icon: ExternalLink, label: "LinkedIn", value: "/in/kevin-dwi-wijaya", href: "https://www.linkedin.com/in/kevin-dwi-wijaya-95aa812b4" },
    { icon: ExternalLink, label: "GitHub", value: "github.com/Crown-us", href: "https://github.com/Crown-us" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#060606] text-white relative overflow-hidden border-t border-white/5">
      {/* Glow top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none" />
      {/* Green glow blob */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block text-accent">
                GET IN TOUCH
              </span>
              <h2 className="font-display font-extrabold tracking-[-0.04em] leading-[0.9] uppercase mb-8">
                <span className="text-5xl sm:text-7xl block">LET&apos;S</span>
                <span className="text-6xl sm:text-8xl block italic text-transparent bg-clip-text bg-gradient-to-r from-white to-accent py-1">BUILD</span>
                <span className="text-4xl sm:text-6xl block text-white/80">GREAT.</span>
              </h2>
              <p className="font-body text-base text-white/50 max-w-sm leading-relaxed">
                Punya ide gila atau sekedar mau diskusi? Drop pesan di sini, gue bakal bales secepat mungkin.
              </p>
            </motion.div>

            {/* Contact Links */}
            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 group glass-card p-4 rounded-xl hover:border-accent/30 transition-all"
                  onClick={() => playClick()}
                  onMouseEnter={() => playHover()}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/40 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <span className="font-display text-[10px] font-bold uppercase tracking-wider text-white/30 block">{label}</span>
                    <span className="font-body text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{value}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card rounded-2xl p-12 flex flex-col items-center text-center py-24"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} className="text-accent" />
                  </div>
                  <h3 className="font-display text-3xl font-extrabold mb-3 uppercase tracking-tight">Terkirim!</h3>
                  <p className="font-body text-base text-white/50">Sambil nunggu balesan, mending ngopi dulu bro ☕</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="glass-card rounded-2xl p-8 space-y-6"
                >
                  <div className="space-y-1">
                    <label className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      01 · Nama Kamu
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Isi nama kamu di sini..."
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 outline-none font-body text-sm text-white placeholder:text-white/20 focus:border-accent/40 focus:bg-white/[0.04] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      02 · Email Aktif
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@kamu.com"
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 outline-none font-body text-sm text-white placeholder:text-white/20 focus:border-accent/40 focus:bg-white/[0.04] transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-display text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      03 · Pesan
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ceritain ide project kamu..."
                      className="w-full bg-white/[0.02] border border-white/[0.06] rounded-xl px-4 py-3 outline-none font-body text-sm text-white placeholder:text-white/20 focus:border-accent/40 focus:bg-white/[0.04] transition-all resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    onClick={() => playClick()}
                    onMouseEnter={() => playHover()}
                    disabled={formState === "submitting"}
                    className="w-full bg-accent text-black py-4 rounded-xl font-display font-black text-sm tracking-wider uppercase flex items-center justify-center gap-3 hover:brightness-110 transition-all disabled:opacity-60 shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                  >
                    {formState === "submitting" ? "MENGIRIM..." : "KIRIM PESAN"}
                    <Send size={16} className={formState === "submitting" ? "animate-pulse" : ""} />
                  </motion.button>

                  <p className="font-body text-[10px] text-white/20 text-center">
                    Akan diteruskan via WhatsApp · Biasanya bales dalam 24 jam
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
