import { T } from "@/app/components/LocaleProvider";
import { siteConfig } from "@/lib/config";
import { buildSeo, localizeSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import ContactForm from "@/app/components/ContactForm";
import s from "@/lib/styles";
const pageMetadata = buildSeo("Contact", "/contact");
export default function ContactPage() {
  return (
    <SiteShell>
      <PageIntro title="Tell me what you have in mind" eyebrow="LET’S TALK" />
      <div className={s.contactLayout}>
        <aside className={s.contactAside}>
          <h2>
            <T>Start with a conversation.</T>
          </h2>
          <p>
            <T>
              A project brief, a question, or an opportunity — I’d love to hear
              about it.
            </T>
          </p>
          <a
            className={s.button}
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi Kevin, I'd like to discuss a project.")}`}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="contact-whatsapp"
          >
            <T>Chat on WhatsApp ↗</T>
          </a>
          <a
            className={s.textLink}
            href={`mailto:${siteConfig.email}`}
            data-umami-event="contact-email"
          >
            <T>{siteConfig.email}</T>
          </a>
          <p>
            <T>{siteConfig.location}</T>
          </p>
        </aside>
        <ContactForm />
      </div>
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
