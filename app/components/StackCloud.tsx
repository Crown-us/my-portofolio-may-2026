"use client";

import { siteConfig } from "@/lib/config";

export default function StackCloud() {
  const items = [...siteConfig.stack, ...siteConfig.stack, ...siteConfig.stack];

  return (
    <section className="w-full bg-[var(--background)]">
      <div
        className="max-w-[1200px] mx-auto border-x border-y border-[var(--border)] overflow-hidden py-3.5 select-none bg-[var(--surface)] relative"
      >
        <div className="grid-dot top-0 -left-[3px]" />
        <div className="grid-dot top-0 -right-[3px]" />

        <div className="flex items-center overflow-hidden">
          <div className="marquee-track-slow flex items-center">
            {items.map((tech, i) => (
              <div key={i} className="flex items-center shrink-0">
                <span
                  className="px-5 text-[11px] font-mono font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
                  style={{ color: "var(--muted)" }}
                >
                  {tech}
                </span>
                <span className="text-[11px]" style={{ color: "var(--border)" }}>·</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
