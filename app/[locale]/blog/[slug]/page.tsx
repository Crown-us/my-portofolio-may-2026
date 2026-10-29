import { T, PostDate } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import Image from "@/app/components/LocalizedImage";
import { notFound } from "next/navigation";
import SiteShell from "@/app/components/SiteShell";
import { getPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/blog-core";
import { buildSeo, localizeSeo } from "@/lib/seo";
import { canonicalUrl, jsonLd } from "@/lib/domain";
import s from "@/lib/styles";
import b from "@/app/blog/blog.module.css";
type Props = { params: Promise<{ slug: string; locale: string }> };
export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const post = getPosts().find((p) => p.slug === slug);
  if (!post) return { title: "Post not found", robots: { index: false } };
  return {
    ...localizeSeo(
      buildSeo(post.title, `/blog/${slug}`, post.summary, post.coverImage),
      locale,
    ),
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function PostPage({ params }: Props) {
  const { slug, locale } = await params;
  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const post = posts[index];
  const rendered = await renderMarkdown(post.content);
  return (
    <SiteShell>
      <Link className={s.back} href="/blog">
        <T>← All notes</T>
      </Link>
      <article>
        <header className={b.postHeader}>
          <p className={b.meta}>
            <time dateTime={post.date}>
              <PostDate value={post.date} />
            </time>{" "}
            ·<T> </T>
            <T>{post.readingMinutes}</T> <T>min read </T> ·{" "}
            <T>Article in Indonesian</T>
            <T>{post.draft && "· Draft preview"}</T>
          </p>
          <h1 lang="id">{post.title}</h1>
          <p>{post.summary}</p>
          <div className={s.tags}>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </header>
        {post.coverImage && (
          <Image
            className={b.cover}
            src={post.coverImage}
            alt=""
            width={1200}
            height={675}
            priority
          />
        )}
        <div className={b.readingLayout}>
          {!!rendered.toc.length && (
            <nav
              className={b.toc}
              aria-label={locale === "id" ? "Daftar isi" : "Table of contents"}
            >
              <h2>
                <T>In this note</T>
              </h2>
              {rendered.toc.map((heading) => (
                <a
                  href={`#${heading.id}`}
                  key={heading.id}
                  data-level={heading.level}
                >
                  {heading.title}
                </a>
              ))}
            </nav>
          )}
          <div
            className={b.prose}
            lang="id"
            dangerouslySetInnerHTML={{ __html: rendered.html }}
          />
        </div>
      </article>
      <nav
        className={s.pageNeighbours}
        aria-label={locale === "id" ? "Artikel lainnya" : "Other posts"}
      >
        {index > 0 ? (
          <Link href={`/blog/${posts[index - 1].slug}`}>
            ← <T>{posts[index - 1].title}</T>
          </Link>
        ) : (
          <span />
        )}
        {index < posts.length - 1 && (
          <Link href={`/blog/${posts[index + 1].slug}`}>
            <T>{posts[index + 1].title}</T> →
          </Link>
        )}
      </nav>
      {!post.draft && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.title,
              description: post.summary,
              datePublished: post.date,
              url: canonicalUrl(`/${locale}/blog/${post.slug}`),
              author: {
                "@type": "Person",
                name: "Kevin Dwi Wijaya",
                url: canonicalUrl(`/${locale}/about`),
              },
            }),
          }}
        />
      )}
    </SiteShell>
  );
}
