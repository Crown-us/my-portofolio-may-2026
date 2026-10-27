import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import { about } from "@/lib/about";
import s from "@/lib/styles";

const IGNORED_WORDS = new Set(["pt", "cv", "ud", "tbk"]);

function initials(name: string) {
  return name
    .replace(/\(.*?\)/g, " ")
    .split(/[\s.]+/)
    .filter((word) => word && !IGNORED_WORDS.has(word.toLowerCase()))
    .slice(0, 3)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export default function ProfileDetails() {
  return (
    <>
      {!!about.experience.length && (
        <section className={s.section}>
          <h2>Experience</h2>
          <ol className={s.experienceList}>
            {[...about.experience]
              .sort((a, b) => b.startDate.localeCompare(a.startDate))
              .map((item, index) => (
                <li
                  className={s.experienceCard}
                  key={`${item.organization}-${item.period}`}
                >
                  <div className={s.expTop}>
                    {item.logo ? (
                      <Image
                        className={s.expLogo}
                        src={item.logo}
                        alt={`${item.organization} logo`}
                        width={46}
                        height={46}
                      />
                    ) : (
                      <span
                        className={s.expAvatar}
                        data-tone={index % 4}
                        aria-hidden="true"
                      >
                        {initials(item.organization)}
                      </span>
                    )}
                    <div className={s.expHead}>
                      <h3>{item.role}</h3>
                      <p className={s.expOrg}>{item.organization}</p>
                    </div>
                    <span className={s.expBadge}>{item.period}</span>
                  </div>
                  {item.location && (
                    <p className={s.expMeta}>
                      <MapPin size={14} aria-hidden="true" />
                      {item.location}
                    </p>
                  )}
                  <p className={s.expSummary}>{item.summary}</p>
                  {!!item.highlights.length && (
                    <ul className={s.expHighlights}>
                      {item.highlights.map((text) => (
                        <li key={text}>
                          <Check size={16} aria-hidden="true" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ol>
        </section>
      )}
      {!!about.certifications.length && (
        <section className={s.section}>
          <h2>Certifications</h2>
          {about.certifications.map((cert) => (
            <article className={s.panel} key={cert.name}>
              <h3>{cert.name}</h3>
              <p>
                {cert.issuer} · {cert.year}
              </p>
              {cert.credentialUrl && (
                <a
                  className={s.textLink}
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View credential ↗
                </a>
              )}
            </article>
          ))}
        </section>
      )}
      <section className={s.section}>
        <h2>My toolkit</h2>
        <div className={s.toolGrid}>
          {about.skills
            .filter((group) => group.items.length)
            .map((group) => (
              <div className={s.panel} key={group.area}>
                <h3>{group.area}</h3>
                <div className={s.tags}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
