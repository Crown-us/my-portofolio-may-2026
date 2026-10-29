import { T } from "@/app/components/LocaleProvider";
import Image from "@/app/components/LocalizedImage";
import type { CaseStudy } from "@/lib/projects";
import s from "@/lib/styles";
export default function CaseSections({ study }: { study: CaseStudy }) {
  return (
    <>
      {(study.role || study.timeframe || study.teamSize !== null) && (
        <dl className={s.facts}>
          {study.role && (
            <div>
              <dt>
                <T>My role</T>
              </dt>
              <dd>
                <T>{study.role}</T>
              </dd>
            </div>
          )}
          {study.timeframe && (
            <div>
              <dt>
                <T>Timeframe</T>
              </dt>
              <dd>
                <T>{study.timeframe}</T>
              </dd>
            </div>
          )}
          {study.teamSize !== null && (
            <div>
              <dt>
                <T>Team</T>
              </dt>
              <dd>
                <T>{study.teamSize}</T>{" "}
                <T>{study.teamSize === 1 ? "person" : "people"}</T>
              </dd>
            </div>
          )}
        </dl>
      )}
      {study.problem && (
        <section className={s.section}>
          <h2>
            <T>The problem</T>
          </h2>
          <p className={s.lead}>
            <T>{study.problem}</T>
          </p>
        </section>
      )}
      {Object.values(study.stack).some((items) => items.length) && (
        <section className={s.section}>
          <h2>
            <T>Built with</T>
          </h2>
          <div className={s.toolGrid}>
            {Object.entries(study.stack)
              .filter(([, items]) => items.length)
              .map(([area, items]) => (
                <div className={s.panel} key={area}>
                  <h3>
                    <T>{area}</T>
                  </h3>
                  <div className={s.tags}>
                    {items.map((item) => (
                      <span key={item}>
                        <T>{item}</T>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
      {!!study.features.length && (
        <section className={s.section}>
          <h2>
            <T>Key features</T>
          </h2>
          {study.features.map((f) => (
            <div className={s.panel} key={f.title}>
              <h3>
                <T>{f.title}</T>
              </h3>
              <p>
                <T>{f.description}</T>
              </p>
            </div>
          ))}
        </section>
      )}
      {(study.architecture || study.diagram) && (
        <section className={s.section}>
          <h2>
            <T>Architecture</T>
          </h2>
          {study.architecture && (
            <p className={s.lead}>
              <T>{study.architecture}</T>
            </p>
          )}
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
          <h2>
            <T>Challenges & solutions</T>
          </h2>
          {study.challenges.map((c) => (
            <div className={s.panel} key={c.challenge}>
              <h3>
                <T>{c.challenge}</T>
              </h3>
              <p>
                <T>{c.solution}</T>
              </p>
            </div>
          ))}
        </section>
      )}
      {study.results.some((r) => r.source) && (
        <section className={s.section}>
          <h2>
            <T>Results</T>
          </h2>
          {study.results
            .filter((r) => r.source)
            .map((r) => (
              <div className={s.panel} key={r.label}>
                <h3>
                  <T>{r.label}</T>: <T>{r.value}</T>
                </h3>
                <p>
                  <T>Source: </T>
                  <T>{r.source}</T>
                </p>
              </div>
            ))}
        </section>
      )}
    </>
  );
}
