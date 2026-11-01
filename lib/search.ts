export interface SearchEntry {
  title: string;
  summary: string;
  keywords: string;
  href: string;
  kind: "article" | "project" | "product";
}

export function buildSearchIndex(
  posts: {
    title: string;
    slug: string;
    summary: string;
    tags: string[];
    draft: boolean;
  }[],
  projects: { title: string; slug: string; summary: string; tech: string[] }[],
  products: {
    title: string;
    slug: string;
    tagline: string;
    techStack: string[];
  }[],
  locale: "id" | "en",
): SearchEntry[] {
  return [
    ...posts
      .filter((post) => !post.draft)
      .map((post) => ({
        title: post.title,
        summary: post.summary,
        keywords: post.tags.join(" "),
        href: `/id/blog/${post.slug}`,
        kind: "article" as const,
      })),
    ...projects.map((project) => ({
      title: project.title,
      summary: project.summary,
      keywords: project.tech.join(" "),
      href: `/${locale}/projects/${project.slug}`,
      kind: "project" as const,
    })),
    ...products.map((product) => ({
      title: product.title,
      summary: product.tagline,
      keywords: product.techStack.join(" "),
      href: `/${locale}/store/${product.slug}`,
      kind: "product" as const,
    })),
  ];
}

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function searchEntries(
  entries: SearchEntry[],
  query: string,
): SearchEntry[] {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return entries
    .filter((entry) => {
      const text = normalize(
        `${entry.title} ${entry.summary} ${entry.keywords}`,
      );
      return terms.every((term) => text.includes(term));
    })
    .sort((a, b) => {
      const score = (entry: SearchEntry) =>
        terms.filter((term) => normalize(entry.title).includes(term)).length;
      return score(b) - score(a);
    })
    .slice(0, 12);
}
