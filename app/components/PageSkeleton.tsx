import SiteShell from "@/app/components/SiteShell";
import s from "@/lib/styles";

// Shared route skeleton. Only mount it on segments where every page can be
// rendered to completion: a Suspense boundary above a page that calls
// notFound() turns its 404 into a streamed 200.
export default function PageSkeleton() {
  return (
    <SiteShell>
      <div className={s.skeletonIntro} aria-hidden="true">
        <span className={s.skeletonLine} data-size="short" />
        <span className={s.skeletonLine} data-size="long" />
      </div>
      <div className={s.skeletonGrid} aria-hidden="true">
        {[0, 1, 2].map((card) => (
          <div className={s.skeletonCard} key={card}>
            <span className={s.skeletonBlock} />
            <span className={s.skeletonLine} data-size="medium" />
            <span className={s.skeletonLine} data-size="short" />
          </div>
        ))}
      </div>
      <span className={s.visuallyHidden} role="status">
        Loading…
      </span>
    </SiteShell>
  );
}
