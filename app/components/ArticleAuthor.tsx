import Image from "@/app/components/LocalizedImage";
import Link from "@/app/components/LocalizedLink";
import { siteConfig } from "@/lib/config";
import a from "./ArticleAuthor.module.css";

export default function ArticleAuthor({
  locale,
  compact = false,
}: {
  locale: string;
  compact?: boolean;
}) {
  const en = locale === "en";
  if (compact)
    return (
      <p className={a.byline}>
        {en ? "Written by" : "Ditulis oleh"}{" "}
        <Link href="/about" rel="author">
          {siteConfig.name}
        </Link>
      </p>
    );

  return (
    <section className={a.profile} aria-labelledby="article-author-heading">
      <Image
        src="/images/kevin-author.png"
        alt={siteConfig.name}
        width={88}
        height={88}
        className={a.portrait}
      />
      <div className={a.details}>
        <p className={a.label}>{en ? "About the author" : "Tentang penulis"}</p>
        <h2 id="article-author-heading">
          <Link href="/about" rel="author">
            {siteConfig.name}
          </Link>
        </h2>
        <p className={a.bio}>
          {en
            ? "A full-stack and mobile developer based in Kediri, Indonesia. I build web and mobile apps and write about technology and AI for everyday use."
            : "Pengembang web dan aplikasi mobile dari Kediri, Indonesia. Saya membangun aplikasi dan menulis tentang teknologi serta AI untuk keseharian."}
        </p>
        <div className={a.links}>
          <Link href="/about">
            {en ? "Get to know me" : "Kenalan dengan saya"}
            <span aria-hidden="true">→</span>
          </Link>
          <Link href="/projects">
            {en ? "Explore my work" : "Lihat karya saya"}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
