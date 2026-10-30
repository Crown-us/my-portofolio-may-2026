import type { Post } from "./blog-core.ts";
export function relatedPosts(posts: Post[], current: Post, limit = 2) {
  const relevance = (post: Post) =>
    post.tags.filter((tag) => current.tags.includes(tag)).length;
  return posts
    .filter((post) => !post.draft && post.slug !== current.slug)
    .sort(
      (a, b) =>
        relevance(b) - relevance(a) ||
        b.date.localeCompare(a.date) ||
        a.slug.localeCompare(b.slug),
    )
    .slice(0, limit);
}
