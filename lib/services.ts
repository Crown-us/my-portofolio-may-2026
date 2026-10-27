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
// These service areas already existed in siteConfig. Pricing and durations require owner confirmation.
export const services: Service[] = [
  {
    slug: "web-development",
    title: "Full-stack web development",
    summary: "Web applications with connected interfaces, data, and APIs.",
    deliverables: ["Responsive web interface", "Backend and API integration"],
    idealFor: [],
    startingPrice: null,
    priceNote: "Scope is agreed before a quote.",
    estimatedDuration: "",
    techStack: ["Next.js", "React", "Laravel"],
  },
  {
    slug: "mobile-development",
    title: "Cross-platform mobile apps",
    summary: "Mobile experiences built with Flutter for iOS and Android.",
    deliverables: ["Flutter application", "API integration"],
    idealFor: [],
    startingPrice: null,
    priceNote: "Scope is agreed before a quote.",
    estimatedDuration: "",
    techStack: ["Flutter", "Dart"],
  },
  {
    slug: "backend-api",
    title: "Backend & API engineering",
    summary: "Application APIs, authentication, and database integration.",
    deliverables: ["REST API implementation", "Database integration"],
    idealFor: [],
    startingPrice: null,
    priceNote: "Scope is agreed before a quote.",
    estimatedDuration: "",
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
