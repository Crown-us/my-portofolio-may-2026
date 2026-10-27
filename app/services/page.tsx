import Link from "next/link";
import { ArrowRight, Check, Globe, Server, Smartphone } from "lucide-react";
import { services, serviceIntro, workSteps, serviceFaq } from "@/lib/services";
import { formatPrice } from "@/lib/domain";
import { buildSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "../components/SiteShell";
import ContactCta from "../components/ContactCta";
import s from "@/lib/styles";

const serviceIcons: Record<string, typeof Globe> = {
  "web-development": Globe,
  "mobile-development": Smartphone,
  "backend-api": Server,
};

export const metadata = buildSeo("Services", "/services");

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageIntro title="Let’s build something useful" eyebrow="SERVICES" />
      <p className={s.lead}>{serviceIntro}</p>
      <div className={`${s.projectGrid} ${s.section}`}>
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
                <span className={s.eyebrow}>0{index + 1}</span>
              </div>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <ul className={s.serviceDeliverables}>
                {service.deliverables.map((item) => (
                  <li key={item}>
                    <Check size={15} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {!!service.idealFor.length && (
                <p>Ideal for: {service.idealFor.join(", ")}</p>
              )}
              <div className={s.tags}>
                {service.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className={s.servicePrice}>
                <strong>{formatPrice(service.startingPrice)}</strong>
                <small>{service.priceNote}</small>
              </div>
              {service.estimatedDuration && (
                <p>Estimated: {service.estimatedDuration}</p>
              )}
              <Link
                className={s.serviceCta}
                href={`/contact?service=${service.slug}`}
                data-umami-event="contact-cta"
              >
                Discuss this service
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
      <section className={s.section}>
        <h2>How we’ll work together</h2>
        <ol className={s.workflow}>
          {workSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
      <section className={s.section}>
        <h2>Good to know</h2>
        {serviceFaq.map((item) => (
          <details className={s.faq} key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>
      <ContactCta />
    </SiteShell>
  );
}
