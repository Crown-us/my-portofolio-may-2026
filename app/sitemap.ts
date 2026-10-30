import { locales, localePath } from "@/lib/i18n";
import { getPosts } from "@/lib/blog";
import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { products } from "@/lib/store";
import { sitemapPaths, canonicalUrl } from "@/lib/domain";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    ...sitemapPaths(projects, products),
    "/blog",
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
  return [
    ...pages,
    ...getPosts(false).map((post) => ({
      url: canonicalUrl(`/id/blog/${post.slug}`),
      lastModified: post.updated ?? post.date,
      alternates: {
        languages: {
          id: canonicalUrl(`/id/blog/${post.slug}`),
          "x-default": canonicalUrl(`/id/blog/${post.slug}`),
        },
      },
    })),
  ];
}
