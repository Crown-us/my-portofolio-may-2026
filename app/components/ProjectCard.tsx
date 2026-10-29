import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import Image from "@/app/components/LocalizedImage";
import type { Project } from "@/lib/projects";
import s from "@/lib/styles";
import mobile from "./ProjectCard.module.css";
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const links = project.caseStudy.links;
  return (
    <article className={`${s.card} ${mobile.card}`}>
      <Link
        className={s.cardImage}
        data-tone={index % 3}
        href={`/projects/${project.slug}`}
      >
        <Image
          src={project.image}
          alt={`${project.title} interface`}
          width={800}
          height={500}
          sizes="(max-width:700px) 90vw, 32vw"
        />
      </Link>
      <div className={s.cardBody}>
        <div className={s.cardTitle}>
          <div>
            <h3>
              <Link href={`/projects/${project.slug}`}>
                <T>{project.title}</T>
              </Link>
            </h3>
            <span>
              <T>{project.category}</T> · <T>{project.year}</T>
            </span>
          </div>
        </div>
        <p>
          <T>{project.summary}</T>
        </p>
        <div className={s.tags}>
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech}>
              <T>{tech}</T>
            </span>
          ))}
        </div>
        <div className={`${s.cardLinks} ${mobile.links}`}>
          <Link href={`/projects/${project.slug}`}>
            <T>Case study</T>
          </Link>
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer">
              <T>Live demo ↗</T>
            </a>
          )}
          {links.repo && (
            <a href={links.repo} target="_blank" rel="noopener noreferrer">
              <T>GitHub ↗</T>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
