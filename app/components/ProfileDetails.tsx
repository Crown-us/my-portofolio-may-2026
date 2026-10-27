import { about } from "@/lib/about";
import s from "@/lib/styles";
export default function ProfileDetails() {
  return (
    <>
      {!!about.experience.length && (
        <section className={s.section}>
          <h2>Experience</h2>
          <ol className={s.timeline}>
            {[...about.experience]
              .sort((a, b) => b.startDate.localeCompare(a.startDate))
              .map((item) => (
                <li key={`${item.organization}-${item.period}`}>
                  <h3>{item.role}</h3>
                  <p>
                    {item.organization} · {item.period}
                  </p>
                  <p>{item.summary}</p>
                  {!!item.highlights.length && (
                    <ul>
                      {item.highlights.map((text) => (
                        <li key={text}>{text}</li>
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
