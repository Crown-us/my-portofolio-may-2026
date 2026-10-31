"use client";
import { T, useLocale } from "@/app/components/LocaleProvider";
import { translate } from "@/lib/i18n";
import { isPostType, postTypes, postTypeLabels } from "@/lib/blog-taxonomy";

import { useEffect, useState } from "react";
import ArticleList from "./ArticleList";
import BlogFilter from "./BlogFilter";
import type { Post } from "@/lib/blog-core";
import s from "@/lib/styles";
import f from "./BlogLibrary.module.css";

type PostMeta = Omit<Post, "content">;

function readFilters() {
  const query = new URLSearchParams(window.location.search);
  const legacy = query.get("tag");
  const legacyType =
    legacy === "Berita"
      ? "news"
      : legacy === "Perbandingan"
        ? "comparison"
        : "";
  return {
    tag: legacyType ? "" : (legacy ?? ""),
    type: query.get("type") ?? legacyType,
  };
}

export default function BlogLibrary({ posts }: { posts: PostMeta[] }) {
  const [filters, setFilters] = useState({ tag: "", type: "" });
  const locale = useLocale();
  const tags = [...new Set(posts.flatMap((p) => p.tags))];

  useEffect(() => {
    const sync = () => setFilters(readFilters());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  function selectFilter(key: "tag" | "type", value: string) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    const url = new URL(window.location.href);
    for (const field of ["tag", "type"] as const) {
      if (next[field]) url.searchParams.set(field, next[field]);
      else url.searchParams.delete(field);
    }
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }

  const active = tags.includes(filters.tag) ? filters.tag : "";
  const activeType = isPostType(filters.type) ? filters.type : "";
  const visible = posts.filter(
    (p) =>
      (!active || p.tags.includes(active)) &&
      (!activeType || p.type === activeType),
  );
  return (
    <section className={`${s.section} ${f.library}`}>
      <div className={`${s.sectionHead} ${f.toolbar}`}>
        <h2>
          <T>Artikel terbaru</T>
        </h2>
        <div className={f.controls}>
          <BlogFilter
            label={locale === "id" ? "Jenis" : "Type"}
            value={activeType}
            options={[
              {
                value: "",
                label: locale === "id" ? "Semua jenis" : "All types",
              },
              ...postTypes.map((type) => ({
                value: type,
                label: postTypeLabels[locale][type],
              })),
            ]}
            onChange={(value) => selectFilter("type", value)}
          />
          <BlogFilter
            label={locale === "id" ? "Topik" : "Topic"}
            value={active}
            options={[
              {
                value: "",
                label: locale === "id" ? "Semua topik" : "All topics",
              },
              ...tags.map((value) => ({
                value,
                label: translate(value, locale),
              })),
            ]}
            onChange={(value) => selectFilter("tag", value)}
          />
          <span role="status" className={f.count}>
            <T>{visible.length}</T>{" "}
            <T>{visible.length === 1 ? "post" : "posts"}</T>
          </span>
        </div>
      </div>
      <ArticleList posts={visible} locale={locale} related />
      {visible.length === 0 && (
        <p className={f.empty} role="status">
          {locale === "id"
            ? "Belum ada artikel untuk kombinasi ini. Coba jenis atau topik lain."
            : "No articles match these filters. Try another type or topic."}
        </p>
      )}
    </section>
  );
}
