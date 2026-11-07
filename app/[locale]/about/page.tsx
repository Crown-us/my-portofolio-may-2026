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
          "My experience includes full-stack development at PT. Nusatama Jaya Sakti and BUMD Seger, frontend development at Kalamaya, and IT support at Telkom Akses through internships.",
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
          "Lewat magang, saya terlibat dalam pengembangan full-stack di PT. Nusatama Jaya Sakti dan BUMD Seger, pengembangan frontend di Kalamaya, dan dukungan TI di Telkom Akses.",
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
    ["hris-lite", "lms-westud", "seger-marketplace"].includes(project.slug),
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
            <a href="#contact">{copy.contact}</a>
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
        <section
          id="collaboration"
          className={a.collaboration}
          aria-labelledby="collaboration-title"
        >
          <h2 id="collaboration-title">
            {locale === "en" ? "Work with me" : "Kerja sama"}
          </h2>
          <p>
            {locale === "en"
              ? "Need help with a web application or an Android app? I can contribute to interfaces, backend development, and API integration with React, Laravel, and Flutter."
              : "Butuh bantuan membangun aplikasi web atau Android? Saya bisa berkontribusi pada antarmuka, backend, dan integrasi API dengan React, Laravel, serta Flutter."}
          </p>
          <p>
            {locale === "en"
              ? "Send a short description of the problem, the current project, and where you need help. We can discuss my role, the scope, and the next steps before starting."
              : "Kirim gambaran singkat tentang masalah, kondisi proyek, dan bagian yang perlu dibantu. Kita bahas peran saya, lingkup pekerjaan, serta langkah berikutnya sebelum mulai."}
          </p>
          <div id="contact" className={a.contact}>
            <h3>
              {locale === "en" ? "Start a conversation" : "Mulai ngobrol"}
            </h3>
            <p>
              {locale === "en"
                ? "WhatsApp for a first conversation. Email for recruitment, proposals, and documents."
                : "WhatsApp untuk obrolan awal. Email untuk rekrutmen, penawaran resmi, dan dokumen."}
            </p>
            <a
              className={a.primary}
              href={
                "https://wa.me/" +
                siteConfig.whatsapp +
                "?text=" +
                encodeURIComponent(
                  locale === "en"
                    ? "Hi Kevin, I'd like to discuss a project."
                    : "Halo Kevin, saya ingin ngobrol tentang sebuah proyek.",
                )
              }
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="contact-whatsapp"
            >
              {locale === "en" ? "Chat on WhatsApp ↗" : "Chat lewat WhatsApp ↗"}
            </a>
            <div className={a.links}>
              <a
                href={"mailto:" + siteConfig.email}
                data-umami-event="contact-email"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </section>
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
