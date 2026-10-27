import Image from "next/image";
import { about } from "@/lib/about";
import { siteConfig } from "@/lib/config";
import { buildSeo } from "@/lib/seo";
import { canonicalUrl, jsonLd } from "@/lib/domain";
import SiteShell, { PageIntro } from "../components/SiteShell";
import ContactCta from "../components/ContactCta";
import ProfileDetails from "../components/ProfileDetails";
import s from "@/lib/styles";
export const metadata = buildSeo("About me", "/about");
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
            <div className={s.profileAvatar} aria-label="Kevin’s initials">
              K<span>✦</span>
            </div>
          )}
          <div>
            <h2>{siteConfig.name}</h2>
            <span>{siteConfig.location}</span>
          </div>
        </div>
        <div>
          <h3>Interfaces, apps, and the systems behind them.</h3>
          <p>{about.intro}</p>
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
