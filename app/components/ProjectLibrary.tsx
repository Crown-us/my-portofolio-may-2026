import { T } from "@/app/components/LocaleProvider";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import s from "@/lib/styles";

export default function ProjectLibrary() {
  return (
    <section className={s.section}>
      <div className={s.sectionHead}>
        <h2>
          <T>All projects</T>
        </h2>
        <span className={s.count}>
          {projects.length}{" "}
          <T>{projects.length === 1 ? "project" : "projects"}</T>
        </span>
      </div>
      <div className={s.projectGrid}>
        {projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
