import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parsePost, selectPosts } from "./blog-core.ts";
export function getPosts(
  includeDrafts = process.env.NODE_ENV === "development",
) {
  const folder = join(process.cwd(), "content/blog");
  const posts = readdirSync(folder)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parsePost(readFileSync(join(folder, file), "utf8"), file));
  return selectPosts(posts, undefined, includeDrafts);
}
