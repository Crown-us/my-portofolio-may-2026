"use client";
import { translate } from "@/lib/i18n";

import { T, useLocale } from "@/app/components/LocaleProvider";

import { useState } from "react";
import Link from "@/app/components/LocalizedLink";
import Image from "@/app/components/LocalizedImage";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import s from "@/lib/styles";
export default function FeaturedCarousel({
  projects,
}: {
  projects: Project[];
}) {
  const locale = useLocale();
  const [index, setIndex] = useState(0);
  const project = projects[index];
  if (!project) return null;
  return (
    <section
      className={s.banner}
      data-tone={index % 3}
      aria-label={translate("Featured project", locale)}
    >
      <div className={s.bannerCopy} aria-live="polite">
        <span className={s.badge}>
          <T>Featured project · </T>
          <T>{project.category}</T>
        </span>
        <h2>
          <T>{project.title}</T>
        </h2>
        <p>
          <T>{project.summary}</T>
        </p>
        <Link className={s.button} href={`/projects/${project.slug}`}>
          <T>Explore project </T>
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className={s.bannerArt}>
        <div className={s.artCircle} />
        <div className={s.browser}>
          <div className={s.browserBar}>
            <span>● ● ●</span>
            <span>
              <T>{project.title.toLowerCase()}</T>
            </span>
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
            aria-label={translate("Previous featured project", locale)}
            onClick={() =>
              setIndex((index + projects.length - 1) % projects.length)
            }
          >
            <ChevronLeft size={20} />
          </button>
          <span>
            <T>{index + 1}</T> / <T>{projects.length}</T>
          </span>
          <button
            aria-label={translate("Next featured project", locale)}
            onClick={() => setIndex((index + 1) % projects.length)}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
