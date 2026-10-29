"use client";
import { translate } from "@/lib/i18n";

import { T, useLocale } from "@/app/components/LocaleProvider";

import { useState } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import s from "@/lib/styles";
export default function ProjectLibrary({
  initialCategory = "All projects",
}: {
  initialCategory?: string;
}) {
  const locale = useLocale();
  const categories = [
    "All projects",
    ...new Set(projects.map((project) => project.category)),
  ];
  const [category, setCategory] = useState(
    categories.includes(initialCategory) ? initialCategory : "All projects",
  );
  const filtered = projects.filter(
    (project) => category === "All projects" || project.category === category,
  );
  return (
    <>
      <div
        className={s.categories}
        aria-label={translate("Project categories", locale)}
      >
        {categories.map((item, index) => (
          <button
            key={item}
            data-tone={index % 4}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            <T>{item}</T>
          </button>
        ))}
      </div>
      <section className={s.section}>
        <div className={s.sectionHead}>
          <h2>
            <T>Project library</T>
          </h2>
          <span className={s.count} role="status">
            <T>{filtered.length}</T> <T>projects</T>
          </span>
        </div>
        <div className={s.projectGrid}>
          {filtered.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>
        {!filtered.length && (
          <p>
            <T>No projects in this category.</T>
          </p>
        )}
      </section>
    </>
  );
}
