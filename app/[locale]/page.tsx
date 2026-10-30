import { PostDate } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import SiteShell from "@/app/components/SiteShell";
import Image from "@/app/components/LocalizedImage";
import BlogPostCard from "@/app/components/BlogPostCard";
import { getPosts } from "@/lib/blog";
import { buildSeo, localizeSeo } from "@/lib/seo";
import b from "@/app/blog/blog.module.css";
import s from "@/lib/styles";
import h from "./discover.module.css";

type Props = { params: Promise<{ locale: string }> };
const copyFor = (locale: string) =>
  locale === "en"
    ? {
        featured: "Featured read",
        read: "Read the article",
        language: "Article in Indonesian",
        latest: "More to read",
        all: "View all articles →",

        bio: "A web and mobile developer based in Kediri, Indonesia. I write about AI and technology for everyday use.",
        work: "Explore my work",
        about: "Get to know me",
        empty: "Articles are on the way.",
        seoTitle: "Kevin Dwi Wijaya — AI News, Guides & Projects",
        seoDescription:
          "AI news, practical technology guides, and comparisons by Kevin Dwi Wijaya. Explore the writing, projects, and background of a web and mobile developer.",
      }
    : {
        featured: "Bacaan utama",
        read: "Baca artikelnya",
        language: "Artikel berbahasa Indonesia",
        latest: "Artikel lainnya",
        all: "Lihat semua artikel →",

        bio: "Pengembang web dan aplikasi mobile dari Kediri. Menulis tentang AI dan teknologi untuk keseharian.",
        work: "Lihat karya saya",
        about: "Kenalan dengan saya",
        empty: "Artikel sedang disiapkan.",
        seoTitle: "Kevin Dwi Wijaya — Berita AI, Panduan & Karya",
        seoDescription:
          "Berita AI, panduan teknologi praktis, dan perbandingan dari Kevin Dwi Wijaya. Temukan tulisan, proyek, dan pengalaman pengembang web serta aplikasi mobile.",
      };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const copy = copyFor(locale);
  const [spotlight, ...otherPosts] = getPosts(false);
  const latestPosts = otherPosts.slice(0, 2);
  return (
    <SiteShell>
      <section className={h.author} aria-labelledby="home-author-heading">
        <Image
          src="/images/kevin-author.png"
          alt="Kevin Dwi Wijaya"
          width={72}
          height={72}
          className={h.portrait}
        />
        <div>
          <p id="home-author-heading" className={h.name}>
            Kevin Dwi Wijaya
          </p>
          <p className={h.bio}>{copy.bio}</p>
          <div className={h.links}>
            <Link href="/projects">{copy.work} ↗</Link>
            <Link href="/about">{copy.about} →</Link>
          </div>
        </div>
      </section>
      {spotlight ? (
        <section aria-label={copy.featured}>
          <Link
            href={`/blog/${spotlight.slug}`}
            contentLocale="id"
            className={`${h.featured} ${!spotlight.coverImage ? h.textOnly : ""}`}
          >
            {spotlight.coverImage && (
              <div className={h.cover}>
                <Image
                  src={spotlight.coverImage}
                  alt=""
                  width={1000}
                  height={650}
                  sizes="(max-width:700px) 90vw, 55vw"
                  priority
                />
              </div>
            )}
            <div className={h.featuredCopy}>
              <p className={s.eyebrow}>{copy.featured}</p>
              <h1 lang="id">{spotlight.title}</h1>
              <p className={h.summary} lang="id">
                {spotlight.summary}
              </p>
              <p className={h.meta}>
                <time dateTime={spotlight.date}>
                  <PostDate value={spotlight.date} />
                </time>
                {locale === "en" && <span> · {copy.language}</span>}
              </p>
              <span className={h.read}>
                {copy.read}
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </section>
      ) : (
        <h1 className={h.empty}>{copy.empty}</h1>
      )}
      {latestPosts.length > 0 && (
        <section className={s.section} aria-labelledby="latest-blog-heading">
          <div className={s.sectionHead}>
            <h2 id="latest-blog-heading">{copy.latest}</h2>
            <Link href="/blog" className={s.textLink}>
              {copy.all}
            </Link>
          </div>
          <div className={b.postGrid}>
            {latestPosts.map((post) => (
              <BlogPostCard post={post} key={post.slug} />
            ))}
          </div>
        </section>
      )}
    </SiteShell>
  );
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = copyFor(locale);
  return localizeSeo(buildSeo(copy.seoTitle, "/", copy.seoDescription), locale);
}
