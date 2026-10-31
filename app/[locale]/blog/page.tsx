import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import { BookOpen, ArrowUpRight } from "lucide-react";
import SiteShell from "@/app/components/SiteShell";
import BlogLibrary from "@/app/components/BlogLibrary";
import { getPosts } from "@/lib/blog";
import { buildSeo, localizeSeo } from "@/lib/seo";
import s from "@/lib/styles";
import b from "@/app/blog/blog.module.css";
const introFor = (locale: string) =>
  locale === "en"
    ? "My notes on AI, technology, and what I learn while building applications."
    : "Catatan saya tentang AI, teknologi, dan hal yang saya pelajari saat membangun aplikasi.";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const posts = getPosts();
  return (
    <SiteShell>
      <header className={b.editorialIntro}>
        <h1>Blog</h1>
        <p>{introFor(locale)}</p>
      </header>
      {posts.length ? (
        <BlogLibrary
          posts={posts.map(({ content, ...post }) => {
            void content;
            return post;
          })}
        />
      ) : (
        <section className={b.empty}>
          <BookOpen size={28} strokeWidth={1.5} />
          <h2>
            <T>No posts published yet.</T>
          </h2>
          <p>
            <T>When there’s a story to share, you’ll find it here.</T>
            <br />
            <T>For now, explore the projects behind the work.</T>
          </p>
          <Link className={s.button} href="/projects">
            <T>Explore projects </T>
            <ArrowUpRight size={15} />
          </Link>
        </section>
      )}
      <div className={b.feed}>
        <span>
          <T>Prefer your own reader?</T>
        </span>
        <a href="/rss.xml">
          <T>RSS feed ↗</T>
        </a>
      </div>
    </SiteShell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizeSeo(buildSeo("Blog", "/blog", introFor(locale)), locale);
}
