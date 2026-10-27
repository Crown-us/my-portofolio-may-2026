import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/domain";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: canonicalUrl("/sitemap.xml"),
  };
}
