"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Services() {
  const { services } = siteConfig;

  return (
    <section id="services" className="w-full bg-[var(--background)] border-t border-[var(--border)]">
      {/* Master Centered Container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 border-x border-[var(--border)] py-20 md:py-28 relative">
        
        {/* Corner dots */}
        <div className="grid-dot -top-[3px] -left-[3px]" />
        <div className="grid-dot -top-[3px] -right-[3px]" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <p className="text-[11px] font-mono font-bold uppercase tracking-[0.1em] mb-3" style={{ color: "var(--accent)" }}>
              [ 04 ] SERVICES
            </p>
            <h2
              className="font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space)", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--foreground)" }}
            >
              What I can{" "}
              <em style={{ color: "var(--accent)", fontStyle: "italic" }}>build for you</em>
            </h2>
          </div>
          <p className="text-xs font-mono" style={{ color: "var(--muted)" }}>
            End-to-end engineering — design to production deployment.
          </p>
        </div>

        {/* Service Split Sections (Laravel style) */}
        <div className="flex flex-col rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
          {services.map((service, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                className="grid grid-cols-1 md:grid-cols-2"
                style={{ borderTop: i > 0 ? "1px solid var(--border)" : "none" }}
              >
                {/* Text col */}
                <div
                  className={`p-8 md:p-12 flex flex-col justify-between gap-6 ${!isEven ? "md:order-2" : ""}`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                        style={{
                          color: "var(--accent)",
                          background: "var(--accent-subtle)",
                          border: "1px solid var(--accent-border)",
                        }}
                      >
                        {service.num}
                      </span>
                    </div>
                    <h3
                      className="font-bold mb-3 tracking-tight"
                      style={{ fontFamily: "var(--font-space)", fontSize: "1.35rem", color: "var(--foreground)" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm font-mono leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                      {service.description}
                    </p>
                    <ul className="space-y-2.5">
                      {service.bullets.map(b => (
                        <li key={b} className="flex items-start gap-2.5 text-xs font-mono" style={{ color: "var(--muted)" }}>
                          <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "var(--accent)" }} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <a
                      href={service.cta.href}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-4 py-2 rounded-md transition-all"
                      style={{ color: "var(--accent)", border: "1px solid var(--accent-border)" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--accent-subtle)"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                    >
                      {service.cta.label} <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Visual col */}
                <div
                  className={`hidden md:flex items-center justify-center p-12 ${!isEven ? "md:order-1" : ""}`}
                  style={{
                    borderLeft: isEven ? "1px solid var(--border)" : "none",
                    borderRight: !isEven ? "1px solid var(--border)" : "none",
                    background: "var(--surface)",
                  }}
                >
                  <ServiceVisual num={service.num} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceVisual({ num }: { num: string }) {
  if (num === "01") {
    return (
      <div
        className="w-full max-w-[220px] rounded-lg p-4 font-mono text-[11px] leading-loose"
        style={{ border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)" }}
      >
        {["app/", "├── page.tsx", "├── layout.tsx", "└── components/", "    ├── Hero.tsx", "    └── Navbar.tsx"].map((l, i) => (
          <div key={i} style={{ color: i === 0 ? "var(--accent)" : "var(--muted)" }}>{l}</div>
        ))}
      </div>
    );
  }
  if (num === "02") {
    return (
      <div
        className="relative flex flex-col items-center justify-between w-36 h-60 rounded-[22px] p-3"
        style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="w-10 h-1 rounded-full" style={{ background: "var(--border)" }} />
        <div
          className="flex-1 w-full rounded-xl my-2 flex items-center justify-center text-[11px] font-mono font-bold"
          style={{ background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", color: "var(--accent)" }}
        >
          Flutter
        </div>
        <div className="w-8 h-8 rounded-full" style={{ border: "1px solid var(--border)" }} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 w-full max-w-[200px]">
      <div className="h-1.5 rounded-sm w-3/4" style={{ background: "var(--accent)" }} />
      <div className="h-1.5 rounded-sm w-full" style={{ background: "var(--border)" }} />
      <div
        className="flex-1 h-28 rounded-lg flex items-center justify-center text-xs font-mono font-bold"
        style={{ border: "1px solid var(--accent-border)", background: "var(--accent-subtle)", color: "var(--accent)" }}
      >
        Figma
      </div>
      <div className="flex gap-2">
        {["#ff443a", "#06b6d4", "#f59e0b"].map(c => (
          <div key={c} className="w-5 h-5 rounded-full" style={{ background: c, border: "2px solid rgba(255,255,255,0.15)" }} />
        ))}
      </div>
    </div>
  );
}
