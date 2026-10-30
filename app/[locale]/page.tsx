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

        greeting: "Hi, I’m Kevin.",
        role: "A web and mobile developer based in Kediri, Indonesia.",
        bio: "I build web applications with React and Laravel, and mobile apps with Flutter. My projects include a learning platform, a marketplace, and a community management app.",
        writing: "This is where I share what I’m building and learning, along with notes on AI and technology for everyday use.",
        work: "Explore my work",
        about: "Get to know me",
        empty: "Articles are on the way.",
        seoTitle: "Kevin Dwi Wijaya — Web & Mobile Developer",
        seoDescription:
          "Kevin Dwi Wijaya, a web and mobile developer in Kediri, Indonesia. Explore React, Laravel, and Flutter projects, plus articles on AI and everyday technology.",
      }
    : {
        latest: "Artikel terbaru",
        all: "Lihat semua artikel →",

        greeting: "Halo, saya Kevin.",
        role: "Pengembang web dan aplikasi mobile dari Kediri.",
        bio: "Saya membangun aplikasi web dengan React dan Laravel, serta aplikasi mobile dengan Flutter. Proyek yang saya kerjakan antara lain platform belajar, marketplace, dan aplikasi pengelolaan lingkungan RT/RW.",
        writing: "Di sini saya berbagi apa yang sedang saya bangun dan pelajari, juga catatan tentang AI dan teknologi untuk keseharian.",
        work: "Lihat karya saya",
        about: "Kenalan dengan saya",
        empty: "Artikel sedang disiapkan.",
        seoTitle: "Kevin Dwi Wijaya — Pengembang Web & Mobile",
        seoDescription:
          "Kevin Dwi Wijaya, pengembang web dan aplikasi mobile dari Kediri. Jelajahi proyek React, Laravel, dan Flutter, serta tulisan tentang AI dan teknologi sehari-hari.",
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
          <h1 id="home-author-heading" className={h.name}>
            {copy.greeting}
          </h1>
          <p className={h.bio}>{copy.role}</p>
          <p className={h.bio}>{copy.bio}</p>
          <p className={h.bio}>{copy.writing}</p>
          <div className={h.links}>
            <Link href="/projects">{copy.work} ↗</Link>
            <Link href="/about">{copy.about} →</Link>
          </div>
        </div>
      </section>
      <section className={h.feed} aria-labelledby="latest-blog-heading">
        <h2 id="latest-blog-heading">{copy.latest}</h2>
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
