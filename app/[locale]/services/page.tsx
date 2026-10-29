import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import {
  ArrowRight,
  Check,
  Globe,
  LayoutTemplate,
  Server,
  Smartphone,
} from "lucide-react";
import { services, serviceIntro, workSteps, serviceFaq } from "@/lib/services";
import { formatPrice } from "@/lib/domain";
import { buildSeo, localizeSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import ContactCta from "@/app/components/ContactCta";
import s from "@/lib/styles";

const serviceIcons: Record<string, typeof Globe> = {
  "landing-page": LayoutTemplate,
  "web-development": Globe,
  "mobile-development": Smartphone,
  "backend-api": Server,
};

const pageMetadata = buildSeo("Services", "/services");

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageIntro title="Let’s build something useful" eyebrow="SERVICES" />
      <p className={s.lead}>
        <T>{serviceIntro}</T>
      </p>
      <div className={`${s.serviceGrid} ${s.section}`}>
        {services.map((service, index) => {
          const Icon = serviceIcons[service.slug] ?? Globe;
          return (
            <article
              id={service.slug}
              className={s.serviceCard}
              data-tone={index % 4}
              key={service.slug}
            >
              <div className={s.serviceTop}>
                <div className={s.serviceIcon}>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <span className={s.eyebrow}>
                  0<T>{index + 1}</T>
                </span>
              </div>
              <h2>
                <T>{service.title}</T>
              </h2>
              <p>
                <T>{service.summary}</T>
              </p>
              <ul className={s.serviceDeliverables}>
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    <span>
                      <T>{item}</T>
                    </span>
                  </li>
                ))}
              </ul>
              {!!service.idealFor.length && (
                <p>
                  <T>Ideal for: </T>
                  <T>{service.idealFor.join(", ")}</T>
                </p>
              )}
              <div className={s.tags}>
                {service.techStack.map((tech) => (
                  <span key={tech}>
                    <T>{tech}</T>
                  </span>
                ))}
              </div>
              <div className={s.servicePrice}>
                <strong>
                  <T>{formatPrice(service.startingPrice)}</T>
                </strong>
                <small>
                  <T>{service.priceNote}</T>
                </small>
              </div>
              {service.estimatedDuration && (
                <p>
                  <T>Estimated: </T>
                  <T>{service.estimatedDuration}</T>
                </p>
              )}
              <Link
                className={s.serviceCta}
                href={`/contact?service=${service.slug}`}
                data-umami-event="contact-cta"
              >
                <T>Discuss this service</T>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
      <section className={s.section}>
        <h2>
          <T>How we’ll work together</T>
        </h2>
        <ol className={s.workflow}>
          {workSteps.map((step) => (
            <li key={step}>
              <T>{step}</T>
            </li>
          ))}
        </ol>
      </section>
      <section className={s.section}>
        <h2>
          <T>Good to know</T>
        </h2>
        {serviceFaq.map((item) => (
          <details className={s.faq} key={item.question}>
            <summary>
              <T>{item.question}</T>
            </summary>
            <p>
              <T>{item.answer}</T>
            </p>
          </details>
        ))}
      </section>
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
