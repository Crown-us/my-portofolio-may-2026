import Image from "next/image";
import type { CaseStudy } from "@/lib/projects";
import s from "@/lib/styles";
export default function CaseSections({ study }: { study: CaseStudy }) {
  return (
    <>
      {(study.role || study.timeframe || study.teamSize !== null) && (
        <dl className={s.facts}>
          {study.role && (
            <div>
              <dt>My role</dt>
              <dd>{study.role}</dd>
            </div>
          )}
          {study.timeframe && (
            <div>
              <dt>Timeframe</dt>
              <dd>{study.timeframe}</dd>
            </div>
          )}
          {study.teamSize !== null && (
            <div>
              <dt>Team</dt>
              <dd>{study.teamSize} people</dd>
            </div>
          )}
        </dl>
      )}
      {study.problem && (
        <section className={s.section}>
          <h2>The problem</h2>
          <p className={s.lead}>{study.problem}</p>
        </section>
      )}
      {Object.values(study.stack).some((items) => items.length) && (
        <section className={s.section}>
          <h2>Built with</h2>
          <div className={s.toolGrid}>
            {Object.entries(study.stack)
              .filter(([, items]) => items.length)
              .map(([area, items]) => (
                <div className={s.panel} key={area}>
                  <h3>{area}</h3>
                  <div className={s.tags}>
                    {items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
      {!!study.features.length && (
        <section className={s.section}>
          <h2>Key features</h2>
          {study.features.map((f) => (
            <div className={s.panel} key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </section>
      )}
      {(study.architecture || study.diagram) && (
        <section className={s.section}>
          <h2>Architecture</h2>
          {study.architecture && <p className={s.lead}>{study.architecture}</p>}
          {study.diagram && (
            <Image
              className={s.detailImage}
              src={study.diagram}
              alt="Project architecture diagram"
              width={1000}
              height={650}
            />
          )}
        </section>
      )}
      {!!study.challenges.length && (
        <section className={s.section}>
          <h2>Challenges & solutions</h2>
          {study.challenges.map((c) => (
            <div className={s.panel} key={c.challenge}>
              <h3>{c.challenge}</h3>
              <p>{c.solution}</p>
            </div>
          ))}
        </section>
      )}
      {study.results.some((r) => r.source) && (
        <section className={s.section}>
          <h2>Results</h2>
          {study.results
            .filter((r) => r.source)
            .map((r) => (
              <div className={s.panel} key={r.label}>
                <h3>
                  {r.label}: {r.value}
                </h3>
                <p>Source: {r.source}</p>
              </div>
            ))}
        </section>
      )}
    </>
  );
}
