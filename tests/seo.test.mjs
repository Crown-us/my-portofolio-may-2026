import test from "node:test";
import assert from "node:assert/strict";
import { buildSeo } from "../lib/seo.ts";
import {
  canonicalUrl,
  DEFAULT_DESCRIPTION,
  jsonLd,
  sitemapPaths,
} from "../lib/domain.ts";
import { projects } from "../lib/projects.ts";
import { products } from "../lib/store.ts";
test("SEO includes canonical, fallback, social image", () => {
  const seo = buildSeo("About me", "/about", "  ");
  assert.equal(seo.alternates.canonical, "https://kvndwi.com/about");
  assert.equal(seo.description, DEFAULT_DESCRIPTION);
  assert.equal(
    seo.openGraph.images[0].url,
    "https://kvndwi.com/opengraph-image",
  );
  assert.equal(seo.twitter.card, "summary_large_image");
});
test("canonical paths cannot override production origin", () => {
  assert.equal(
    new URL(canonicalUrl("//evil.example/path")).origin,
    "https://kvndwi.com",
  );
});
test("sitemap includes real projects and excludes empty store", () => {
  const paths = sitemapPaths(projects, products);
  assert.ok(paths.includes("/projects/lms-westud"));
  assert.equal(paths.filter((p) => p.startsWith("/store")).length, 0);
  assert.equal(new Set(paths).size, paths.length);
});
test("JSON-LD escapes script terminators", () => {
  assert.ok(!jsonLd({ name: "</script><script>" }).includes("<"));
});
