import { T } from "@/app/components/LocaleProvider";
import Image from "@/app/components/LocalizedImage";
import Link from "@/app/components/LocalizedLink";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { buildSeo, localizeSeo } from "@/lib/seo";
import { canonicalUrl, jsonLd } from "@/lib/domain";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import Gallery from "@/app/components/Gallery";
import ContactCta from "@/app/components/ContactCta";
import CaseSections from "@/app/components/CaseSections";
import s from "@/lib/styles";
type Props = { params: Promise<{ slug: string; locale: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;
  const item = projects.find((p) => p.slug === slug);
  return item
    ? localizeSeo(
        buildSeo(item.title, `/projects/${slug}`, item.summary, item.image),
        locale,
      )
    : { title: "Project not found", robots: { index: false } };
}
export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index],
    study = project.caseStudy;
  return (
    <SiteShell>
      <Link className={s.back} href="/projects">
        <T>← All projects</T>
      </Link>
      <PageIntro
        title={project.title}
        eyebrow={`${project.category} / ${project.year} / ${project.status}`}
      />
      <p className={s.lead}>
        <T>{project.summary}</T>
      </p>
      <div className={s.cardLinks}>
        {Object.entries(study.links)
          .filter(([, url]) => url)
          .map(([label, url]) => (
            <a
              className={s.button}
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <T>
                {label === "repo"
                  ? "GitHub"
                  : label === "demo"
                    ? "Live demo"
                    : "Documentation"}
              </T>
              <T> </T>↗
            </a>
          ))}
      </div>
      <Image
        className={s.detailImage}
        src={project.image}
        alt={`${project.title} overview`}
        width={1200}
        height={780}
        priority
      />
      <CaseSections study={study} />
      <Gallery images={study.screenshots} />
      <nav
        className={s.pageNeighbours}
        aria-label={locale === "id" ? "Proyek lainnya" : "Other projects"}
      >
        {index > 0 ? (
          <Link href={`/projects/${projects[index - 1].slug}`}>
            ← <T>{projects[index - 1].title}</T>
          </Link>
        ) : (
          <span />
        )}
        {index < projects.length - 1 && (
          <Link href={`/projects/${projects[index + 1].slug}`}>
            <T>{projects[index + 1].title}</T> →
          </Link>
        )}
      </nav>
      <ContactCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: canonicalUrl(`/${locale}/projects/${slug}`),
            image: canonicalUrl(project.image),
            author: {
              "@type": "Person",
              name: "Kevin Dwi Wijaya",
              url: canonicalUrl(`/${locale}/about`),
            },
          }),
        }}
      />
    </SiteShell>
  );
}
