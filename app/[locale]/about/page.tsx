import { T } from "@/app/components/LocaleProvider";
import Image from "@/app/components/LocalizedImage";
import Link from "@/app/components/LocalizedLink";
import { about } from "@/lib/about";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";
import { buildSeo, localizeSeo } from "@/lib/seo";
import { canonicalUrl, jsonLd } from "@/lib/domain";
import SiteShell from "@/app/components/SiteShell";
import ProfileDetails from "@/app/components/ProfileDetails";
import a from "./about.module.css";

const copyFor = (locale: string) =>
  locale === "en"
    ? {
        title: "About me",
        role: "Web and mobile developer · Kediri, Indonesia",
        intro:
          "I’m Kevin. I build web applications with React and Laravel, and Android apps with Flutter. I work on both the interface and the data and application logic behind it.",
        background:
          "My experience includes full-stack development at PT. Nusatama Jaya Sakti, frontend development at Kalamaya, and IT support at Telkom Akses through internships.",
        writing:
          "I also write about AI, everyday technology, and what I learn from my projects. This site brings that work and those notes together.",
        projects: "A few things I’ve built",
        projectNote:
          "These case studies explain the problem, my contribution, and the implementation.",
        caseStudy: "Read case study →",
        allProjects: "All projects →",
        contact: "Get in touch →",
        blog: "Read my articles →",
      }
    : {
        title: "Tentang saya",
        role: "Pengembang web dan aplikasi mobile · Kediri, Indonesia",
        intro:
          "Saya Kevin. Saya membangun aplikasi web dengan React dan Laravel, serta aplikasi Android dengan Flutter. Saya mengerjakan antarmuka sekaligus pengelolaan data dan logika aplikasi di baliknya.",
        background:
          "Lewat magang, saya terlibat dalam pengembangan full-stack di PT. Nusatama Jaya Sakti, pengembangan frontend di Kalamaya, dan dukungan TI di Telkom Akses.",
        writing:
          "Saya juga menulis tentang AI, teknologi sehari-hari, dan hal yang saya pelajari dari proyek sendiri. Situs ini jadi tempat untuk mengumpulkan karya dan catatan tersebut.",
        projects: "Beberapa yang saya bangun",
        projectNote:
          "Studi kasus ini menjelaskan masalah, kontribusi saya, dan cara implementasinya.",
        caseStudy: "Baca studi kasus →",
        allProjects: "Semua proyek →",
        contact: "Hubungi saya →",
        blog: "Baca tulisan saya →",
      };
type Props = { params: Promise<{ locale: string }> };
export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const copy = copyFor(locale);
  const selected = projects.filter((project) =>
    ["lms-westud", "seger-marketplace"].includes(project.slug),
  );
  return (
    <SiteShell>
      <div className={a.page}>
        <h1 className={a.title}>{copy.title}</h1>
        <section className={a.intro} aria-labelledby="about-name">
          <div className={a.identity}>
            <Image
              src={about.photo}
              alt={about.photoAlt}
              width={96}
              height={96}
              className={a.portrait}
            />
            <div>
              <h2 id="about-name">{siteConfig.name}</h2>
              <p>{copy.role}</p>
            </div>
          </div>
          <p>{copy.intro}</p>
          <p>{copy.background}</p>
          <p>{copy.writing}</p>
          <div className={a.links}>
            <Link href="/contact">{copy.contact}</Link>
            <Link href="/blog">{copy.blog}</Link>
            <a href={siteConfig.social.github}>GitHub ↗</a>
            <a href={siteConfig.social.linkedin}>LinkedIn ↗</a>
            {about.resumePdf && (
              <a href={about.resumePdf} download>
                {locale === "en" ? "Download CV ↓" : "Unduh CV ↓"}
              </a>
            )}
          </div>
        </section>
        <section className={a.work} aria-labelledby="about-work">
          <h2 id="about-work">{copy.projects}</h2>
          <p>{copy.projectNote}</p>
          {selected.map((project) => (
            <article key={project.slug} className={a.project}>
              <h3>
                <Link href={"/projects/" + project.slug}>{project.title}</Link>
              </h3>
              <p>
                <T>{project.summary}</T>
              </p>
              <Link href={"/projects/" + project.slug}>{copy.caseStudy}</Link>
            </article>
          ))}
          <div className={a.links}>
            <Link href="/projects">{copy.allProjects}</Link>
          </div>
        </section>
        <ProfileDetails />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteConfig.name,
            jobTitle: siteConfig.title,
            url: canonicalUrl("/" + locale + "/about"),
            sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
            image: canonicalUrl(about.photo),
          }),
        }}
      />
    </SiteShell>
  );
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return localizeSeo(
    buildSeo("About me", "/about", copyFor(locale).intro),
    locale,
  );
}
