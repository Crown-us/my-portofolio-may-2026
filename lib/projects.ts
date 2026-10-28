export interface CaseStudy {
  problem: string;
  role: string;
  timeframe: string;
  teamSize: number | null;
  stack: {
    frontend: string[];
    backend: string[];
    mobile: string[];
    database: string[];
    infra: string[];
  };
  features: { title: string; description: string }[];
  architecture: string;
  diagram: string;
  challenges: { challenge: string; solution: string }[];
  results: { label: string; value: string; source: string }[];
  screenshots: { src: string; alt: string; caption: string }[];
  links: { demo?: string; repo?: string; docs?: string };
}
export interface Project {
  isFeatured: boolean;
  summary: string;
  status: "live" | "in-progress" | "archived" | "handed-off";
  caseStudy: CaseStudy;
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
    isFeatured: true,
    status: "live",
    summary: "A learning platform with course management and mentor booking.",
    caseStudy: {
      problem:
        "An LMS has to carry a student from browsing a catalog to finishing a course: enrollment, structured modules and lessons, quizzes, progress, and certification. WeStud needed that full loop to work for three roles — student, mentor, and admin — on top of a managed backend.",
      role: "Solo build — frontend architecture, the data model, and the Supabase schema, from catalog to certification.",
      timeframe: "1 month (2026)",
      teamSize: 1,
      stack: {
        frontend: [
          "React 19",
          "TypeScript",
          "Vite",
          "TanStack Router",
          "TanStack Query",
          "Tailwind CSS",
          "Shadcn UI",
          "Framer Motion",
          "Three.js",
        ],
        backend: ["Supabase Auth", "Postgres row-level security"],
        mobile: [],
        database: ["PostgreSQL"],
        infra: ["Vercel"],
      },
      features: [
        {
          title: "Role-based dashboards",
          description:
            "Students, mentors, and admins each land on their own dashboard; the role stored on the profile decides which screens and data they can reach.",
        },
        {
          title: "Course builder",
          description:
            "Courses are assembled from modules and lessons, with draft, published, and archived states so unfinished material never appears in the catalog.",
        },
        {
          title: "Guided learning player",
          description:
            "Enrolled students move through lessons in order, with progress tracked per enrollment and a discussion panel next to the video.",
        },
        {
          title: "Quizzes",
          description:
            "Modules can carry quizzes with a passing score, multiple-choice options, and an explanation per question.",
        },
        {
          title: "Mentor catalog and schedule",
          description:
            "Mentors are listed from the profile table with their published courses, and students manage their sessions from a calendar view.",
        },
      ],
      architecture:
        "The frontend is a React 19 single-page app built with Vite and routed by TanStack Router, with data fetched through TanStack Query. Supabase provides authentication, a Postgres database, and storage. The schema links profiles, courses, modules, lessons, enrollments, quizzes, questions, and options, while Postgres row-level security keeps each student's enrollments private and published courses public.",
      diagram: "",
      challenges: [
        {
          challenge: "Guarding nested dashboard routes",
          solution:
            "Each protected route checks authentication and enrollment in its route loader before rendering, redirecting to login with a return path — or back to the course page when the student is not enrolled.",
        },
        {
          challenge: "Role-based access without a custom API",
          solution:
            "Roles live on the profile row and row-level security policies in Postgres decide what each user may read, so the client is not the only thing standing between a student and another student's data.",
        },
        {
          challenge: "Repeated fetching across dashboard screens",
          solution:
            "Queries are declared once as reusable TanStack Query options with per-entity stale times, so moving between dashboard pages reuses cached data instead of refetching on every visit.",
        },
      ],
      results: [],
      screenshots: [
        {
          src: "/images/projects/westud-lms.png",
          alt: "WeStud LMS landing page",
          caption: "Learning platform homepage",
        },
      ],
      links: {
        demo: "https://lms-westud.vercel.app/",
        repo: "https://github.com/Crown-us/lms-westud",
      },
    },
    slug: "lms-westud",
    title: "WESTUD LMS",
    category: "Education",
    image: "/images/projects/westud-lms.png",
    description:
      "Modern digital learning ecosystem featuring interactive course management, mentor booking system, 3D visual animations, and real-time database architecture.",
    impact: "Interactive Learning · Mentor Booking",
    year: "2026",
    services: [
      "Frontend Architecture",
      "Supabase Integration",
      "UI/UX & 3D Motion",
      "Type-Safe Routing",
    ],
    tech: [
      "React 19",
      "TypeScript",
      "Vite",
      "Supabase",
      "TanStack Router",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
    ],
    githubUrl: "https://github.com/Crown-us/lms-westud",
    demoUrl: "https://lms-westud.vercel.app/",
  },
  {
    id: 2,
    isFeatured: false,
    status: "handed-off",
    summary: "A grocery marketplace with ordering and payment integration.",
    caseStudy: {
      problem:
        "A Kediri regional-owned enterprise (BUMD) needed an online storefront for fresh groceries — produce, spices, protein, and eggs — with per-item stock tracking and online payment.",
      role: "Built the Flutter Android app and the web app as an intern in a three-person team. Handed the project over to the senior developer with the commerce flow complete; the remaining work was promotional and supporting content.",
      timeframe: "2 months (2026)",
      teamSize: 3,
      stack: {
        frontend: ["React", "Inertia.js", "TypeScript", "Tailwind CSS"],
        backend: ["Laravel 11", "Midtrans Snap API"],
        mobile: ["Flutter", "Dart"],
        database: ["MySQL"],
        infra: [],
      },
      features: [
        {
          title: "Category-based catalog",
          description:
            "Produce, spices, protein, and eggs are grouped into categories so shoppers can jump straight to the aisle they need.",
        },
        {
          title: "Live stock per item",
          description:
            "Every product shows how many are left, and the listing marks it as sold out once the count reaches zero.",
        },
        {
          title: "Cart and checkout",
          description:
            "Shoppers collect items in a cart and complete the order in a single checkout flow.",
        },
        {
          title: "Midtrans Snap payments",
          description:
            "Orders are paid through Midtrans Snap, integrated into the checkout flow.",
        },
        {
          title: "Android client",
          description:
            "The same storefront is available as an Android app built with Flutter.",
        },
      ],
      architecture:
        "Laravel 11 runs the backend, with MySQL holding catalog, stock, and order data. The web app is built on Inertia.js with React, TypeScript, and Tailwind CSS. The Android client was built separately in Flutter, and Midtrans Snap handles payment.",
      diagram: "",
      challenges: [],
      results: [],
      screenshots: [
        {
          src: "/images/projects/seger-marketplace.png",
          alt: "Seger Marketplace homepage",
          caption: "Grocery marketplace homepage",
        },
      ],
      links: { demo: "https://magang.kvndwi.my.id/" },
    },
    slug: "seger-marketplace",
    title: "SEGER MARKETPLACE",
    category: "Commerce",
    image: "/images/projects/seger-marketplace.png",
    description:
      "Modern on-demand grocery marketplace platform for Kediri BUMD, featuring grocery ordering, automated Midtrans payment gateway, interactive cart systems, and reactive UI.",
    impact: "Grocery Ordering · Midtrans Payments",
    year: "2026",
    services: [
      "Full-Stack Architecture",
      "Midtrans Payment Integration",
      "Logistics & Dispatch System",
      "UI/UX Engineering",
    ],
    tech: [
      "Laravel 11",
      "React",
      "Inertia.js",
      "TypeScript",
      "Tailwind CSS",
      "Midtrans Snap API",
      "MySQL",
    ],
    githubUrl: "",
    demoUrl: "https://magang.kvndwi.my.id/",
  },
  {
    id: 3,
    isFeatured: true,
    status: "live",
    summary:
      "Neighborhood administration, resident dues, and community information.",
    caseStudy: {
      problem: "",
      role: "",
      timeframe: "",
      teamSize: null,
      stack: {
        frontend: [
          "React",
          "Inertia.js",
          "TypeScript",
          "Tailwind CSS",
          "Shadcn UI",
        ],
        backend: ["Laravel 11"],
        mobile: [],
        database: ["MySQL"],
        infra: [],
      },
      features: [],
      architecture: "",
      diagram: "",
      challenges: [],
      results: [],
      screenshots: [
        {
          src: "/images/projects/rtrw-digital.png",
          alt: "RTRW Digital homepage",
          caption: "Community management homepage",
        },
      ],
      links: {
        demo: "https://personal-host-rt-rw-nu.vercel.app",
        repo: "https://github.com/Crown-us/personal-host-rt-rw",
      },
    },
    slug: "rtrw-community-platform",
    title: "RTRW DIGITAL",
    category: "Community",
    image: "/images/projects/rtrw-digital.png",
    description:
      "Platform manajemen lingkungan modern untuk RT/RW yang mengintegrasikan iuran otomatis, transparansi kas warga, permohonan surat pengantar digital, dan pusat informasi dalam satu ekosistem web terpadu.",
    impact:
      "🏛️ Digitalisasi RT/RW · Iuran Otomatis & Kas Transparan · Surat Digital",
    year: "2026",
    services: [
      "Multi-Tenant Web Architecture",
      "Inertia.js & Laravel 11",
      "OTP 2FA Authentication",
      "Sistem Kas & Iuran Warga",
    ],
    tech: [
      "Laravel 11",
      "React",
      "Inertia.js",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "Shadcn UI",
    ],
    githubUrl: "https://github.com/Crown-us/personal-host-rt-rw",
    demoUrl: "https://personal-host-rt-rw-nu.vercel.app",
  },
];
