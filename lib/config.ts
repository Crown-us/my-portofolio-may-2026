// ============================================================
// PORTFOLIO CONFIG — HR & Recruiter Optimized Single Source of Truth
// All components read from this single source of truth
// ============================================================

export const siteConfig = {
  // ── Personal Info ──────────────────────────────────────────
  name: "Kevin Dwi Wijaya",
  shortName: "Kevin",
  initials: "KD",
  title: "Full-Stack & Mobile Engineer",
  tagline: "Kevin builds high-performance web & mobile products.",
  taglineAccent: "high-performance", // the word that gets italic accent styling
  subtitle:
    "Full-Stack & Mobile Engineer specializing in Next.js, Flutter, and Laravel. 3+ years experience engineering scalable web platforms, cross-platform mobile apps, and robust APIs.",
  location: "Kediri, Indonesia",
  timezone: "UTC+7 (Flexible for US/EU Remote)",
  availability: "Open to Full-Time Remote Roles & Contracts (2026)",
  availabilityShort: "🟢 Available for Remote Roles",

  // ── Executive Quick Stats (HR & Recruiter Summary) ──────────
  stats: [
    { label: "Experience", value: "3+ Years" },
    { label: "Core Stack", value: "Next.js · Flutter · Laravel" },
    { label: "Education", value: "D3 Informatics (Polinema)" },
    { label: "Work Preference", value: "Remote / Overseas Roles" },
  ],

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
      "Full-Stack & Mobile Engineer from Kediri, Indonesia specializing in Next.js, Flutter, and Laravel. Open for paid internships, remote roles, and software engineering opportunities.",
    url: "https://kevindwiwijaya.dev",
    ogImage: "/og-image.png",
  },

  // ── Design System Specs (shown in ControlDock) ─────────────
  designSystem: {
    displayFont: "Space Grotesk",
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
        "Building production-grade SSR & RSC web applications with Next.js, React 19, and TypeScript. Optimized for Lighthouse 95+ and Core Web Vitals.",
      tags: ["Next.js", "React", "TypeScript"],
    },
    {
      icon: "Smartphone",
      label: "Mobile App Development",
      description:
        "Cross-platform iOS & Android engineering with Flutter & Dart. Clean BLoC state management, offline storage, and push notifications.",
      tags: ["Flutter", "Dart", "Firebase"],
    },
    {
      icon: "Server",
      label: "Backend & API Architecture",
      description:
        "Designing scalable REST APIs and microservices with Laravel & Node.js, backed by PostgreSQL, Supabase, and Redis caching.",
      tags: ["Laravel", "Node.js", "PostgreSQL"],
    },
    {
      icon: "Layers",
      label: "UI/UX & Design Systems",
      description:
        "Translating Figma mockups into reusable component libraries with Tailwind CSS. Focus on WCAG accessibility and fluid motion.",
      tags: ["Figma", "Design Systems", "Tailwind CSS"],
    },
    {
      icon: "Zap",
      label: "Performance & Optimization",
      description:
        "Refactoring bottlenecked codebases, reducing API response latency, optimizing bundle sizes, and ensuring sub-50ms interaction response.",
      tags: ["Performance", "Core Web Vitals", "Optimization"],
    },
    {
      icon: "GitBranch",
      label: "DevOps & CI/CD Pipelines",
      description:
        "Automated deployment workflows with GitHub Actions, Vercel Edge Networks, Docker containerization, and Supabase cloud infrastructure.",
      tags: ["Vercel", "GitHub Actions", "Docker"],
    },
  ],

  // ── Services (2-col split sections) ────────────────────────
  services: [
    {
      num: "01",
      title: "Full-Stack Web Development",
      description:
        "End-to-end web engineering from frontend architecture to backend APIs. Clean code, type safety, and fast loading speed guaranteed.",
      bullets: [
        "Next.js App Router & Server Components",
        "Type-safe API integrations with Zod & TypeScript",
        "Responsive, mobile-first Tailwind CSS v4 styling",
      ],
      cta: { label: "View Web Projects", href: "#projects" },
    },
    {
      num: "02",
      title: "Cross-Platform Mobile Apps",
      description:
        "Production-ready mobile applications built with Flutter. Native performance on both iOS and Android with single-codebase efficiency.",
      bullets: [
        "Clean Architecture with BLoC / Provider pattern",
        "REST API, GraphQL, and Supabase/Firebase backends",
        "App Store & Google Play deployment readiness",
      ],
      cta: { label: "View Mobile Work", href: "#projects" },
    },
    {
      num: "03",
      title: "Backend API Engineering",
      description:
        "Robust RESTful API design with Laravel & Node.js. Database schema optimization, authentication pipelines, and third-party API integrations.",
      bullets: [
        "Laravel 11 Resource Controllers & Sanctu/JWT Auth",
        "PostgreSQL / Supabase relational database design",
        "High-performance caching with Redis",
      ],
      cta: { label: "Discuss Architecture", href: "#contact" },
    },
  ],
};

export type SiteConfig = typeof siteConfig;

