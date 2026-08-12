// ============================================================
// PORTFOLIO CONFIG — Edit this file to customize your portfolio
// All components read from this single source of truth
// ============================================================

export const siteConfig = {
  // ── Personal Info ──────────────────────────────────────────
  name: "Kevin Dwi Wijaya",
  shortName: "Kevin",
  initials: "KD",
  title: "Full-Stack & Mobile Engineer",
  tagline: "Kevin builds things that matter.",
  taglineAccent: "builds", // the word that gets italic accent styling
  subtitle:
    "Full-Stack & Mobile Engineer crafting high-performance digital products with Next.js, Flutter, and Laravel.",
  location: "Jakarta, Indonesia",
  timezone: "UTC+7",
  availability: "Open to remote contracts & full-time roles (2026)",
  availabilityShort: "Available for Remote",

  // ── Contact ────────────────────────────────────────────────
  email: "wijaya.kevinn@gmail.com",
  whatsapp: "6285117394878",

  // ── Social Links ───────────────────────────────────────────
  social: {
    github: "https://github.com/Crown-us",
    linkedin: "https://www.linkedin.com/in/kevin-dwi-wijaya-95aa812b4",
    instagram: "https://www.instagram.com/kepsssz?igsh=dzVtdTF5Y3F5NjQ1",
    twitter: "https://x.com/bu_kanan",
    dribbble: "https://dribbble.com/kevindw",
    behance: "https://www.behance.net/kevinwijaya7",
  },

  // ── Primary Tech Stack (shown in hero StackCloud) ──────────
  stack: [
    "Next.js",
    "TypeScript",
    "React",
    "Flutter",
    "Dart",
    "Laravel",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
    "Supabase",
    "Firebase",
    "Figma",
  ],

  // ── SEO / Metadata ─────────────────────────────────────────
  seo: {
    title: "Kevin Dwi Wijaya — Full-Stack & Mobile Engineer",
    description:
      "Full-Stack & Mobile Engineer from Jakarta building high-performance web and mobile apps with Next.js, Flutter, and Laravel. Open to global remote roles.",
    url: "https://kevindwiwijaya.dev",
    ogImage: "/og-image.png",
  },

  // ── Design System Specs (shown in ControlDock) ─────────────
  designSystem: {
    displayFont: "Plus Jakarta Sans",
    monoFont: "JetBrains Mono",
    darkAccent: "#ff443a",   // Render/Laravel Coral Red
    lightAccent: "#ff443a",
    palette: "Render Charcoal + Coral Red",
  },

  // ── What I Do — Bento Grid (About section) ─────────────────
  capabilities: [
    {
      icon: "Globe",
      label: "Web Engineering",
      description:
        "Building high-performance web apps with Next.js, React, and Tailwind CSS. SSR, RSC, and edge-ready architectures.",
      tags: ["Next.js", "React", "TypeScript"],
    },
    {
      icon: "Smartphone",
      label: "Mobile Development",
      description:
        "Cross-platform iOS & Android apps with Flutter & Dart, integrated with REST APIs, Firebase, and Supabase.",
      tags: ["Flutter", "Dart", "Firebase"],
    },
    {
      icon: "Layers",
      label: "UI/UX Design",
      description:
        "Minimalist, high-impact interfaces in Figma. Design tokens, micro-interactions, and accessibility-first.",
      tags: ["Figma", "Design Systems"],
    },
    {
      icon: "Server",
      label: "Backend & API",
      description:
        "Scalable backend systems with Laravel & Node.js, backed by PostgreSQL and MySQL with clean REST API design.",
      tags: ["Laravel", "Node.js", "PostgreSQL"],
    },
    {
      icon: "Zap",
      label: "Performance",
      description:
        "Obsessed with Core Web Vitals, bundle size, and render performance. Lighthouse 90+ is the baseline.",
      tags: ["Lighthouse", "Core Web Vitals"],
    },
    {
      icon: "GitBranch",
      label: "DevOps & Deployment",
      description:
        "Git workflows, CI/CD with GitHub Actions, Vercel deployments, and cloud infrastructure on Supabase & Railway.",
      tags: ["Vercel", "GitHub Actions", "CI/CD"],
    },
  ],

  // ── Services (2-col split sections) ────────────────────────
  services: [
    {
      num: "01",
      title: "Web Application Development",
      description:
        "From landing pages to complex SaaS dashboards — I build fast, accessible, and maintainable web applications that scale.",
      bullets: [
        "Next.js App Router with SSR & RSC",
        "TypeScript-first codebase",
        "Component-driven with Tailwind CSS v4",
      ],
      cta: { label: "See Projects", href: "#projects" },
    },
    {
      num: "02",
      title: "Mobile App Development",
      description:
        "Native-quality cross-platform mobile apps for iOS and Android. Clean architecture, smooth animations, offline-first.",
      bullets: [
        "Flutter with BLoC/Provider state management",
        "REST API & Supabase/Firebase integration",
        "Published to App Store & Play Store",
      ],
      cta: { label: "See Mobile Work", href: "#projects" },
    },
    {
      num: "03",
      title: "UI/UX Design & Prototyping",
      description:
        "User research, wireframing, and high-fidelity prototypes in Figma. Design systems that scale across product teams.",
      bullets: [
        "Design token-based systems",
        "Interactive prototypes",
        "WCAG accessibility audit",
      ],
      cta: { label: "View Designs", href: "#projects" },
    },
  ],
};

export type SiteConfig = typeof siteConfig;
