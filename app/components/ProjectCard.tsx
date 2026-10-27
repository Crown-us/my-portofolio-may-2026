import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import s from "@/lib/styles";
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const links = project.caseStudy.links;
  return (
    <article className={s.card}>
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
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h3>
            <span>
              {project.category} · {project.year}
            </span>
          </div>
        </div>
        <p>{project.summary}</p>
        <div className={s.tags}>
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className={s.cardLinks}>
          <Link href={`/projects/${project.slug}`}>Case study</Link>
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer">
              Live demo ↗
            </a>
          )}
          {links.repo && (
            <a href={links.repo} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
