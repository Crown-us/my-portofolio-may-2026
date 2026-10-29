import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import FeaturedCarousel from "@/app/components/FeaturedCarousel";
import ProjectCard from "@/app/components/ProjectCard";
import ContactCta from "@/app/components/ContactCta";
import BlogPostCard from "@/app/components/BlogPostCard";
import { getPosts } from "@/lib/blog";
import b from "@/app/blog/blog.module.css";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { products } from "@/lib/store";
import { getFeatured } from "@/lib/domain";
import { buildSeo, localizeSeo } from "@/lib/seo";
import s from "@/lib/styles";
const pageMetadata = buildSeo(
  "Kevin Dwi Wijaya — Full-Stack & Mobile Engineer",
  "/",
);
export default function Home() {
  const featured = getFeatured(projects);
  const latestPosts = getPosts(false).slice(0, 2);
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
            <h2>
              <T>Selected highlights</T>
            </h2>
            <Link href="/projects" className={s.textLink}>
              <T>View all projects →</T>
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
            <h2>
              <T>What can we build together?</T>
            </h2>
            <Link href="/services" className={s.textLink}>
              <T>Explore services →</T>
            </Link>
          </div>
          <div className={s.toolGrid}>
            {services.slice(0, 3).map((service) => (
              <Link
                className={s.serviceTeaser}
                href={`/services#${service.slug}`}
                key={service.slug}
              >
                <h3>
                  <T>{service.title}</T>
                </h3>
                <p>
                  <T>{service.summary}</T>
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
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
      {latestPosts.length > 0 && (
        <section className={s.section} aria-labelledby="latest-blog-heading">
          <div className={s.sectionHead}>
            <h2 id="latest-blog-heading">
              <T>Terbaru di Blog</T>
            </h2>
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
      <ContactCta />
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
