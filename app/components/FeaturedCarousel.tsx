"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import s from "@/lib/styles";
export default function FeaturedCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const [index, setIndex] = useState(0);
  const project = projects[index];
  if (!project) return null;
  return (
    <section
      className={s.banner}
      data-tone={index % 3}
      aria-label="Featured project"
    >
      <div className={s.bannerCopy} aria-live="polite">
        <span className={s.badge}>Featured project · {project.category}</span>
        <h2>{project.title}</h2>
        <p>{project.summary}</p>
        <Link className={s.button} href={`/projects/${project.slug}`}>
          Explore project <ArrowRight size={16} />
        </Link>
      </div>
      <div className={s.bannerArt}>
        <div className={s.artCircle} />
        <div className={s.browser}>
          <div className={s.browserBar}>
            <span>● ● ●</span>
            <span>{project.title.toLowerCase()}</span>
          </div>
          <Image
            src={project.image}
            alt={`${project.title} homepage`}
            width={1000}
            height={650}
            sizes="(max-width:700px) 85vw, 45vw"
            priority
          />
        </div>
      </div>
      {projects.length > 1 && (
        <div className={s.carousel}>
          <button
            aria-label="Previous featured project"
            onClick={() =>
              setIndex((index + projects.length - 1) % projects.length)
            }
          >
            <ChevronLeft size={20} />
          </button>
          <span>
            {index + 1} / {projects.length}
          </span>
          <button
            aria-label="Next featured project"
            onClick={() => setIndex((index + 1) % projects.length)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
