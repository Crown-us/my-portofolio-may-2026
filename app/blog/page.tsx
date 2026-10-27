import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";
import SiteShell, { PageIntro } from "../components/SiteShell";
import BlogLibrary from "../components/BlogLibrary";
import { getPosts } from "@/lib/blog";
import { buildSeo } from "@/lib/seo";
import s from "@/lib/styles";
import b from "./blog.module.css";
export const metadata = buildSeo(
  "Blog",
  "/blog",
  "Notes, experiments, and lessons from building software by Kevin Dwi Wijaya.",
);
export default function BlogPage() {
  const posts = getPosts();
  return (
    <SiteShell>
      <PageIntro title="Notes from the workbench." eyebrow="BLOG / DEVLOG" />
      <section className={b.banner}>
        <div>
          <span className={b.label}>BEHIND THE BUILD</span>
          <h2>A place for the process.</h2>
          <p>Code, experiments, and the lessons in between.</p>
        </div>
        <div className={b.illustration} aria-hidden="true">
          <div className={b.paper}>
            <span>kevin / notes</span>
            <BookOpen size={48} strokeWidth={1.4} />
            <i />
            <i />
            <i />
          </div>
          <span className={b.star}>✦</span>
        </div>
      </section>
      {posts.length ? (
        <BlogLibrary
          posts={posts.map(({ content, ...post }) => {
            void content;
            return post;
          })}
        />
      ) : (
        <section className={b.empty}>
          <BookOpen size={28} strokeWidth={1.5} />
          <h2>No posts published yet.</h2>
          <p>
            When there’s a story to share, you’ll find it here.
            <br />
            For now, explore the projects behind the work.
          </p>
          <Link className={s.button} href="/projects">
            Explore projects <ArrowUpRight size={15} />
          </Link>
        </section>
      )}
      <div className={b.feed}>
        <span>Prefer your own reader?</span>
        <a href="/rss.xml">RSS feed ↗</a>
      </div>
    </SiteShell>
  );
}
