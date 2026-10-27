export interface Service {
  slug: string;
  title: string;
  summary: string;
  deliverables: string[];
  idealFor: string[];
  startingPrice: number | null;
  priceNote: string;
  estimatedDuration: string;
  techStack: string[];
}
// Starting prices are entry points for the smallest agreed scope. Final quotes follow a scope discussion.
export const services: Service[] = [
  {
    slug: "landing-page",
    title: "Landing page & company profile",
    summary:
      "A focused single-page site for a product, personal brand, or small business.",
    deliverables: [
      "Single-page responsive site",
      "Basic SEO and analytics setup",
    ],
    idealFor: ["Personal brands", "Small businesses", "Product launches"],
    startingPrice: 600000,
    priceNote: "Entry price covers a single page without a backend.",
    estimatedDuration: "3–7 days",
    techStack: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    slug: "web-development",
    title: "Full-stack web development",
    summary: "Web applications with connected interfaces, data, and APIs.",
    deliverables: ["Responsive web interface", "Backend and API integration"],
    idealFor: ["Small businesses", "Agencies", "Internal tools"],
    startingPrice: 2500000,
    priceNote: "Scope is agreed before a quote.",
    estimatedDuration: "2–4 weeks",
    techStack: ["Next.js", "React", "Laravel"],
  },
  {
    slug: "mobile-development",
    title: "Cross-platform mobile apps",
    summary: "Mobile experiences built with Flutter for iOS and Android.",
    deliverables: ["Flutter application", "API integration"],
    idealFor: ["Customer-facing services", "Field teams"],
    startingPrice: 3000000,
    priceNote: "Scope is agreed before a quote.",
    estimatedDuration: "4–6 weeks",
    techStack: ["Flutter", "Dart"],
  },
  {
    slug: "backend-api",
    title: "Backend & API engineering",
    summary: "Application APIs, authentication, and database integration.",
    deliverables: ["REST API implementation", "Database integration"],
    idealFor: ["Teams adding an API", "Dashboard integrations"],
    startingPrice: 1500000,
    priceNote: "Scope is agreed before a quote.",
    estimatedDuration: "1–3 weeks",
    techStack: ["Laravel", "Node.js", "PostgreSQL"],
  },
];
export const serviceIntro =
  "Have a product to build or an existing system to improve? These are the areas I work in. Tell me about your needs so we can agree on the scope.";
export const workSteps = [
  "Discuss the brief",
  "Agree on scope and quote",
  "Build in milestones",
  "Review together",
  "Deploy and hand over",
];
export const serviceFaq = [
  {
    question: "How is pricing determined?",
    answer:
      "Pricing depends on the agreed scope. Share your requirements through the contact form to request a quote.",
  },
  {
    question: "Where should I start?",
    answer:
      "Choose a service and describe the problem you want to solve. Include any existing links or references in your message.",
  },
];
