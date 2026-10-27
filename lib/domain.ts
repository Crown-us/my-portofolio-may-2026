export const SITE_URL = "https://kvndwi.com";
export const DEFAULT_DESCRIPTION =
  "Kevin Dwi Wijaya — full-stack and mobile engineer in Kediri, Indonesia.";
export const BUDGET_RANGES = [
  "Under Rp 5 million",
  "Rp 5–15 million",
  "Rp 15–30 million",
  "Over Rp 30 million",
  "To be discussed",
];
export function canonicalUrl(path = "/") {
  return new URL(`/${path.replace(/^[\\/]+/, "")}`, SITE_URL).href;
}
export function formatPrice(value: number | null, isProduct = false) {
  if (value === null) return isProduct ? "Free" : "Contact for quote";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
export function getFeatured<T extends { isFeatured: boolean }>(items: T[]) {
  return items.filter((item) => item.isFeatured).slice(0, 3);
}
export function findProject<T extends { slug: string }>(
  items: T[],
  slug: string,
) {
  return items.find((item) => item.slug === slug);
}
export function visibleSections(data: Record<string, unknown>) {
  return Object.keys(data).filter((key) => {
    const value = data[key];
    return Array.isArray(value)
      ? value.length > 0
      : typeof value === "string"
        ? value.trim().length > 0
        : value !== null && value !== undefined;
  });
}
export function serviceSelection(value: unknown, slugs: string[]) {
  return typeof value === "string" && slugs.includes(value) ? value : "";
}
export function isHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}
export function sitemapPaths(
  projects: { slug: string }[],
  products: { slug: string }[],
) {
  return [
    "/",
    "/projects",
    "/about",
    "/services",
    "/contact",
    "/resume",
    ...projects.map((item) => `/projects/${item.slug}`),
    ...(products.length
      ? ["/store", ...products.map((item) => `/store/${item.slug}`)]
      : []),
  ];
}
interface StoreValidation {
  slug: string;
  checkoutUrl: string;
  platform: string;
  price: number | null;
  currency: string;
}
export function validateProducts(items: StoreValidation[]) {
  const slugs = new Set<string>();
  const hosts: Record<string, string[]> = {
    gumroad: ["gumroad.com"],
    trakteer: ["trakteer.id"],
    lynk: ["lynk.id"],
  };
  for (const item of items) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug) || slugs.has(item.slug))
      throw new Error(`Invalid or duplicate product slug: ${item.slug}`);
    if (!isHttpsUrl(item.checkoutUrl))
      throw new Error(`Invalid checkout URL: ${item.slug}`);
    const host = new URL(item.checkoutUrl).hostname;
    if (
      !hosts[item.platform]?.some(
        (base) => host === base || host.endsWith(`.${base}`),
      )
    )
      throw new Error(`Checkout platform mismatch: ${item.slug}`);
    if (
      item.currency !== "IDR" ||
      (item.price !== null && (!Number.isFinite(item.price) || item.price < 0))
    )
      throw new Error(`Invalid price: ${item.slug}`);
    slugs.add(item.slug);
  }
}
export interface ContactInput {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  website: string;
}
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
export function validateContact(input: unknown, serviceSlugs: string[]) {
  const raw =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const data = Object.fromEntries(
    ["name", "email", "service", "budget", "message", "website"].map((key) => [
      key,
      typeof raw[key] === "string" ? raw[key].trim() : "",
    ]),
  ) as unknown as ContactInput;
  const errors: ContactErrors = {};
  if (data.name.length < 2 || data.name.length > 100)
    errors.name = "Enter your name (2–100 characters).";
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Enter a valid email address.";
  if (data.message.length < 10 || data.message.length > 5000)
    errors.message = "Write a message of 10–5,000 characters.";
  if (data.service && !serviceSlugs.includes(data.service))
    errors.service = "Choose an available service.";
  if (data.budget && !BUDGET_RANGES.includes(data.budget))
    errors.budget = "Choose a listed budget range.";
  if (
    data.website ||
    (raw.website !== undefined && typeof raw.website !== "string")
  )
    errors.website = "Unable to submit this request.";
  for (const key of ["name", "email", "service", "budget", "message"] as const)
    if (raw[key] !== undefined && typeof raw[key] !== "string")
      errors[key] = "Expected text.";
  return { isValid: Object.keys(errors).length === 0, data, errors };
}
export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
