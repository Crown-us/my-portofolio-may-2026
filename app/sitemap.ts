import { getPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { products } from "@/lib/store";
import { sitemapPaths, canonicalUrl } from "@/lib/domain";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...sitemapPaths(projects, products),
    "/blog",
    ...getPosts(false).map((post) => `/blog/${post.slug}`),
  ].map((path) => ({
    url: canonicalUrl(path),
  }));
}
