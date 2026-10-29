import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parsePost, selectPosts, type Post } from "./blog-core.ts";

// Reading every markdown file is only needed once per process. Development
// skips the cache so editing an article shows up without a restart.
const cache = new Map<boolean, Post[]>();

export function getPosts(
  includeDrafts = process.env.NODE_ENV === "development",
) {
  const shouldCache = process.env.NODE_ENV !== "development";
  const cached = cache.get(includeDrafts);
  if (shouldCache && cached) return cached;
  const folder = join(process.cwd(), "content/blog");
  const posts = readdirSync(folder)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parsePost(readFileSync(join(folder, file), "utf8"), file));
  const result = selectPosts(posts, undefined, includeDrafts);
  if (shouldCache) cache.set(includeDrafts, result);
  return result;
}
