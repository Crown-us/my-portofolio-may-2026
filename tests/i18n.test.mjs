import test from "node:test";
import assert from "node:assert/strict";
import { localePath, translate, isLocale } from "../lib/i18n.ts";
import { buildSeo, localizeSeo } from "../lib/seo.ts";

test("language links preserve route, filters, and anchors", () => {
  assert.equal(
    localePath("/id/projects?category=Education#list", "en"),
    "/en/projects?category=Education#list",
  );
  assert.equal(localePath("/", "id"), "/id");
  for (const path of [
    "/api/contact",
    "/rss.xml",
    "https://example.com",
    "#main-content",
  ])
    assert.equal(localePath(path, "en"), path);
  assert.equal(isLocale("fr"), false);
});
test("labels translate both ways without altering unknown article titles", () => {
  assert.equal(translate("About me", "id"), "Tentang saya");
  assert.equal(translate("Terbaru di Blog", "en"), "Latest on the Blog");
  assert.equal(
    translate("Jawaban AI Meyakinkan?", "en"),
    "Jawaban AI Meyakinkan?",
  );
});
test("metadata declares the selected canonical and both alternatives", () => {
  const meta = localizeSeo(buildSeo("About me", "/about"), "id");
  assert.equal(meta.title, "Tentang saya — Kevin Dwi Wijaya");
  assert.equal(meta.alternates.canonical, "https://kvndwi.com/id/about");
  assert.equal(meta.alternates.languages.en, "https://kvndwi.com/en/about");
});
