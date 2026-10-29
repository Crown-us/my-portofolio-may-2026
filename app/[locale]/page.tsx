import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import SiteShell from "@/app/components/SiteShell";
import Image from "@/app/components/LocalizedImage";
import { BookOpen, AppWindow, BriefcaseBusiness } from "lucide-react";
import BlogPostCard from "@/app/components/BlogPostCard";
import { getPosts } from "@/lib/blog";
import b from "@/app/blog/blog.module.css";
import { products } from "@/lib/store";
import { buildSeo, localizeSeo } from "@/lib/seo";
import s from "@/lib/styles";
import h from "./discover.module.css";
const pageMetadata = buildSeo(
  "Kevin Dwi Wijaya — Full-Stack & Mobile Engineer",
  "/",
);
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy =
    locale === "en"
      ? {
          title: "Bringing technology closer to everyday life.",
          intro:
            "I'm Kevin, a full-stack and mobile developer. I build web and mobile apps, share what I learn about AI, and create useful digital products.",
          work: "Explore my work",
          about: "Get to know me",
          pick: "Worth a read",
          read: "Read the article",
          language: "Article in Indonesian",
          learn: "Read & learn",
          learnIntro: "Practical ideas about tech and AI, for everyday use.",
          needs: "Start with what you need",
          needsIntro: "Choose what brings you here.",
          paths: [
            {
              title: "Learn about AI",
              description:
                "Understand everyday AI tools, compare your options, and learn to check their answers.",
              action: "Explore the blog",
              href: "/blog",
            },
            {
              title: "Build a website or app",
              description:
                "Explore services for business websites, web applications, and mobile apps.",
              action: "View services",
              href: "/services",
            },
            {
              title: "Find a developer",
              description:
                "Take a look at my experience, technical skills, and resume for your team or project.",
              action: "View my resume",
              href: "/resume",
            },
          ],
          together: "About & collaboration",
          togetherIntro:
            "Get to know my background, explore my experience, or tell me what you'd like to build.",
          resume: "View my resume",
          contact: "Let's talk",
        }
      : {
          title: "Bikin teknologi lebih dekat dengan keseharian.",
          intro:
            "Saya Kevin, pengembang web dan aplikasi mobile. Saya membangun aplikasi, berbagi pengetahuan AI, dan membuat produk digital yang berguna.",
          work: "Jelajahi karya",
          about: "Kenalan dengan saya",
          pick: "Pilihan bacaan",
          read: "Baca artikelnya",
          language: "Artikel berbahasa Indonesia",
          learn: "Baca & pelajari",
          learnIntro: "Ide praktis seputar teknologi dan AI untuk keseharian.",
          needs: "Mulai dari kebutuhanmu",
          needsIntro: "Pilih yang sesuai dengan tujuanmu ke sini.",
          paths: [
            {
              title: "Mau belajar AI",
              description:
                "Kenali alat AI untuk keseharian, bandingkan pilihannya, dan pelajari cara mengecek jawabannya.",
              action: "Jelajahi blog",
              href: "/blog",
            },
            {
              title: "Butuh website atau aplikasi",
              description:
                "Lihat layanan untuk website usaha, aplikasi web, dan aplikasi mobile.",
              action: "Lihat layanan",
              href: "/services",
            },
            {
              title: "Sedang cari developer",
              description:
                "Lihat pengalaman, keahlian teknis, dan CV saya untuk kebutuhan tim atau proyekmu.",
              action: "Lihat CV saya",
              href: "/resume",
            },
          ],
          together: "Tentang & kolaborasi",
          togetherIntro:
            "Kenali latar belakang saya, lihat pengalaman saya, atau ceritakan apa yang ingin kamu bangun.",
          resume: "Lihat CV saya",
          contact: "Mari ngobrol",
        };
  const pathIcons = [BookOpen, AppWindow, BriefcaseBusiness];
  const latestPosts = getPosts(false).slice(0, 2);
  const spotlight = latestPosts[0];
  return (
    <SiteShell>
      <section className={h.hero} aria-labelledby="discover-title">
        <div className={h.heroCopy}>
          <p className={s.eyebrow}>KEVIN DWI WIJAYA</p>
          <h1 id="discover-title">{copy.title}</h1>
          <p className={h.description}>{copy.intro}</p>
          <div className={h.actions}>
            <Link href="/projects" className={h.primary}>
              {copy.work}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/about" className={h.secondary}>
              {copy.about}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        {spotlight && (
          <Link href={`/blog/${spotlight.slug}`} className={h.spotlight}>
            <div className={h.spotlightImage}>
              {spotlight.coverImage && (
                <Image
                  src={spotlight.coverImage}
                  alt=""
                  width={720}
                  height={405}
                  sizes="(max-width: 700px) 90vw, 40vw"
                  priority
                />
              )}
            </div>
            <div className={h.spotlightCopy}>
              <span className={s.eyebrow}>
                {copy.pick}
                {locale === "en" && ` · ${copy.language}`}
              </span>
              <h2 lang="id">{spotlight.title}</h2>
              <span className={h.read}>
                {copy.read} <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        )}
      </section>
      {latestPosts.length > 0 && (
        <section className={s.section} aria-labelledby="latest-blog-heading">
          <div className={s.sectionHead}>
            <div>
              <h2 id="latest-blog-heading">{copy.learn}</h2>
              <p>{copy.learnIntro}</p>
            </div>
            <Link href="/blog" className={s.textLink}>
              <T>Lihat semua artikel →</T>
            </Link>
          </div>
          <div className={b.postGrid}>
            {latestPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
      <section className={s.section} aria-labelledby="needs-heading">
        <div className={s.sectionHead}>
          <div>
            <h2 id="needs-heading">{copy.needs}</h2>
            <p>{copy.needsIntro}</p>
          </div>
        </div>
        <div className={h.pathGrid}>
          {copy.paths.map((path, index) => {
            const Icon = pathIcons[index];
            return (
              <Link href={path.href} key={path.href} className={h.pathCard}>
                <span className={h.pathIcon} data-tone={index}>
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3>{path.title}</h3>
                <p>{path.description}</p>
                <span className={h.pathAction}>
                  {path.action}
                  <span aria-hidden="true">↗</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      {products.length > 0 && (
        <section className={s.discoverNote}>
          <div>
            <h2>
              <T>Ready-made tools</T>
            </h2>
            <p>
              <T>Explore my digital products.</T>
            </p>
          </div>
          <Link href="/store" className={s.button}>
            <T>Visit the store →</T>
          </Link>
        </section>
      )}
      <section className={h.about}>
        <div>
          <p className={s.eyebrow}>{copy.together}</p>
          <h2>Kevin Dwi Wijaya</h2>
          <p>{copy.togetherIntro}</p>
        </div>
        <div className={h.actions}>
          <Link href="/about" className={h.secondary}>
            {copy.about} →
          </Link>
          <Link href="/resume" className={h.secondary}>
            {copy.resume} ↗
          </Link>
          <Link href="/contact" className={h.primary}>
            {copy.contact} →
          </Link>
        </div>
      </section>
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
