import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { products } from "@/lib/store";
import { sitemapPaths, canonicalUrl } from "@/lib/domain";
export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPaths(projects, products).map((path) => ({
    url: canonicalUrl(path),
  }));
}
