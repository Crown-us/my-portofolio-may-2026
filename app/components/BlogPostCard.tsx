import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/blog-core";
import { formatPostDate } from "@/lib/domain";
import s from "@/lib/styles";
import b from "../blog/blog.module.css";

type PostMeta = Omit<Post, "content">;

export default function BlogPostCard({ post }: { post: PostMeta }) {
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
