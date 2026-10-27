import type { Metadata } from "next";
import { canonicalUrl, DEFAULT_DESCRIPTION } from "./domain.ts";
export function buildSeo(
  title: string,
  path: string,
  description = "",
  image = "/opengraph-image",
): Metadata {
  const summary = description.trim() || DEFAULT_DESCRIPTION;
  const fullTitle = title.includes("Kevin Dwi Wijaya")
    ? title
    : `${title} — Kevin Dwi Wijaya`;
  return {
    title: fullTitle,
    description: summary,
    alternates: { canonical: canonicalUrl(path) },
    openGraph: {
      title: fullTitle,
      description: summary,
      url: canonicalUrl(path),
      type: "website",
      images: [{ url: canonicalUrl(image) }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: summary,
      images: [canonicalUrl(image)],
    },
  };
}
