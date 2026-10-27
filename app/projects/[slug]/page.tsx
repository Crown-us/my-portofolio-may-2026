import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { buildSeo } from "@/lib/seo";
import { canonicalUrl, jsonLd } from "@/lib/domain";
import SiteShell, { PageIntro } from "../../components/SiteShell";
import Gallery from "../../components/Gallery";
import ContactCta from "../../components/ContactCta";
import CaseSections from "../../components/CaseSections";
import s from "@/lib/styles";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = projects.find((p) => p.slug === slug);
  return item
    ? buildSeo(item.title, `/projects/${slug}`, item.summary, item.image)
    : { title: "Project not found", robots: { index: false } };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index],
    study = project.caseStudy;
  return (
    <SiteShell>
      <Link className={s.back} href="/projects">
        ← All projects
      </Link>
      <PageIntro
        title={project.title}
        eyebrow={`${project.category} / ${project.year} / ${project.status}`}
      />
      <p className={s.lead}>{project.summary}</p>
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
              {label === "repo"
                ? "GitHub"
                : label === "demo"
                  ? "Live demo"
                  : "Documentation"}{" "}
              ↗
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
      <nav className={s.pageNeighbours} aria-label="Other projects">
        {index > 0 ? (
          <Link href={`/projects/${projects[index - 1].slug}`}>
            ← {projects[index - 1].title}
          </Link>
        ) : (
          <span />
        )}
        {index < projects.length - 1 && (
          <Link href={`/projects/${projects[index + 1].slug}`}>
            {projects[index + 1].title} →
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
            url: canonicalUrl(`/projects/${slug}`),
            image: canonicalUrl(project.image),
            author: {
              "@type": "Person",
              name: "Kevin Dwi Wijaya",
              url: canonicalUrl("/about"),
            },
          }),
        }}
      />
    </SiteShell>
  );
}
