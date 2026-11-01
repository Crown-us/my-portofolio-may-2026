import test from "node:test";
import assert from "node:assert/strict";
import { buildSearchIndex, searchEntries } from "../lib/search.ts";

const post = {
  title: "Mode Incognito",
  slug: "incognito",
  summary: "Privasi browser",
  tags: ["Privasi"],
  draft: false,
};
const project = {
  title: "WeStud",
  slug: "westud",
  summary: "Platform belajar",
  tech: ["React", "Supabase"],
};

test("search excludes drafts and keeps Indonesian articles on their canonical locale", () => {
  const entries = buildSearchIndex(
    [post, { ...post, slug: "draft", draft: true }],
    [project],
    [],
    "en",
  );
  assert.equal(entries.length, 2);
  assert.equal(entries[0].href, "/id/blog/incognito");
  assert.equal(entries[1].href, "/en/projects/westud");
});

test("search matches all words across titles, topics, and technology without case sensitivity", () => {
  const entries = buildSearchIndex([post], [project], [], "id");
  assert.equal(searchEntries(entries, "  REACT belajar ")[0].title, "WeStud");
  assert.equal(
    searchEntries(entries, "incognito privasi")[0].title,
    "Mode Incognito",
  );
  assert.deepEqual(searchEntries(entries, "react incognito"), []);
  assert.deepEqual(searchEntries(entries, "   "), []);
});

test("products become searchable when supplied, and title matches rank above description matches", () => {
  const product = {
    title: "React Starter",
    slug: "react-starter",
    tagline: "Template dashboard",
    techStack: ["TypeScript"],
  };
  const entries = buildSearchIndex([], [project], [product], "id");
  const matches = searchEntries(entries, "react");
  assert.equal(matches[0].href, "/id/store/react-starter");
  assert.equal(matches[1].title, "WeStud");
});
