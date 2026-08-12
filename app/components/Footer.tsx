"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
    { label: "Resume", href: "/resume" },
  ];

  const socials = [
    { label: "Instagram", href: siteConfig.social.instagram },
    { label: "Twitter / X", href: siteConfig.social.twitter },
    { label: "Dribbble", href: siteConfig.social.dribbble },
    { label: "Behance", href: siteConfig.social.behance },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "GitHub", href: siteConfig.social.github },
  ];

  const marqueeText = `${siteConfig.name.toUpperCase()} · FULL-STACK ENGINEER · OPEN TO REMOTE ·`;
  const repeated = Array(8).fill(marqueeText);

  return (
    <>
      {/* Marquee strip */}
      <div className="w-full overflow-hidden py-3.5 select-none" style={{ background: "var(--accent)" }}>
        <div className="flex">
          <div className="marquee-track flex items-center">
            {repeated.map((text, i) => (
              <span
                key={i}
                className="shrink-0 whitespace-nowrap px-8 text-white font-bold uppercase tracking-tight"
                style={{ fontFamily: "var(--font-space)", fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)" }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer — Centered inside 1200px container */}
      <footer
        className="w-full bg-[var(--background)] border-t border-[var(--border)] text-[var(--foreground)]"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] py-16 relative">
          
          {/* Corner dots */}
          <div className="grid-dot -top-[3px] -left-[3px]" />
          <div className="grid-dot -top-[3px] -right-[3px]" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <h2
                className="font-bold"
                style={{ fontFamily: "var(--font-space)", fontSize: "1.75rem", color: "var(--foreground)" }}
              >
                {siteConfig.initials}<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
              <p className="text-xs font-mono leading-relaxed max-w-xs" style={{ color: "var(--muted)" }}>
                {siteConfig.title}. Based in {siteConfig.location}. Building scalable digital products for global teams.
              </p>
              <p className="text-xs font-mono">
                <span style={{ color: "var(--muted)" }}>Email: </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold transition-colors"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--foreground)")}
                >
                  {siteConfig.email}
                </a>
              </p>
            </div>

            {/* Nav */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                Navigation
              </p>
              <ul className="flex flex-col gap-2">
                {navLinks.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-xs font-mono transition-colors"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div className="md:col-span-4 flex flex-col gap-3">
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>
                Social Channels
              </p>
              <ul className="flex flex-col gap-2">
                {socials.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono flex items-center justify-between group transition-colors"
                      style={{ color: "var(--muted)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--foreground)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      <span>{label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8 text-[11px] font-mono"
            style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
          >
            <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Designed & built in {siteConfig.location}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
