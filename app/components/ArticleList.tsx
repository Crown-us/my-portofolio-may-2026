import Image from "@/app/components/LocalizedImage";
import Link from "@/app/components/LocalizedLink";
import { PostDate } from "@/app/components/LocaleProvider";
import { postTypeLabels } from "@/lib/blog-taxonomy";
import type { Post } from "@/lib/blog-core";
import c from "./ArticleList.module.css";

export default function ArticleList({
  posts,
  locale,
  related = false,
}: {
  posts: Omit<Post, "content">[];
  locale: string;
  related?: boolean;
}) {
  const en = locale === "en";
  const Heading = related ? "h3" : "h2";
  return (
    <div className={c.list}>
      {posts.map((post, index) => (
        <article className={c.row} key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            contentLocale="id"
            className={c.link}
          >
            <div className={c.copy}>
              <p className={c.type}>
                {postTypeLabels[en ? "en" : "id"][post.type]}
              </p>
              <Heading lang="id">{post.title}</Heading>
              <p className={c.summary} lang="id">
                {post.summary}
              </p>
              <p className={c.meta}>
                <time dateTime={post.date}>
                  <PostDate value={post.date} />
                </time>
                <span>
                  {" "}
                  · {post.readingMinutes} {en ? "min read" : "menit baca"}
                  {en && " · In Indonesian"}
                </span>
              </p>
            </div>
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt=""
                width={180}
                height={135}
                sizes="(max-width:700px) 88px, 160px"
                className={c.image}
                priority={!related && index === 0}
              />
            )}
          </Link>
        </article>
      ))}
    </div>
  );
}
