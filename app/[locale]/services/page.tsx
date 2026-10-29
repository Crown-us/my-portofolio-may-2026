import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import {
  ArrowRight,
  Globe,
  LayoutTemplate,
  Server,
  Smartphone,
} from "lucide-react";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";
import { getFeatured } from "@/lib/domain";
import { buildSeo, localizeSeo } from "@/lib/seo";
import SiteShell from "@/app/components/SiteShell";
import ProjectCard from "@/app/components/ProjectCard";
import s from "@/lib/styles";
import c from "./collaboration.module.css";

const icons = [LayoutTemplate, Globe, Smartphone, Server];
const descriptions = {
  id: "Bidang pengembangan yang saya kerjakan, contoh karya, dan cara mengajak saya berkolaborasi.",
  en: "The development work I do, examples of my projects, and how to collaborate with me.",
};
type Props = { params: Promise<{ locale: string }> };
export default async function CollaborationPage({ params }: Props) {
  const en = (await params).locale === "en";
  const copy = en
    ? {
        label: "COLLABORATION",
        title: "Work with me.",
        intro:
          "Have a web or mobile project in mind? Here are the areas I work in and some examples of what I have built. I'm open to discussing a contribution to your project or team.",
        areas: "Where I can contribute",
        examples: "Examples of my work",
        all: "View all projects →",
        process: "Start with a conversation",
        steps: [
          "Describe your project, the problem, and the help you need.",
          "We discuss my role, the scope, and how we could work together.",
          "We agree on the next steps before starting.",
        ],
        contactTitle: "Tell me about your project.",
        contactText:
          "Share a short brief, a link, or the part you need help with. We can discuss the details from there.",
        contact: "Discuss a collaboration",
        profile: "Explore my experience →",
      }
    : {
        label: "KOLABORASI",
        title: "Kerja bareng saya.",
        intro:
          "Punya proyek web atau aplikasi mobile? Berikut bidang yang saya kerjakan dan beberapa contoh karya saya. Saya terbuka untuk membahas kontribusi di proyek atau tim kamu.",
        areas: "Bidang yang saya kerjakan",
        examples: "Contoh karya",
        all: "Lihat semua proyek →",
        process: "Mulai dari obrolan",
        steps: [
          "Ceritakan proyek, masalah, dan bantuan yang kamu butuhkan.",
          "Kita bahas peran saya, lingkup pekerjaan, dan bentuk kerja samanya.",
          "Sepakati langkah berikutnya sebelum mulai mengerjakan.",
        ],
        contactTitle: "Ceritakan proyekmu.",
        contactText:
          "Kirim gambaran singkat, tautan, atau bagian yang perlu dibantu. Detailnya bisa kita bahas dari situ.",
        contact: "Diskusi kolaborasi",
        profile: "Lihat pengalaman saya →",
      };
  return (
    <SiteShell>
      <div className={s.intro}>
        <div>
          <p className={s.eyebrow}>{copy.label}</p>
          <h1>{copy.title}</h1>
        </div>
      </div>
      <p className={s.lead}>{copy.intro}</p>
      <section className={s.section} aria-labelledby="collaboration-areas">
        <div className={s.sectionHead}>
          <h2 id="collaboration-areas">{copy.areas}</h2>
        </div>
        <div className={c.areas}>
          {services.map((service, index) => {
            const Icon = icons[index] ?? Globe;
            return (
              <article id={service.slug} className={c.area} key={service.slug}>
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                <h3>
                  <T>{service.title}</T>
                </h3>
                <p>
                  <T>{service.summary}</T>
                </p>
                <div className={s.tags}>
                  {service.techStack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className={s.section}>
        <div className={s.sectionHead}>
          <h2>{copy.examples}</h2>
          <Link href="/projects" className={s.textLink}>
            {copy.all}
          </Link>
        </div>
        <div className={s.highlights}>
          {getFeatured(projects)
            .slice(0, 2)
            .map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
        </div>
      </section>
      <section className={`${s.section} ${c.process}`}>
        <h2>{copy.process}</h2>
        <ol>
          {copy.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
      <section className={c.contact}>
        <div>
          <h2>{copy.contactTitle}</h2>
          <p>{copy.contactText}</p>
        </div>
        <div className={c.actions}>
          <Link href="/contact" className={c.primary}>
            {copy.contact}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/about" className={c.profileLink}>
            {copy.profile}
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const en = locale === "en";
  return localizeSeo(
    buildSeo(
      en ? "Collaboration" : "Kolaborasi",
      "/services",
      descriptions[en ? "en" : "id"],
    ),
    locale,
  );
}
