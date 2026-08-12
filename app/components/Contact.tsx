"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, ExternalLink, Copy, Download } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    const subject = encodeURIComponent(`Work Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => { setFormState("idle"); setFormData({ name: "", email: "", message: "" }); }, 4000);
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const inputStyle = {
    width: "100%",
    background: "var(--background)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "12px 14px",
    outline: "none",
    color: "var(--foreground)",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    transition: "border-color 0.15s",
  };

  return (
    <section id="contact" className="w-full bg-[var(--background)] border-t border-[var(--border)]">
      {/* Master Centered Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] py-20 md:py-28 relative">
        
        {/* Corner dots */}
        <div className="grid-dot -top-[3px] -left-[3px]" />
        <div className="grid-dot -top-[3px] -right-[3px]" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "var(--accent)" }}>
              [ 05 ] CONTACT
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
            >
              Let&apos;s build{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>together</em>
            </h2>
          </div>
          <p className="text-xs font-mono font-semibold" style={{ color: "var(--accent)" }}>
            {siteConfig.availability}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info */}
          <div className="flex flex-col gap-4">
            <p className="text-xs md:text-sm font-mono leading-relaxed" style={{ color: "var(--muted)" }}>
              Looking for a full-stack or mobile engineer for your product or engineering team? Send a message and I&apos;ll get back to you within 24 hours.
            </p>

            {/* Email copy */}
            <button
              onClick={copyEmail}
              className="w-full flex items-center justify-between p-4 rounded-xl transition-all text-left"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.background = "var(--accent-subtle)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--surface)"; }}
            >
              <span className="flex items-center gap-2.5">
                <Mail className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span className="text-xs font-mono font-semibold" style={{ color: "var(--foreground)" }}>{siteConfig.email}</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color: "var(--muted)" }}>
                {copied ? <><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">Copied!</span></> : <><Copy className="w-3.5 h-3.5" />Copy</>}
              </span>
            </button>

            {/* Resume */}
            <a
              href="/resume"
              className="w-full flex items-center justify-between p-4 rounded-xl transition-all"
              style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--foreground)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <span className="flex items-center gap-2.5">
                <Download className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span className="text-xs font-mono font-semibold">Download Full Resume (PDF)</span>
              </span>
              <span style={{ color: "var(--muted)" }}>↗</span>
            </a>

            {/* Social links */}
            <div className="flex flex-col gap-2">
              {[
                { label: "LinkedIn", href: siteConfig.social.linkedin, val: "kevin-dwi-wijaya" },
                { label: "GitHub", href: siteConfig.social.github, val: "Crown-us" },
                { label: "Instagram", href: siteConfig.social.instagram, val: "@kepsssz" },
              ].map(({ label, href, val }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl transition-all group text-xs font-mono"
                  style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.color = "var(--foreground)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                    <span style={{ color: "var(--muted)" }}>{label}:</span>
                    <span className="font-semibold" style={{ color: "var(--foreground)" }}>{val}</span>
                  </div>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-6 md:p-8 rounded-xl" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 text-center flex flex-col items-center gap-4"
                >
                  <CheckCircle2 className="w-10 h-10" style={{ color: "var(--accent)" }} />
                  <h4 className="font-display text-xl font-bold" style={{ color: "var(--foreground)" }}>Message sent!</h4>
                  <p className="text-xs font-mono" style={{ color: "var(--muted)" }}>
                    Your email client should have opened. I&apos;ll reply within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {[
                    { name: "name", label: "Your Name", placeholder: "Full name or company", type: "text" },
                    { name: "email", label: "Email Address", placeholder: "email@company.com", type: "email" },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
                        {field.label}
                      </label>
                      <input
                        required
                        type={field.type}
                        name={field.name}
                        value={(formData as Record<string,string>)[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        style={{ ...inputStyle }}
                        onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--muted)" }}>
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project or role..."
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg text-xs font-mono font-semibold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "var(--accent)" }}
                  >
                    {formState === "submitting" ? "Sending…" : "Send Message"}
                    <Send className="w-4 h-4" />
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
