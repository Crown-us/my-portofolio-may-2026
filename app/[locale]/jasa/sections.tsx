import { T } from "@/app/components/LocaleProvider";
import ProjectCard from "@/app/components/ProjectCard";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import { projects } from "@/lib/projects";
import { revisionPolicy, serviceFaq, workSteps } from "@/lib/services";
import s from "@/lib/styles";
import local from "@/app/components/Services.module.css";
import page from "./jasa.module.css";
import PackageList from "./PackageList";

export function Hero() {
  return (
    <header className={page.hero}>
      <p className={s.eyebrow}>
        <T>WEBSITE SERVICES · KEDIRI, EAST JAVA</T>
      </p>
      <h1>
        <T>
          A website that explains your business clearly and lets customers reach
          you on WhatsApp.
        </T>
      </h1>
      <p>
        <T>
          For small businesses in Kediri, East Java, and the rest of Indonesia.
        </T>
      </p>
      <div className={local.actions}>
        <WhatsAppLink className={local.primary}>
          <T>Order a website</T> ↗
        </WhatsAppLink>
        <a className={local.secondary} href="#packages">
          <T>View packages</T>
        </a>
      </div>
    </header>
  );
}

export function Packages() {
  return (
    <section id="packages" className={s.section}>
      <h2>
        <T>Packages</T>
      </h2>
      <PackageList />
    </section>
  );
}

export function Process() {
  return (
    <section className={s.section}>
      <h2>
        <T>How it works</T>
      </h2>
      <ol className={page.steps}>
        {workSteps.map((step) => (
          <li key={step.title}>
            <h3>
              <T>{step.title}</T>
            </h3>
            <p>
              <T>{step.description}</T>
            </p>
          </li>
        ))}
      </ol>
      <div className={page.note}>
        <h3>
          <T>Revision policy</T>
        </h3>
        <p>
          <T>{revisionPolicy}</T>
        </p>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className={s.section}>
      <h2>
        <T>FAQ</T>
      </h2>
      {serviceFaq.map((item) => (
        <div key={item.question} className={page.faq}>
          <h3>
            <T>{item.question}</T>
          </h3>
          <p>
            <T>{item.answer}</T>
          </p>
        </div>
      ))}
    </section>
  );
}

export function Examples() {
  return (
    <section className={s.section}>
      <h2>
        <T>Projects as examples</T>
      </h2>
      <p className={page.intro}>
        <T>
          Portfolio, internship, and demo work, not a list of paying clients.
          Each card shows its status and team.
        </T>
      </p>
      <div className={`${s.projectGrid} ${page.examples}`}>
        {projects
          .filter((project) => project.isFeatured)
          .map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
      </div>
    </section>
  );
}
