import { getPosts } from "@/lib/blog";
import { projects } from "@/lib/projects";
import { products } from "@/lib/store";
import { translate } from "@/lib/i18n";
import { buildSearchIndex } from "@/lib/search";

export function GET(request: Request) {
  const locale =
    new URL(request.url).searchParams.get("locale") === "en" ? "en" : "id";
  const entries = buildSearchIndex(
    getPosts(false),
    projects,
    products,
    locale,
  ).map((entry) => ({
    ...entry,
    summary:
      entry.kind === "article"
        ? entry.summary
        : translate(entry.summary, locale),
    keywords: `${entry.keywords} ${translate(entry.keywords, locale)}`,
  }));
  return Response.json(entries, {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
