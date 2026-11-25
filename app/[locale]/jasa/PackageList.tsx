import { T } from "@/app/components/LocaleProvider";
import WhatsAppLink from "@/app/components/WhatsAppLink";
import { priceLabel, services, type ServicePackage } from "@/lib/services";
import local from "@/app/components/Services.module.css";

function PackageCard({ item }: { item: ServicePackage }) {
  return (
    <article className={local.card}>
      <h3>
        <T>{item.title}</T>
      </h3>
      <p>
        <T>{item.summary}</T>
      </p>
      <ul>
        {item.features.map((feature) => (
          <li key={feature}>
            <T>{feature}</T>
          </li>
        ))}
      </ul>
      <div className={local.meta}>
        <p>
          <T>Estimated time</T>: <T>{item.estimatedDuration}</T>
        </p>
        <p>
          <T>Starting from</T>
          <strong>{priceLabel(item.startingPrice)}</strong>
        </p>
      </div>
      <div className={local.actions}>
        <WhatsAppLink
          className={local.primary}
          packageSlug={item.slug}
          packageTitle={item.title}
        >
          <T>Order this package</T>: <T>{item.title}</T>
        </WhatsAppLink>
      </div>
    </article>
  );
}

export default function PackageList() {
  return (
    <div className={local.grid}>
      {services.map((item) => (
        <PackageCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
