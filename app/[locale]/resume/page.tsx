import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import { about } from "@/lib/about";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";
import { buildSeo, localizeSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import ProfileDetails from "@/app/components/ProfileDetails";
import s from "@/lib/styles";
const pageMetadata = buildSeo("Resume", "/resume");
export default function ResumePage() {
  return (
    <SiteShell>
      <PageIntro title={siteConfig.name} eyebrow="RESUME" />
      <p className={s.lead}>
        <T>{about.intro}</T>
      </p>
      <div className={s.cardLinks}>
        <a href={`mailto:${siteConfig.email}`}>
          <T>{siteConfig.email}</T>
        </a>
        <a href={siteConfig.social.github}>
          <T>GitHub ↗</T>
        </a>
        {about.resumePdf && (
          <a
            className={s.button}
            href={about.resumePdf}
            download
            data-umami-event="resume-download"
          >
            <T>Download CV ↓</T>
          </a>
        )}
      </div>
      <ProfileDetails />
      <section className={s.section}>
        <h2>
          <T>Selected projects</T>
        </h2>
        {projects.map((project) => (
          <article className={s.panel} key={project.slug}>
            <h3>
              <Link href={`/projects/${project.slug}`}>
                <T>{project.title}</T> ↗
              </Link>
            </h3>
            <p>
              <T>{project.year}</T> · <T>{project.category}</T>
            </p>
            <p>
              <T>{project.summary}</T>
            </p>
          </article>
        ))}
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
