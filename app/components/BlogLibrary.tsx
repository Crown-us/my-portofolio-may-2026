"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog-core";
import s from "@/lib/styles";
import b from "../blog/blog.module.css";
export default function BlogLibrary({
  posts,
}: {
  posts: Omit<Post, "content">[];
}) {
  const [tag, setTag] = useState("");
  const tags = [...new Set(posts.flatMap((p) => p.tags))];
  const visible = posts.filter((p) => !tag || p.tags.includes(tag));
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2>Latest notes</h2>
        <span role="status">{visible.length} posts</span>
      </div>
      <div className={s.filters}>
        {["", ...tags].map((value) => (
          <button
            className={s.button}
            aria-pressed={tag === value}
            key={value}
            onClick={() => setTag(value)}
          >
            {value || "All posts"}
          </button>
        ))}
      </div>
      <div className={s.projectGrid}>
        {visible.map((post) => (
          <article className={s.card} key={post.slug}>
            {post.coverImage && (
              <Image
                className={b.cover}
                src={post.coverImage}
                alt=""
                width={800}
                height={450}
              />
            )}
            <div className={s.cardBody}>
              <p className={b.meta}>
                <time dateTime={post.date}>{post.date}</time> ·{" "}
                {post.readingMinutes} min read {post.draft && "· Draft"}
              </p>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.summary}</p>
              <div className={s.tags}>
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <Link className={s.textLink} href={`/blog/${post.slug}`}>
                Read post →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
