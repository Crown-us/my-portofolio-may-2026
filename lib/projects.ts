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
    title: "RTRW DIGITAL",
    category: "CIVIC TECH & NEIGHBORHOOD SAAS",
    image: "/images/projects/rtrw-digital.png",
    description: "Platform manajemen lingkungan modern untuk RT/RW yang mengintegrasikan iuran otomatis, transparansi kas warga, permohonan surat pengantar digital, dan pusat informasi dalam satu ekosistem web terpadu.",
    impact: "🏛️ Digitalisasi RT/RW · Iuran Otomatis & Kas Transparan · Surat Digital",
    year: "2026",
    services: ["Multi-Tenant Web Architecture", "Inertia.js & Laravel 11", "OTP 2FA Authentication", "Sistem Kas & Iuran Warga"],
    tech: ["Laravel 11", "React", "Inertia.js", "TypeScript", "Tailwind CSS", "MySQL", "Shadcn UI"],
    githubUrl: "https://github.com/Crown-us/personal-host-rt-rw",
    demoUrl: "https://personal-host-rt-rw-nu.vercel.app"
  },
];



