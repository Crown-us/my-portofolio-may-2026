export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  impact: string;
  year: string;
  services: string[];
  tech: string[];
  githubUrl: string;
  demoUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "lms-westud",
    title: "WESTUD LMS",
    category: "EDTECH & LEARNING ECOSYSTEM",
    image: "/images/projects/westud-lms.png",
    description: "Modern digital learning ecosystem featuring interactive course management, mentor booking system, 3D visual animations, and real-time database architecture.",
    impact: "🎓 Interactive Learning · 100% Type-Safe · 3D Visuals",
    year: "2026",
    services: ["Frontend Architecture", "Supabase Integration", "UI/UX & 3D Motion", "Type-Safe Routing"],
    tech: ["React 19", "TypeScript", "Vite", "Supabase", "TanStack Router", "Tailwind CSS", "Framer Motion", "Three.js"],
    githubUrl: "https://github.com/Crown-us/lms-westud",
    demoUrl: "https://lms-westud.vercel.app/"
  },
  {
    id: 2,
    slug: "seger-marketplace",
    title: "SEGER MARKETPLACE",
    category: "E-COMMERCE & ON-DEMAND LOGISTICS",
    image: "/images/projects/seger-marketplace.png",
    description: "Modern on-demand grocery marketplace platform for Kediri BUMD, featuring 15-minute express delivery dispatch, automated Midtrans payment gateway, interactive cart systems, and reactive UI.",
    impact: "⚡ 15-Min Express Delivery · Midtrans Gateway · 100% Seger Guarantee",
    year: "2026",
    services: ["Full-Stack Architecture", "Midtrans Payment Integration", "Logistics & Dispatch System", "UI/UX Engineering"],
    tech: ["Laravel 11", "React", "Inertia.js", "TypeScript", "Tailwind CSS", "Midtrans Snap API", "MySQL"],
    githubUrl: "https://github.com/Crown-us",
    demoUrl: "https://magang.kvndwi.my.id/"
  },
  {
    id: 3,
    slug: "rtrw-community-platform",
    title: "RTRW CIVIC PLATFORM",
    category: "CIVIC TECH & MULTI-TENANT SAAS",
    image: "/images/projects/rtrw-web.png",
    description: "All-in-one multi-tenant civic management web platform for RT/RW neighborhoods, featuring automated dues collection ledger, digital civic letters workflow, citizen complaint tracking, and secure OTP authentication.",
    impact: "🏘️ Multi-Tenant Web SaaS · Automated Dues Ledger · Digital Civic Letters",
    year: "2026",
    services: ["Multi-Tenant Architecture", "Laravel 11 & Inertia.js", "OTP Authentication", "Role-Based Access Control"],
    tech: ["Laravel 11", "React", "Inertia.js", "TypeScript", "Tailwind CSS", "MySQL", "Shadcn UI"],
    githubUrl: "https://github.com/nusatama/rtrw",
    demoUrl: "https://github.com/nusatama/rtrw"
  },
  {
    id: 4,
    slug: "high-throughput-dashboard",
    title: "PULSE ENGINE",
    category: "DISTRIBUTED SYSTEMS",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    description: "High-throughput financial metrics dashboard processing real-time WebSocket telemetry with sub-50ms render cycles.",
    impact: "📈 Handled 1M+ Daily Events · 99.99% Uptime",
    year: "2025",
    services: ["System Architecture", "Frontend Performance", "WebSockets"],
    tech: ["React 19", "TypeScript", "Node.js", "Redis", "Framer Motion"],
    githubUrl: "https://github.com/Crown-us",
    demoUrl: "https://pulse-engine-demo.vercel.app"
  },
  {
    id: 5,
    slug: "cosmic-design-system",
    title: "AURA DESIGN SYSTEM",
    category: "UI/UX ARCHITECTURE",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop",
    description: "Accessible, dark-first cosmic design system with 40+ modular UI components and automated Storybook docs.",
    impact: "✨ Accelerated Dev Velocity by 3x · WCAG AA compliant",
    year: "2025",
    services: ["Design System", "Component Library", "A11y Audit"],
    tech: ["TypeScript", "Tailwind CSS v4", "Storybook", "Figma"],
    githubUrl: "https://github.com/Crown-us",
    demoUrl: "https://aura-ds.vercel.app"
  },
  {
    id: 6,
    slug: "e-commerce-storefront",
    title: "ORBIT STORE",
    category: "E-COMMERCE PLATFORM",
    image: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1000&auto=format&fit=crop",
    description: "Headless e-commerce storefront with server-side rendering, instant search, and integrated Stripe checkout pipeline.",
    impact: "🚀 98/100 Lighthouse Performance Score",
    year: "2026",
    services: ["E-Commerce Architecture", "Payment Gateway", "SEO Optimization"],
    tech: ["Next.js 16", "Stripe API", "GraphQL", "Tailwind CSS"],
    githubUrl: "https://github.com/Crown-us",
    demoUrl: "https://orbit-store.vercel.app"
  },
];


