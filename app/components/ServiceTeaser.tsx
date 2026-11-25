import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import { priceLabel, services } from "@/lib/services";
import local from "./Services.module.css";

export default function ServiceTeaser() {
  return (
    <>
      <div className={local.grid}>
        {services.map((item) => (
          <article key={item.slug} className={local.card}>
            <h3>
              <T>{item.title}</T>
            </h3>
            <p>
              <T>{item.summary}</T>
            </p>
            <p className={local.meta}>
              <T>Starting from</T> {priceLabel(item.startingPrice)}
            </p>
          </article>
        ))}
      </div>
      <div className={local.actions}>
        <Link href="/jasa" className={local.secondary}>
          <T>See packages and details →</T>
        </Link>
      </div>
    </>
  );
}
