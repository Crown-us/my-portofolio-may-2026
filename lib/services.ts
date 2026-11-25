// Data halaman /jasa. Kontak (WhatsApp dan email) ada di lib/config.ts.
// Teks bahasa Inggris di sini adalah key terjemahan di lib/translations.json.
export interface ServicePackage {
  slug: string;
  title: string;
  summary: string;
  features: string[];
  estimatedDuration: string;
  /** Rupiah. null menampilkan PRICE_PLACEHOLDER. */
  startingPrice: number | null;
}

export const PRICE_PLACEHOLDER = "Rp X.XXX.XXX";

export const services: ServicePackage[] = [
  {
    slug: "landing-page",
    title: "Landing Page",
    summary: "One focused page to introduce a product, promo, or business.",
    features: [
      "Single page that works well on phones",
      "WhatsApp order button",
      "Basic SEO setup",
    ],
    estimatedDuration: "3–7 days", // TODO: konfirmasi durasi
    startingPrice: null, // TODO: isi harga mulai
  },
  {
    slug: "company-profile",
    title: "Company Profile",
    summary:
      "A few pages that explain who you are, what you sell, and how to reach you.",
    features: [
      "Home, about, services, and contact pages",
      "Works well on phones and computers",
      "WhatsApp and email contact",
      "Basic SEO setup",
    ],
    estimatedDuration: "X–X weeks", // TODO: isi durasi
    startingPrice: null, // TODO: isi harga mulai
  },
  {
    slug: "web-app",
    title: "Custom Web App",
    summary:
      "An application that follows your workflow, such as orders, records, or dashboards.",
    features: [
      "Features agreed from your workflow",
      "Database and API integration",
      "Login and access rights when needed",
      "Deployment and handover",
    ],
    estimatedDuration: "2–4 weeks", // TODO: konfirmasi durasi
    startingPrice: null, // TODO: isi harga mulai
  },
];

export const workSteps = [
  {
    title: "Consultation",
    description:
      "Tell me about your business and what the website needs to do.",
  },
  {
    title: "Design and quote",
    description:
      "We agree on the scope, the look, the price, and the schedule.",
  },
  {
    title: "Build",
    description: "I build the website and show you the progress to review.",
  },
  {
    title: "Deploy and handover",
    description: "The website goes online and is handed over to you.",
  },
];

// TODO: ganti X dengan jumlah revisi yang kamu tawarkan.
export const revisionPolicy =
  "Includes X rounds of revisions. Changes outside the agreed scope are quoted separately.";

export const serviceFaq = [
  {
    question: "How is pricing determined?",
    answer:
      "Listed prices are starting points for the smallest scope. The final quote depends on features, integrations, and timeline.",
  },
  {
    question: "What should I prepare?",
    answer:
      "A short description of your business, the goal of the website, and any logo, photos, text, or references you already have.",
  },
  {
    question: "Which package fits me?",
    answer:
      "You do not have to know yet. Describe what you need in a chat and we choose the scope together.",
  },
  {
    question: "Do the packages include a domain and hosting?",
    answer:
      "Domain and hosting costs are confirmed in the quote before any work starts.",
  },
];

export function priceLabel(value: number | null) {
  if (value === null) return PRICE_PLACEHOLDER;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
