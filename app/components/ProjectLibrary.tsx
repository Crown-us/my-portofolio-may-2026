"use client";
import { translate } from "@/lib/i18n";

import { T, useLocale } from "@/app/components/LocaleProvider";

import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import s from "@/lib/styles";

const ALL = "All projects";

function readCategory() {
  return new URLSearchParams(window.location.search).get("category") ?? "";
}

export default function ProjectLibrary() {
  const locale = useLocale();
  const categories = [
    ALL,
    ...new Set(projects.map((project) => project.category)),
  ];
  const [category, setCategory] = useState(ALL);

  useEffect(() => {
    const sync = () => setCategory(readCategory());
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const active = categories.includes(category) ? category : ALL;
  const filtered = projects.filter(
    (project) => active === ALL || project.category === active,
  );

  function selectCategory(value: string) {
    setCategory(value);
    const url = new URL(window.location.href);
    if (value === ALL) url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  }

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
            aria-pressed={active === item}
            onClick={() => selectCategory(item)}
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
            <T>{filtered.length}</T>{" "}
            <T>{filtered.length === 1 ? "project" : "projects"}</T>
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
