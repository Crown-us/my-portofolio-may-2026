import { T } from "@/app/components/LocaleProvider";
import Image from "@/app/components/LocalizedImage";
import { about } from "@/lib/about";
import { siteConfig } from "@/lib/config";
import { buildSeo, localizeSeo } from "@/lib/seo";
import { canonicalUrl, jsonLd } from "@/lib/domain";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import ContactCta from "@/app/components/ContactCta";
import ProfileDetails from "@/app/components/ProfileDetails";
import s from "@/lib/styles";
const pageMetadata = buildSeo("About me", "/about");
export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro
        title="A little about me"
        eyebrow="THE PERSON BEHIND THE PROJECTS"
      />
      <section className={s.about}>
        <div className={s.profile}>
          {about.photo ? (
            <Image
              src={about.photo}
              alt={about.photoAlt}
              width={150}
              height={180}
              className={s.portrait}
            />
          ) : (
            <div className={s.profileAvatar} aria-label="Kevin Dwi Wijaya">
              <T>K</T>
              <span>✦</span>
            </div>
          )}
          <div>
            <h2>
              <T>{siteConfig.name}</T>
            </h2>
            <span>
              <T>{siteConfig.location}</T>
            </span>
          </div>
        </div>
        <div>
          <h3>
            <T>Interfaces, apps, and the systems behind them.</T>
          </h3>
          <p>
            <T>{about.intro}</T>
          </p>
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
      </section>
      <ProfileDetails />
      <ContactCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteConfig.name,
            jobTitle: siteConfig.title,
            url: canonicalUrl("/about"),
            sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
            ...(about.photo ? { image: canonicalUrl(about.photo) } : {}),
          }),
        }}
      />
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
