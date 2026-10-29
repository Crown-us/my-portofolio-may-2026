import test from "node:test";
import assert from "node:assert/strict";
import {
  parsePost,
  selectPosts,
  renderMarkdown,
  rssFeed,
} from "../lib/blog-core.ts";
const source = (extra = "", body = "## Hello\n\nA real note.") =>
  `---\ntitle: Test note\nslug: test-note\ndate: "2026-10-28"\nsummary: A test summary\ntags: [web]\ndraft: false\n${extra}---\n${body}`;
test("frontmatter validates actual date and required fields", () => {
  assert.equal(parsePost(source(), "test.md").slug, "test-note");
  assert.throws(
    () => parsePost(source().replace("2026-10-28", "2026-02-30"), "bad.md"),
    /date/,
  );
  assert.throws(
    () => parsePost(source().replace("draft: false", "draft: yes"), "bad.md"),
    /draft/,
  );
  assert.throws(
    () => parsePost(source().replace("tags: [web]", "tags: web"), "bad.md"),
    /tags/,
  );
});
test("published posts sorted newest first, filtered by tag, without drafts", () => {
  const p = parsePost(source(), "a");
  const older = { ...p, slug: "older", date: "2025-01-01", tags: ["mobile"] };
  const draft = { ...p, slug: "draft", draft: true };
  assert.deepEqual(
    selectPosts([older, draft, p]).map((p) => p.slug),
    ["test-note", "older"],
  );
  assert.equal(selectPosts([older, p], "mobile")[0].slug, "older");
  assert.equal(selectPosts([draft], undefined, true).length, 1);
  assert.throws(() => selectPosts([p, p]), /duplicate/i);
});
test("Markdown highlights code and builds unique safe heading anchors", async () => {
  const rendered = await renderMarkdown(
    "# Hello\n\n## Hello\n\n```js\nconst x = 1;\n```\n\n[bad](javascript:alert)\n\n<script>alert(1)</script>",
  );
  assert.equal(rendered.toc.length, 2);
  assert.notEqual(rendered.toc[0].id, rendered.toc[1].id);
  assert.ok(rendered.html.includes("hljs"));
  assert.ok(!rendered.html.includes("<h1"));
  assert.ok(!rendered.html.includes("javascript:"));
  assert.ok(!rendered.html.includes("<script>"));
});
test("RSS escapes XML and omits drafts", () => {
  const p = parsePost(source(), "a");
  const xml = rssFeed([
    { ...p, title: "A & B" },
    { ...p, slug: "draft", draft: true },
  ]);
  assert.ok(xml.includes("A &amp; B"));
  assert.ok(!xml.includes("/blog/draft"));
  assert.ok(rssFeed([]).includes("<channel>"));
});

test("unquoted YAML dates cannot normalize an impossible date", () => {
  assert.throws(
    () => parsePost(source().replace('"2026-10-28"', "2026-02-30"), "bad.md"),
    /date/,
  );
});

test("CMS article can be parsed repeatedly during static generation", () => {
  const cms = source().replace('"2026-10-28"', "2026-10-28");
  for (let i = 0; i < 3; i++) {
    assert.equal(parsePost(cms, "cms-repeat.md").date, "2026-10-28");
  }
});

test("CMS dates and cleared optional covers remain readable", () => {
  for (const cover of ['coverImage: ""\n', "coverImage: null\n"]) {
    const post = parsePost(
      source(cover).replace('"2026-10-28"', "2026-10-28"),
      "cms.md",
    );
    assert.equal(post.date, "2026-10-28");
    assert.equal(post.coverImage, undefined);
  }
});
