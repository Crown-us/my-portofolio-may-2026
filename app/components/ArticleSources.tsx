import type { Post } from "@/lib/blog-core";
import c from "./ArticleSources.module.css";

export default function ArticleSources({
  sources,
  locale,
}: {
  sources: Post["sources"];
  locale: string;
}) {
  if (!sources.length) return null;
  return (
    <section className={c.sources} aria-labelledby="article-sources-heading">
      <h2 id="article-sources-heading">
        {locale === "en" ? "Sources" : "Sumber"}
      </h2>
      <ul>
        {sources.map((source, index) => (
          <li key={`${source.url}-${index}`}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.name}
              <span aria-hidden="true"> ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
