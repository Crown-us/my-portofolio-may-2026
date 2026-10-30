import type { Post } from "./blog-core.ts";
import { buildSeo } from "./seo.ts";
import { canonicalUrl } from "./domain.ts";

export function articlePath(slug: string) {
  return `/id/blog/${slug}`;
}
export function articleSeo(post: Post) {
  const url = canonicalUrl(articlePath(post.slug));
  const metadata = buildSeo(
    post.title,
    articlePath(post.slug),
    post.summary,
    post.coverImage,
  );
  return {
    ...metadata,
    alternates: { canonical: url, languages: { id: url, "x-default": url } },
    openGraph: {
      ...metadata.openGraph,
      type: "article" as const,
      locale: "id_ID",
      publishedTime: post.date,
      ...(post.updated ? { modifiedTime: post.updated } : {}),
      authors: [canonicalUrl("/id/about")],
    },
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}
