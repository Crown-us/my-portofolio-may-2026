import { T, PostDate } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import Image from "@/app/components/LocalizedImage";
import { notFound, permanentRedirect } from "next/navigation";
import SiteShell from "@/app/components/SiteShell";
import ArticleAuthor from "@/app/components/ArticleAuthor";
import ArticleSources from "@/app/components/ArticleSources";
import ArticleList from "@/app/components/ArticleList";
import { relatedPosts } from "@/lib/blog-related";
import { getPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/blog-core";
import { articlePath, articleSeo } from "@/lib/blog-seo";
import { canonicalUrl, jsonLd } from "@/lib/domain";
import s from "@/lib/styles";
import b from "@/app/blog/blog.module.css";
type Props = { params: Promise<{ slug: string; locale: string }> };
export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPosts().find((p) => p.slug === slug);
  if (!post) return { title: "Post not found", robots: { index: false } };
  return articleSeo(post);
}
export default async function PostPage({ params }: Props) {
  const { slug, locale } = await params;
  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  if (locale === "en") permanentRedirect(articlePath(slug));
  const post = posts[index];
  const rendered = await renderMarkdown(post.content);
  return (
    <SiteShell>
      <Link className={s.back} href="/blog">
        <T>← All notes</T>
      </Link>
      <article>
        <header className={b.postHeader}>
          <h1 lang="id">{post.title}</h1>
          <p>{post.summary}</p>
          <ArticleAuthor locale={locale} compact post={post} />
          {post.updated && (
            <p className={b.meta}>
              {locale === "en" ? "Updated" : "Diperbarui"}{" "}
              <time dateTime={post.updated}>
                <PostDate value={post.updated} />
              </time>
            </p>
          )}
          {post.draft && (
            <p className={b.meta}>
              <T>Draft preview</T>
            </p>
          )}
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
        <ArticleSources sources={post.sources} locale={locale} />
        <ArticleAuthor locale={locale} />
      </article>
      {relatedPosts(posts, post).length > 0 && (
        <section
          className={s.section}
          aria-labelledby="related-articles-heading"
        >
          <h2 id="related-articles-heading">
            {locale === "en" ? "Read next" : "Baca selanjutnya"}
          </h2>
          <ArticleList
            posts={relatedPosts(posts, post)}
            locale={locale}
            related
          />
        </section>
      )}
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
              inLanguage: "id",
              mainEntityOfPage: canonicalUrl(articlePath(post.slug)),
              ...(post.coverImage
                ? { image: canonicalUrl(post.coverImage) }
                : {}),
              ...(post.updated ? { dateModified: post.updated } : {}),
              ...(post.sources.length
                ? { citation: post.sources.map((source) => source.url) }
                : {}),
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
