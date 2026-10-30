import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import type { Root, Element, RootContent } from "hast";
import { canonicalUrl } from "./domain.ts";
import { isPostType, type PostType } from "./blog-taxonomy.ts";
export interface Post {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  sources: { name: string; url: string }[];
  summary: string;
  tags: string[];
  type: PostType;
  draft: boolean;
  coverImage?: string;
  content: string;
  readingMinutes: number;
}
export interface Heading {
  id: string;
  title: string;
  level: number;
}
export function parsePost(source: string, filename: string): Post {
  // Explicit options bypass gray-matter's cache, which drops the
  // non-enumerable raw frontmatter needed to validate plain YAML dates.
  const {
    data,
    content,
    matter: frontmatter,
  } = matter(source, {
    language: "yaml",
  });
  const fail = (field: string): never => {
    throw new Error(`${filename}: invalid ${field}`);
  };
  for (const key of ["title", "slug", "summary"])
    if (typeof data[key] !== "string" || !data[key].trim()) fail(key);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) fail("slug");
  // CMS serializers may emit a plain YAML date. Validate its original text
  // instead of accepting YAML's automatic rollover of impossible dates.
  const date =
    data.date instanceof Date
      ? frontmatter.match(
          /^date:[ \t]*(\d{4}-\d{2}-\d{2})[ \t]*(?:#.*)?$/m,
        )?.[1]
      : data.date;
  if (
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date
  )
    fail("date (use YYYY-MM-DD)");
  if (typeof data.draft !== "boolean") fail("draft");
  const updated =
    data.updated instanceof Date
      ? frontmatter.match(
          /^updated:[ \t]*(\d{4}-\d{2}-\d{2})[ \t]*(?:#.*)?$/m,
        )?.[1]
      : data.updated;
  const hasUpdated =
    data.updated !== undefined && data.updated !== null && data.updated !== "";
  if (
    hasUpdated &&
    (typeof updated !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(updated) ||
      !Number.isFinite(Date.parse(updated)) ||
      new Date(updated).toISOString().slice(0, 10) !== updated ||
      updated < date)
  )
    fail("updated (use YYYY-MM-DD, on or after publication)");
  const sources = data.sources ?? [];
  if (!Array.isArray(sources)) fail("sources");
  for (const item of sources) {
    if (
      !item ||
      typeof item.name !== "string" ||
      !item.name.trim() ||
      typeof item.url !== "string"
    )
      fail("sources (name and URL required)");
    try {
      const url = new URL(item.url);
      if (
        !["https:", "http:"].includes(url.protocol) ||
        url.username ||
        url.password
      )
        fail("sources (use a public http or https URL)");
    } catch {
      fail("sources (use a public http or https URL)");
    }
  }
  if (
    !Array.isArray(data.tags) ||
    data.tags.some((tag: unknown) => typeof tag !== "string" || !tag.trim())
  )
    fail("tags");
  const coverImage =
    data.coverImage === "" || data.coverImage === null
      ? undefined
      : data.coverImage;
  if (
    coverImage !== undefined &&
    (typeof coverImage !== "string" || !/^\/(?!\/)[^\\]+$/.test(coverImage))
  )
    fail("coverImage (use a local public path)");
  if (!content.trim()) fail("content");
  // Older articles remain readable until their CMS entry is saved with a type.
  const type =
    data.type ??
    (data.tags.includes("Berita")
      ? "news"
      : data.tags.includes("Perbandingan")
        ? "comparison"
        : "guide");
  if (!isPostType(type)) fail("type (use news, guide, or comparison)");
  return {
    title: data.title.trim(),
    slug: data.slug,
    date,
    updated: hasUpdated ? updated : undefined,
    sources: sources.map((item: { name: string; url: string }) => ({
      name: item.name.trim(),
      url: item.url.trim(),
    })),
    summary: data.summary.trim(),
    tags: [...new Set<string>(data.tags)].filter(
      (tag) => tag !== "Berita" && tag !== "Perbandingan",
    ),
    type,
    draft: data.draft,
    coverImage,
    content,
    readingMinutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
  };
}
export function selectPosts(
  posts: Post[],
  tag?: string,
  includeDrafts = false,
) {
  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug))
      throw new Error(`Duplicate blog slug: ${post.slug}`);
    slugs.add(post.slug);
  }
  return posts
    .filter(
      (post) =>
        (includeDrafts || !post.draft) && (!tag || post.tags.includes(tag)),
    )
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}
function textOf(node: RootContent): string {
  return node.type === "text"
    ? node.value
    : "children" in node
      ? node.children.map(textOf).join("")
      : "";
}
function headingPlugin(toc: Heading[]) {
  return () => (tree: Root) => {
    const counts = new Map<string, number>();
    const walk = (nodes: RootContent[]) => {
      for (const node of nodes) {
        if (node.type !== "element") continue;
        if (/^h[1-6]$/.test(node.tagName)) {
          const title = textOf(node);
          const base =
            title
              .toLowerCase()
              .replace(/[^\p{L}\p{N}]+/gu, "-")
              .replace(/^-|-$/g, "") || "section";
          const count = (counts.get(base) || 0) + 1;
          counts.set(base, count);
          const id = `post-${base}-${count}`;
          node.properties.id = id;
          if (node.tagName === "h1") node.tagName = "h2";
          toc.push({ id, title, level: Number(node.tagName[1]) });
        }
        walk((node as Element).children);
      }
    };
    walk(tree.children);
  };
}
export async function renderMarkdown(content: string) {
  const toc: Heading[] = [];
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeHighlight, { detect: false, ignoreMissing: true })
    .use(headingPlugin(toc))
    .use(rehypeStringify)
    .process(content);
  return { html: String(result), toc };
}
const xml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );
export function rssFeed(posts: Post[]) {
  const items = selectPosts(posts)
    .map(
      (post) =>
        `<item><title>${xml(post.title)}</title><link>${canonicalUrl(`/id/blog/${post.slug}`)}</link><guid>${canonicalUrl(`/id/blog/${post.slug}`)}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${xml(post.summary)}</description></item>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Kevin’s blog</title><link>${canonicalUrl("/blog")}</link><description>Kabar AI, perbandingan tools, dan tips teknologi buat keseharian.</description><language>id</language>${items}</channel></rss>`;
}
