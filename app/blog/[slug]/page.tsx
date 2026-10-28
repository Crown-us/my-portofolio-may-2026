import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteShell from "../../components/SiteShell";
import { getPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/blog-core";
import { buildSeo } from "@/lib/seo";
import { canonicalUrl, formatPostDate, jsonLd } from "@/lib/domain";
import s from "@/lib/styles";
import b from "../blog.module.css";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPosts().find((p) => p.slug === slug);
  if (!post) return { title: "Post not found", robots: { index: false } };
  return {
    ...buildSeo(post.title, `/blog/${slug}`, post.summary, post.coverImage),
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}
export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const posts = getPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const post = posts[index];
  const rendered = await renderMarkdown(post.content);
  return (
    <SiteShell>
      <Link className={s.back} href="/blog">
        ← All notes
      </Link>
      <article>
        <header className={b.postHeader}>
          <p className={b.meta}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time> ·{" "}
            {post.readingMinutes} min read {post.draft && "· Draft preview"}
          </p>
          <h1>{post.title}</h1>
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
            <nav className={b.toc} aria-label="Table of contents">
              <h2>In this note</h2>
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
            dangerouslySetInnerHTML={{ __html: rendered.html }}
          />
        </div>
      </article>
      <nav className={s.pageNeighbours} aria-label="Other posts">
        {index > 0 ? (
          <Link href={`/blog/${posts[index - 1].slug}`}>
            ← {posts[index - 1].title}
          </Link>
        ) : (
          <span />
        )}
        {index < posts.length - 1 && (
          <Link href={`/blog/${posts[index + 1].slug}`}>
            {posts[index + 1].title} →
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
              url: canonicalUrl(`/blog/${post.slug}`),
              author: {
                "@type": "Person",
                name: "Kevin Dwi Wijaya",
                url: canonicalUrl("/about"),
              },
            }),
          }}
        />
      )}
    </SiteShell>
  );
}
