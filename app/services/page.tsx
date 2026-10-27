import Link from "next/link";
import { services, serviceIntro, workSteps, serviceFaq } from "@/lib/services";
import { formatPrice } from "@/lib/domain";
import { buildSeo } from "@/lib/seo";
import SiteShell, { PageIntro } from "../components/SiteShell";
import ContactCta from "../components/ContactCta";
import s from "@/lib/styles";
export const metadata = buildSeo("Services", "/services");
export default function ServicesPage() {
  return (
    <SiteShell>
      <PageIntro title="Let’s build something useful" eyebrow="SERVICES" />
      <p className={s.lead}>{serviceIntro}</p>
      <div className={`${s.projectGrid} ${s.section}`}>
        {services.map((service, index) => (
          <article
            id={service.slug}
            className={s.serviceCard}
            data-tone={index % 4}
            key={service.slug}
          >
            <span className={s.eyebrow}>0{index + 1}</span>
            <h2>{service.title}</h2>
            <p>{service.summary}</p>
            <ul>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
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
            <strong>{formatPrice(service.startingPrice)}</strong>
            <small>{service.priceNote}</small>
            {service.estimatedDuration && (
              <p>Estimated: {service.estimatedDuration}</p>
            )}
            <Link
              className={s.button}
              href={`/contact?service=${service.slug}`}
              data-umami-event="contact-cta"
            >
              Discuss this service ↗
            </Link>
          </article>
        ))}
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
