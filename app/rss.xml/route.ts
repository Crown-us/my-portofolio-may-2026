import { getPosts } from "@/lib/blog";
import { rssFeed } from "@/lib/blog-core";
export const dynamic = "force-static";
export function GET() {
  return new Response(rssFeed(getPosts(false)), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
