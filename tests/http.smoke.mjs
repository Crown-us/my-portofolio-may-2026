import assert from "node:assert/strict";
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3001";
if (!["127.0.0.1", "localhost"].includes(new URL(base).hostname))
  throw new Error("Smoke tests must target localhost.");
for (const path of [
  "/",
  "/projects",
  "/about",
  "/services",
  "/contact",
  "/resume",
  "/projects/lms-westud",
  "/projects/seger-marketplace",
  "/projects/rtrw-community-platform",
]) {
  const response = await fetch(base + path);
  const html = await response.text();
  assert.equal(response.status, 200, path);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    path + " single h1",
  );
  assert.ok(
    html.includes(`href="https://kvndwi.com${path === "/" ? "" : path}"`),
    path + " canonical",
  );
  assert.ok(!html.includes('href="/store"'), "empty store hidden");
  console.log("OK", path);
}
for (const path of [
  "/projects/does-not-exist",
  "/store",
  "/store/does-not-exist",
])
  assert.equal((await fetch(base + path)).status, 404, path);
const legacy = await fetch(base + "/works/lms-westud", { redirect: "manual" });
assert.equal(legacy.status, 308);
assert.equal(legacy.headers.get("location"), "/projects/lms-westud");
const sitemap = await (await fetch(base + "/sitemap.xml")).text();
assert.ok(sitemap.includes("https://kvndwi.com/projects/lms-westud"));
assert.ok(!sitemap.includes("/store"));
const robots = await (await fetch(base + "/robots.txt")).text();
assert.ok(robots.includes("https://kvndwi.com/sitemap.xml"));
const og = await fetch(base + "/opengraph-image");
assert.equal(og.status, 200);
assert.ok(og.headers.get("content-type").includes("image/png"));
const malformed = await fetch(base + "/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: "{}",
});
assert.equal(malformed.status, 400);
const crossOrigin = await fetch(base + "/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: "https://other.example",
  },
  body: "{}",
});
assert.equal(crossOrigin.status, 403);
const oversized = await fetch(base + "/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "x".repeat(33000) }),
});
assert.equal(oversized.status, 413);
console.log(
  "PASS: routes, metadata, redirects, hidden store, OG, sitemap, robots and API guards. No email sent.",
);
