export interface Experience {
  organization: string;
  role: string;
  period: string;
  startDate: string;
  location?: string;
  logo?: string;
  summary: string;
  highlights: string[];
}
export interface Certification {
  name: string;
  issuer: string;
  year: number;
  credentialUrl?: string;
}
export const about = {
  photo: "/images/kevin-author.png",
  photoAlt: "Kevin Dwi Wijaya",
  resumePdf: "",
  intro:
    "I’m Kevin, a full-stack and mobile engineer based in Kediri, Indonesia. I work with Next.js, Flutter, and Laravel to build interfaces and the systems behind them.",
  // Awaiting BNSP certification details and CV PDF from Kevin.
  experience: [
    {
      organization: "PT. Nusatama Jaya Sakti",
      role: "Full Stack Engineer",
      period: "Jan 2026 – Jun 2026",
      startDate: "2026-01",
      location: "Jombang, On-site",
      summary:
        "Full Stack Engineer intern contributing to the end-to-end development of responsive, scalable web applications, building backend logic and interactive interfaces with Laravel and React.",
      highlights: [
        "Built backend logic and interactive frontend interfaces using Laravel and React.",
        "Contributed to end-to-end delivery of responsive, scalable web applications.",
        "Collaborated with the engineering team across full-stack software projects.",
      ],
    },
    {
      organization: "PT Kalamaya Nusa Teknologi (KALAMAYA)",
      role: "Frontend Developer",
      period: "Jun 2025 – Aug 2025",
      startDate: "2025-06",
      location: "Kediri, On-site",
      summary:
        "Frontend Developer intern building responsive, user-friendly web interfaces and improving usability across web development projects.",
      highlights: [
        "Implemented responsive, user-friendly web interfaces.",
        "Improved website usability across frontend features.",
        "Supported the team on client-side web development work.",
      ],
    },
    {
      organization: "PT. TELKOM AKSES",
      role: "Information Technology Intern",
      period: "Apr 2022 – Nov 2022",
      startDate: "2022-04",
      location: "Kediri, On-site",
      summary:
        "IT Support intern handling technical support, hardware and software troubleshooting, and maintenance of IT systems and infrastructure.",
      highlights: [
        "Provided technical support and troubleshooting for hardware and software issues.",
        "Supported maintenance of IT systems and infrastructure.",
        "Helped keep technology services running efficiently.",
      ],
    },
  ] as Experience[],
  certifications: [] as Certification[],
  skills: [
    { area: "Web", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
    { area: "Mobile", items: ["Flutter", "Dart", "Firebase"] },
    { area: "Backend", items: ["Laravel", "Node.js", "REST APIs"] },
    { area: "Database", items: ["PostgreSQL", "MySQL", "Supabase"] },
    { area: "Tooling", items: ["Git", "GitHub", "Figma", "Docker"] },
  ],
};
