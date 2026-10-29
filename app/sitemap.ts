import { locales, localePath } from "@/lib/i18n";
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
  ].flatMap((path) =>
    locales.map((locale) => ({
      url: canonicalUrl(localePath(path, locale)),
      alternates: {
        languages: {
          id: canonicalUrl(localePath(path, "id")),
          en: canonicalUrl(localePath(path, "en")),
        },
      },
    })),
  );
}
