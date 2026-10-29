"use client";
import { T, PostDate, useLocale } from "@/app/components/LocaleProvider";
import { postTypeLabels } from "@/lib/blog-taxonomy";
import Image from "@/app/components/LocalizedImage";
import Link from "@/app/components/LocalizedLink";
import type { Post } from "@/lib/blog-core";
import s from "@/lib/styles";
import b from "../blog/blog.module.css";

type PostMeta = Omit<Post, "content">;

export default function BlogPostCard({ post }: { post: PostMeta }) {
  const locale = useLocale();
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
          <time dateTime={post.date}>
            <PostDate value={post.date} />
          </time>{" "}
          ·<T> </T>
          <T>{post.readingMinutes}</T> <T>min read </T> ·{" "}
          <T>Article in Indonesian</T>
          <T>{post.draft && "· Draft"}</T>
        </p>
        <h3 className={b.postTitle}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.summary}</p>
        <div className={s.tags}>
          <span>{postTypeLabels[locale][post.type]}</span>
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className={b.postFooter}>
          <span className={b.readMore}>
            <T>Read post </T>
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </article>
  );
}
