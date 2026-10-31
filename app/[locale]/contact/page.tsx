import { T } from "@/app/components/LocaleProvider";
import { siteConfig } from "@/lib/config";
import { buildSeo, localizeSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import s from "@/lib/styles";
import c from "./contact.module.css";
const pageMetadata = buildSeo("Contact", "/contact");
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const en = locale === "en";
  return (
    <SiteShell>
      <PageIntro title="Tell me what you have in mind" eyebrow="LET’S TALK" />
      <div className={c.layout}>
        <section className={s.contactAside} aria-labelledby="contact-heading">
          <h2 id="contact-heading">
            <T>Start with a conversation.</T>
          </h2>
          <p>
            {en
              ? "Have a project in mind or a question? Message me on WhatsApp. For recruitment, proposals, or documents, you can also reach me by email."
              : "Ada proyek yang ingin dibahas atau pertanyaan? Chat saya lewat WhatsApp. Untuk rekrutmen, penawaran resmi, atau kirim dokumen, kamu juga bisa menghubungi saya lewat email."}
          </p>
          <a
            className={`${s.button} ${c.whatsapp}`}
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(en ? "Hi Kevin, I'd like to discuss a project." : "Halo Kevin, saya ingin ngobrol tentang sebuah proyek.")}`}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="contact-whatsapp"
          >
            <T>Chat on WhatsApp ↗</T>
          </a>
          <div className={c.email}>
            <p>{en ? "Prefer email?" : "Lebih nyaman lewat email?"}</p>
            <a
              className={s.textLink}
              href={`mailto:${siteConfig.email}`}
              data-umami-event="contact-email"
            >
              <T>{siteConfig.email}</T>
            </a>
          </div>
          <p>
            <T>{siteConfig.location}</T>
          </p>
        </section>
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
