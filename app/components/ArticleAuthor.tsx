import Image from "@/app/components/LocalizedImage";
import Link from "@/app/components/LocalizedLink";
import { siteConfig } from "@/lib/config";
import a from "./ArticleAuthor.module.css";
import { PostDate } from "@/app/components/LocaleProvider";
import type { Post } from "@/lib/blog-core";

export default function ArticleAuthor({
  locale,
  compact = false,
  post,
}: {
  locale: string;
  compact?: boolean;
  post?: Pick<Post, "date" | "readingMinutes">;
}) {
  const en = locale === "en";
  if (compact)
    return (
      <div className={a.byline}>
        <Image
          src="/images/kevin-author.png"
          alt=""
          width={36}
          height={36}
          className={a.smallPortrait}
        />
        <div>
          <Link href="/about" rel="author">
            {siteConfig.name}
          </Link>
          {post && (
            <p className={a.meta}>
              <time dateTime={post.date}>
                <PostDate value={post.date} />
              </time>{" "}
              · {post.readingMinutes} {en ? "min read" : "menit baca"}
            </p>
          )}
        </div>
      </div>
    );

  return (
    <section className={a.profile} aria-labelledby="article-author-heading">
      <Image
        src="/images/kevin-author.png"
        alt={siteConfig.name}
        width={56}
        height={56}
        className={a.portrait}
      />
      <div className={a.details}>
        <p className={a.label}>{en ? "Written by" : "Ditulis oleh"}</p>
        <h2 id="article-author-heading">
          <Link href="/about" rel="author">
            {siteConfig.name}
          </Link>
        </h2>
        <p className={a.bio}>
          {en
            ? "Web and mobile developer. Writing about AI and everyday technology."
            : "Pengembang web dan aplikasi mobile. Menulis tentang AI dan teknologi untuk keseharian."}
        </p>
        <div className={a.links}>
          <Link href="/about">
            {en ? "View profile" : "Lihat profil"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
