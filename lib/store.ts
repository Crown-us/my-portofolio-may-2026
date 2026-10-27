import { validateProducts } from "./domain.ts";
export interface Product {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  price: number | null;
  currency: "IDR";
  coverImage: string;
  gallery: { src: string; alt: string; caption: string }[];
  features: string[];
  whatsIncluded: string[];
  requirements: string[];
  techStack: string[];
  demoUrl?: string;
  checkoutUrl: string;
  platform: "gumroad" | "trakteer" | "lynk";
  updatedAt: string;
  isFeatured: boolean;
}
// No finished products or checkout URLs have been supplied. Do not publish placeholder products.
export const products: Product[] = [];
validateProducts(products);
