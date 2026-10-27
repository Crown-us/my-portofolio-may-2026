import Link from "next/link";
import { about } from "@/lib/about";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";
import { buildSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "../components/SiteShell";
import ProfileDetails from "../components/ProfileDetails";
import s from "@/lib/styles";
export const metadata = buildSeo("Resume", "/resume");
export default function ResumePage() {
  return (
    <SiteShell>
      <PageIntro title={siteConfig.name} eyebrow="RESUME" />
      <p className={s.lead}>{about.intro}</p>
      <div className={s.cardLinks}>
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        <a href={siteConfig.social.github}>GitHub ↗</a>
        {about.resumePdf && (
          <a
            className={s.button}
            href={about.resumePdf}
            download
            data-umami-event="resume-download"
          >
            Download CV ↓
          </a>
        )}
      </div>
      <ProfileDetails />
      <section className={s.section}>
        <h2>Selected projects</h2>
        {projects.map((project) => (
          <article className={s.panel} key={project.slug}>
            <h3>
              <Link href={`/projects/${project.slug}`}>{project.title} ↗</Link>
            </h3>
            <p>
              {project.year} · {project.category}
            </p>
            <p>{project.summary}</p>
          </article>
        ))}
      </section>
    </SiteShell>
  );
}
