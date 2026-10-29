import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import { BookOpen, ArrowUpRight } from "lucide-react";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import BlogLibrary from "@/app/components/BlogLibrary";
import { getPosts } from "@/lib/blog";
import { buildSeo, localizeSeo } from "@/lib/seo";
import s from "@/lib/styles";
import b from "@/app/blog/blog.module.css";
const pageMetadata = buildSeo(
  "Blog",
  "/blog",
  "Kabar AI, perbandingan tools, dan tips teknologi buat keseharian. Ditulis oleh Kevin Dwi Wijaya.",
);
export default function BlogPage() {
  const posts = getPosts();
  return (
    <SiteShell>
      <PageIntro
        title="Teknologi, dibikin masuk akal."
        eyebrow="BLOG / TECH & AI"
      />
      <section className={b.banner}>
        <div className={b.bannerText}>
          <span className={b.label}>
            <T>KENALI TEKNOLOGI, PILIH YANG COCOK</T>
          </span>
          <p>
            <T>
              Kabar AI, perbandingan tools, dan tips teknologi buat keseharian.
            </T>
          </p>
        </div>
        <div className={b.illustration} aria-hidden="true">
          <div className={b.paper}>
            <span>
              <T>kevin / notes</T>
            </span>
            <BookOpen size={20} strokeWidth={1.5} />
            <i />
            <i />
          </div>
          <span className={b.star}>✦</span>
        </div>
      </section>
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
  return localizeSeo(pageMetadata, (await params).locale);
}
