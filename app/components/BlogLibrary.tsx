"use client";
import { T } from "@/app/components/LocaleProvider";

import { useEffect, useState } from "react";
import BlogPostCard from "./BlogPostCard";
import type { Post } from "@/lib/blog-core";
import s from "@/lib/styles";
import b from "../blog/blog.module.css";

type PostMeta = Omit<Post, "content">;

function readTag() {
  return new URLSearchParams(window.location.search).get("tag") ?? "";
}

export default function BlogLibrary({ posts }: { posts: PostMeta[] }) {
  const [tag, setTag] = useState("");
  const tags = [...new Set(posts.flatMap((p) => p.tags))];

  useEffect(() => {
    const sync = () => setTag(readTag());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  function selectTag(value: string) {
    setTag(value);
    const url = new URL(window.location.href);
    if (value) url.searchParams.set("tag", value);
    else url.searchParams.delete("tag");
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }

  const active = tags.includes(tag) ? tag : "";
  const visible = posts.filter((p) => !active || p.tags.includes(active));
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2>
          <T>Artikel terbaru</T>
        </h2>
        <span role="status">
          <T>{visible.length}</T>{" "}
          <T>{visible.length === 1 ? "post" : "posts"}</T>
        </span>
      </div>
      <div className={s.filters}>
        {["", ...tags].map((value) => (
          <button
            className={s.button}
            aria-pressed={active === value}
            key={value}
            onClick={() => selectTag(value)}
          >
            <T>{value || "All posts"}</T>
          </button>
        ))}
      </div>
      <div className={b.postGrid}>
        {visible.map((post) => (
          <BlogPostCard post={post} key={post.slug} />
        ))}
      </div>
    </section>
  );
}
