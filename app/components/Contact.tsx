"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, ExternalLink, Copy } from "lucide-react";
import { useSound } from "../hooks/useSound";

export default function Contact() {
  const { play: playHover } = useSound("/audio/hover.mp3");
  const { play: playClick } = useSound("/audio/click.mp3");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText("wijaya.kevinn@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const contactLinks = [
    { icon: Mail, label: "Email Direct", value: "wijaya.kevinn@gmail.com", href: "mailto:wijaya.kevinn@gmail.com" },
    { icon: ExternalLink, label: "LinkedIn Profile", value: "kevin-dwi-wijaya", href: "https://www.linkedin.com/in/kevin-dwi-wijaya-95aa812b4" },
    { icon: ExternalLink, label: "GitHub Code Base", value: "github.com/Crown-us", href: "https://github.com/Crown-us" },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 bg-background text-foreground border-t border-foreground/15 relative font-mono select-none">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-12 mb-12 border-b border-foreground/15 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#ccff00] bg-black px-2 py-0.5 font-bold mb-3 inline-block">
              [03] INITIATE CONTACT
            </span>
            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tighter uppercase text-foreground">
              GET IN TOUCH
            </h2>
          </div>
          <div className="text-right font-mono text-xs text-foreground/60">
            AVAILABILITY: <span className="font-bold text-foreground">OPEN FOR WORK (2026)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Direct Links */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-8">
            <div>
              <h3 className="font-display text-3xl md:text-5xl font-extrabold uppercase mb-4 leading-tight">
                LET&apos;S BUILD SOMETHING EXTRAORDINARY.
              </h3>
              <p className="text-xs md:text-sm text-foreground/70 leading-relaxed mb-6">
                Have a project concept, design system request, or technical inquiry? Reach out directly via WhatsApp or email.
              </p>

              {/* Instant Email Copy Button */}
              <button
                onClick={copyEmail}
                className="w-full py-3 px-4 border border-foreground/30 hover:border-foreground bg-foreground/[0.04] text-xs font-mono flex items-center justify-between transition-colors mb-6"
              >
                <span>COPY DIRECT EMAIL: <strong className="text-foreground">wijaya.kevinn@gmail.com</strong></span>
                <span className="text-[#ccff00] bg-foreground px-2 py-0.5 font-bold flex items-center gap-1">
                  {copied ? "COPIED!" : <Copy size={12} />}
                </span>
              </button>
            </div>

            {/* Link List */}
            <div className="space-y-3">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex justify-between items-center p-4 border border-foreground/20 hover:border-foreground/60 bg-foreground/[0.02] text-xs transition-colors"
                  onClick={() => playClick()}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className="text-[#ccff00]" />
                    <span className="text-foreground/50 uppercase">{label}:</span>
                    <span className="font-bold text-foreground">{value}</span>
                  </div>
                  <span className="text-foreground/40">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6 border border-foreground/20 p-6 md:p-8 bg-foreground/[0.02]">
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center space-y-4"
                >
                  <CheckCircle2 size={40} className="mx-auto text-[#ccff00]" />
                  <h4 className="font-display text-2xl font-bold uppercase">MESSAGE TRANSMITTED</h4>
                  <p className="text-xs text-foreground/60">Redirecting to WhatsApp chat...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div className="space-y-1">
                    <label className="text-[10px] text-foreground/50 font-bold uppercase">01 // YOUR NAME</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter full name..."
                      className="w-full bg-background border border-foreground/20 p-3 outline-none focus:border-foreground text-foreground transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-foreground/50 font-bold uppercase">02 // YOUR EMAIL</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@domain.com"
                      className="w-full bg-background border border-foreground/20 p-3 outline-none focus:border-foreground text-foreground transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-foreground/50 font-bold uppercase">03 // PROJECT SCOPE / MESSAGE</label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe project details or inquiry..."
                      className="w-full bg-background border border-foreground/20 p-3 outline-none focus:border-foreground text-foreground transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full py-4 bg-foreground text-background font-bold text-xs uppercase tracking-wider hover:bg-[#ccff00] hover:text-black transition-colors flex items-center justify-center gap-2"
                  >
                    <span>{formState === "submitting" ? "SENDING..." : "SEND MESSAGE VIA WHATSAPP"}</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
