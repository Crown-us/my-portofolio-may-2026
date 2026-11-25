import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import { ArrowRight } from "lucide-react";
import s from "@/lib/styles";
export default function ContactCta() {
  return (
    <section className={s.contact}>
      <div>
        <p className={s.eyebrow}>
          <T>WEBSITE SERVICES</T>
        </p>
        <h2>
          <T>Need a website for your business?</T>
        </h2>
        <p>
          <T>See the packages, then chat about what you need.</T>
        </p>
      </div>
      <Link className={s.button} href="/jasa" data-umami-event="services-cta">
        <T>See services</T>
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
