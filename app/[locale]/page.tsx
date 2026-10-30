import Link from "@/app/components/LocalizedLink";
import SiteShell from "@/app/components/SiteShell";
import Image from "@/app/components/LocalizedImage";
import ArticleList from "@/app/components/ArticleList";
import { getPosts } from "@/lib/blog";
import { buildSeo, localizeSeo } from "@/lib/seo";
import h from "./discover.module.css";

type Props = { params: Promise<{ locale: string }> };
const copyFor = (locale: string) =>
  locale === "en"
    ? {
        latest: "Latest articles",
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
        latest: "Artikel terbaru",
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
  const latestPosts = getPosts(false).slice(0, 5);
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
      <section className={h.feed} aria-labelledby="latest-blog-heading">
        <h1 id="latest-blog-heading">{copy.latest}</h1>
        {latestPosts.length ? (
          <ArticleList posts={latestPosts} locale={locale} />
        ) : (
          <p>{copy.empty}</p>
        )}
        <Link href="/blog" className={h.allArticles}>
          {copy.all}
        </Link>
      </section>
    </SiteShell>
  );
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const copy = copyFor(locale);
  return localizeSeo(buildSeo(copy.seoTitle, "/", copy.seoDescription), locale);
}
