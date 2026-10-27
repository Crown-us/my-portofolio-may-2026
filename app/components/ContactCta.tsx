import Link from "next/link";
import { ArrowRight } from "lucide-react";
import s from "@/lib/styles";
export default function ContactCta() {
  return (
    <section className={s.contact}>
      <div>
        <p className={s.eyebrow}>LET’S BUILD SOMETHING GOOD</p>
        <h2>Your next idea could start here.</h2>
        <p>Tell me what you want to build, improve, or explore.</p>
      </div>
      <Link className={s.button} href="/contact" data-umami-event="contact-cta">
        Get in touch <ArrowRight size={17} />
      </Link>
    </section>
  );
}
