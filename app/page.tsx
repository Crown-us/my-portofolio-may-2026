import Link from "next/link";
import SiteShell, { PageIntro } from "./components/SiteShell";
import FeaturedCarousel from "./components/FeaturedCarousel";
import ProjectCard from "./components/ProjectCard";
import ContactCta from "./components/ContactCta";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { products } from "@/lib/store";
import { getFeatured } from "@/lib/domain";
import { buildSeo } from "@/lib/seo";
import s from "@/lib/styles";
export const metadata = buildSeo(
  "Kevin Dwi Wijaya — Full-Stack & Mobile Engineer",
  "/",
);
export default function Home() {
  const featured = getFeatured(projects);
  return (
    <SiteShell>
      <PageIntro
        title="Thoughtful products. Built with care."
        eyebrow="A COLLECTION BY KEVIN DWI WIJAYA"
      />
      <FeaturedCarousel projects={featured} />
      {featured.length > 0 && (
        <section className={s.section}>
          <div className={s.sectionHead}>
            <h2>Selected highlights</h2>
            <Link href="/projects" className={s.textLink}>
              View all projects →
            </Link>
          </div>
          <div className={s.highlights}>
            {featured.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      )}
      {services.length > 0 && (
        <section className={s.section}>
          <div className={s.sectionHead}>
            <h2>What can we build together?</h2>
            <Link href="/services" className={s.textLink}>
              Explore services →
            </Link>
          </div>
          <div className={s.toolGrid}>
            {services.map((service) => (
              <Link
                className={s.serviceTeaser}
                href={`/services#${service.slug}`}
                key={service.slug}
              >
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      {products.length > 0 && (
        <section className={s.discoverNote}>
          <div>
            <h2>Ready-made tools</h2>
            <p>Explore my digital products.</p>
          </div>
          <Link href="/store" className={s.button}>
            Visit the store →
          </Link>
        </section>
      )}
      <ContactCta />
    </SiteShell>
  );
}
