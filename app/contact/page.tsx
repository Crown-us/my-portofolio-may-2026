import { siteConfig } from "@/lib/config";
import { services } from "@/lib/services";
import { serviceSelection } from "@/lib/domain";
import { buildSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "../components/SiteShell";
import ContactForm from "../components/ContactForm";
import s from "@/lib/styles";
export const metadata = buildSeo("Contact", "/contact");
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const selected = serviceSelection(
    (await searchParams).service,
    services.map((item) => item.slug),
  );
  return (
    <SiteShell>
      <PageIntro title="Tell me what you have in mind" eyebrow="LET’S TALK" />
      <div className={s.contactLayout}>
        <aside className={s.contactAside}>
          <h2>Start with a conversation.</h2>
          <p>
            A project brief, a question, or an opportunity — I’d love to hear
            about it.
          </p>
          <a
            className={s.button}
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi Kevin, I'd like to discuss a project.")}`}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="contact-whatsapp"
          >
            Chat on WhatsApp ↗
          </a>
          <a
            className={s.textLink}
            href={`mailto:${siteConfig.email}`}
            data-umami-event="contact-email"
          >
            {siteConfig.email}
          </a>
          <p>{siteConfig.location}</p>
        </aside>
        <ContactForm key={selected} initialService={selected} />
      </div>
    </SiteShell>
  );
}
