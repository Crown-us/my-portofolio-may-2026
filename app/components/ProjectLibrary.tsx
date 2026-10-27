"use client";
import { useState } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import s from "@/lib/styles";
export default function ProjectLibrary({
  initialCategory = "All projects",
}: {
  initialCategory?: string;
}) {
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
      <div className={s.categories} aria-label="Project categories">
        {categories.map((item, index) => (
          <button
            key={item}
            data-tone={index % 4}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <section className={s.section}>
        <div className={s.sectionHead}>
          <h2>Project library</h2>
          <span className={s.count} role="status">
            {filtered.length} projects
          </span>
        </div>
        <div className={s.projectGrid}>
          {filtered.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.slug} />
          ))}
        </div>
        {!filtered.length && <p>No projects in this category.</p>}
      </section>
    </>
  );
}
