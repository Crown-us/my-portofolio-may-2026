export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
  services: string[];
  tech: string[];
  link: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "aesthetics",
    title: "AESTHETICS",
    category: "BRANDING",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    description: "Eksplorasi visual yang menggabungkan estetika minimalis dengan tipografi berani untuk menciptakan identitas brand yang tak terlupakan.",
    year: "2024",
    services: ["Brand Strategy", "Visual Identity", "Art Direction"],
    tech: ["Adobe Illustrator", "Photoshop", "Figma"],
    link: "https://www.behance.net/kevinwijaya7"
  },
  {
    id: 2,
    slug: "brutal",
    title: "BRUTAL",
    category: "WEB DESIGN",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1000&auto=format&fit=crop",
    description: "Website portfolio dengan pendekatan desain brutalisme modern. Menekankan pada fungsionalitas mentah dan estetika yang jujur.",
    year: "2025",
    services: ["Web Development", "UI/UX Design", "Motion Design"],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/Crown-us"
  },
  {
    id: 3,
    slug: "experimental",
    title: "EXPERIMENTAL",
    category: "TYPEFACE",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    description: "Proyek tipografi eksperimental yang mengeksplorasi batas-batas keterbacaan dan bentuk huruf sebagai karya seni visual.",
    year: "2023",
    services: ["Typography", "Graphic Design"],
    tech: ["Glyphs", "After Effects"],
    link: "https://dribbble.com/kevindw"
  },
  {
    id: 4,
    slug: "minimal",
    title: "IDENTITY",
    category: "IDENTITY",
    image: "https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=1000&auto=format&fit=crop",
    description: "Sistem identitas visual yang bersih dan minimalis untuk startup teknologi masa kini. Fokus pada kejelasan dan skalabilitas.",
    year: "2026",
    services: ["Logo Design", "Design System"],
    tech: ["Figma", "React", "Storybook"],
    link: "https://vercel.com"
  },
];
