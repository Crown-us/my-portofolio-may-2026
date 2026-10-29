"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog-core";
import { formatPostDate } from "@/lib/domain";
import s from "@/lib/styles";
import b from "../blog/blog.module.css";

type PostMeta = Omit<Post, "content">;

function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className={`${s.card} ${b.postCard}`}>
      {post.coverImage && (
        <Image
          className={b.cardCover}
          src={post.coverImage}
          alt=""
          width={800}
          height={450}
          sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 550px"
        />
      )}
      <div className={b.postBody}>
        <p className={b.meta}>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
          {post.readingMinutes} min read {post.draft && "· Draft"}
        </p>
        <h3 className={b.postTitle}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.summary}</p>
        <div className={s.tags}>
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className={b.postFooter}>
          <span className={b.readMore}>
            Read post <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}

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
        <h2>Latest notes</h2>
        <span role="status">
          {visible.length} {visible.length === 1 ? "post" : "posts"}
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
            {value || "All posts"}
          </button>
        ))}
      </div>
      <div className={b.postGrid}>
        {visible.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </div>
    </section>
  );
}
