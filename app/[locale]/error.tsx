"use client";
import Link from "@/app/components/LocalizedLink";
import { T } from "@/app/components/LocaleProvider";
import SiteShell, { PageIntro } from "@/app/components/SiteShell";
import s from "@/lib/styles";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <SiteShell>
      <PageIntro eyebrow="ERROR" title="This page couldn’t load." />
      <section className={s.notice}>
        <p>
          <T>
            Something unexpected stopped this page. Trying again usually helps.
          </T>
        </p>
        <div className={s.noticeActions}>
          <button className={s.button} onClick={reset}>
            <T>Try again</T>
          </button>
          <Link className={s.textLink} href="/">
            <T>Back to Discover ↗</T>
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
