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
    slug: "cosmic-ai-saas",
    title: "NEXUS AI SAAS",
    category: "AI PLATFORM",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    description: "Next-gen generative AI platform providing multi-modal workflow orchestration and real-time streaming analytics.",
    impact: "⚡ 45% Latency Reduction · 10k+ Active Users",
    year: "2026",
    services: ["Fullstack Architecture", "AI Integration", "API Design"],
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Python / FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/Crown-us",
    demoUrl: "https://nexus-ai-demo.vercel.app"
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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

