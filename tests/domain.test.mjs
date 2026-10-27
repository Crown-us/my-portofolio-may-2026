import test from "node:test";
import assert from "node:assert/strict";
import {
  formatPrice,
  validateContact,
  validateProducts,
  getFeatured,
  findProject,
  visibleSections,
  serviceSelection,
  canonicalUrl,
  sitemapPaths,
} from "../lib/domain.ts";
test("featured selection uses flag and max three", () =>
  assert.equal(
    getFeatured([
      { isFeatured: false },
      { isFeatured: true },
      { isFeatured: true },
      { isFeatured: true },
      { isFeatured: true },
    ]).length,
    3,
  ));
test("unknown slug is absent", () =>
  assert.equal(findProject([{ slug: "known" }], "missing"), undefined));
test("empty case study sections remain hidden", () =>
  assert.deepEqual(
    visibleSections({ problem: "", features: [], results: [] }),
    [],
  ));
test("prices preserve null/free distinction", () => {
  assert.equal(formatPrice(null), "Contact for quote");
  assert.equal(formatPrice(null, true), "Free");
  assert.match(formatPrice(150000), /150\.000/);
});
test("service preselection rejects unknown and array input", () => {
  assert.equal(serviceSelection("web", ["web"]), "web");
  assert.equal(serviceSelection(["web"], ["web"]), "");
  assert.equal(serviceSelection("bad", ["web"]), "");
});
test("valid contact passes", () =>
  assert.equal(
    validateContact(
      {
        name: "Kevin",
        email: "a@example.com",
        message: "I need a website for my shop.",
        service: "",
        budget: "",
        website: "",
      },
      [],
    ).isValid,
    true,
  ));
test("contact rejects malformed email, empty message and honeypot", () => {
  for (const patch of [
    { email: "wrong" },
    { message: "" },
    { website: "spam" },
  ])
    assert.equal(
      validateContact(
        {
          name: "Kevin",
          email: "a@example.com",
          message: "A real project message",
          ...patch,
        },
        [],
      ).isValid,
      false,
    );
});
test("contact rejects unknown fields types", () =>
  assert.equal(
    validateContact({ name: [], email: 42, message: {} }, []).isValid,
    false,
  ));
test("empty store is valid and absent from sitemap", () => {
  assert.doesNotThrow(() => validateProducts([]));
  assert.equal(sitemapPaths([], []).includes("/store"), false);
});
test("store rejects duplicate slug and insecure checkout", () => {
  const p = {
    slug: "test",
    checkoutUrl: "https://gumroad.com/l/test",
    platform: "gumroad",
    price: 10,
    currency: "IDR",
  };
  assert.throws(() => validateProducts([p, p]));
  assert.throws(() =>
    validateProducts([{ ...p, checkoutUrl: "http://gumroad.com/l/test" }]),
  );
});
test("canonical URL and sitemap project path", () => {
  assert.equal(canonicalUrl("/about"), "https://kvndwi.com/about");
  assert.ok(sitemapPaths([{ slug: "test" }], []).includes("/projects/test"));
});
