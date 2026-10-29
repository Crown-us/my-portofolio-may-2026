import type { Metadata } from "next";
import { canonicalUrl, DEFAULT_DESCRIPTION } from "./domain.ts";
import { isLocale, localePath, translate } from "./i18n.ts";
export function localizeSeo(metadata: Metadata, language: string): Metadata {
  const locale = isLocale(language) ? language : "id";
  const original = metadata.alternates?.canonical;
  const path =
    typeof original === "string"
      ? new URL(original, canonicalUrl()).pathname
      : "/";
  const title =
    typeof metadata.title === "string"
      ? translate(metadata.title, locale)
      : metadata.title;
  const description =
    typeof metadata.description === "string"
      ? translate(metadata.description, locale)
      : metadata.description;
  return {
    ...metadata,
    title,
    description,
    alternates: {
      canonical: canonicalUrl(localePath(path, locale)),
      languages: {
        id: canonicalUrl(localePath(path, "id")),
        en: canonicalUrl(localePath(path, "en")),
        "x-default": canonicalUrl(localePath(path, "id")),
      },
    },
    openGraph: {
      ...metadata.openGraph,
      title: typeof title === "string" ? title : undefined,
      description: description ?? undefined,
      url: canonicalUrl(localePath(path, locale)),
      locale: locale === "id" ? "id_ID" : "en_US",
      alternateLocale: locale === "id" ? "en_US" : "id_ID",
    },
    twitter: {
      ...metadata.twitter,
      title: typeof title === "string" ? title : undefined,
      description: description ?? undefined,
    },
  };
}
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
