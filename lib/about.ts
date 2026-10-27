export interface Experience {
  organization: string;
  role: string;
  period: string;
  startDate: string;
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
  photo: "",
  photoAlt: "Kevin Dwi Wijaya",
  resumePdf: "",
  intro:
    "I’m Kevin, a full-stack and mobile engineer based in Kediri, Indonesia. I work with Next.js, Flutter, and Laravel to build interfaces and the systems behind them.",
  // Awaiting the actual three internship records, BNSP details and PDF from Kevin.
  experience: [] as Experience[],
  certifications: [] as Certification[],
  skills: [
    { area: "Web", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
    { area: "Mobile", items: ["Flutter", "Dart", "Firebase"] },
    { area: "Backend", items: ["Laravel", "Node.js", "REST APIs"] },
    { area: "Database", items: ["PostgreSQL", "MySQL", "Supabase"] },
    { area: "Tooling", items: ["Git", "GitHub", "Figma", "Docker"] },
  ],
};
