import { T } from "@/app/components/LocaleProvider";
import Link from "@/app/components/LocalizedLink";
import { ArrowRight } from "lucide-react";
import s from "@/lib/styles";
export default function ContactCta() {
  return (
    <section className={s.contact}>
      <div>
        <p className={s.eyebrow}>
          <T>LET’S BUILD SOMETHING GOOD</T>
        </p>
        <h2>
          <T>Your next idea could start here.</T>
        </h2>
        <p>
          <T>Tell me what you want to build, improve, or explore.</T>
        </p>
      </div>
      <Link className={s.button} href="/contact" data-umami-event="contact-cta">
        <T>Get in touch </T>
        <ArrowRight size={17} />
      </Link>
    </section>
  );
}
