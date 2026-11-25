import test from "node:test";
import assert from "node:assert/strict";
import { orderLink, whatsappLink } from "../lib/whatsapp.ts";
import { siteConfig } from "../lib/config.ts";
import {
  priceLabel,
  revisionPolicy,
  serviceFaq,
  services,
  workSteps,
} from "../lib/services.ts";
import translations from "../lib/translations.json" with { type: "json" };

const messageOf = (link) => new URL(link).searchParams.get("text");

test("WhatsApp link uses digits only and encodes the message", () => {
  assert.equal(
    whatsappLink("+62 812-345", "Halo & apa kabar?\n#1"),
    "https://wa.me/62812345?text=Halo%20%26%20apa%20kabar%3F%0A%231",
  );
});
test("order link targets the configured number and names the package", () => {
  for (const { title } of services) {
    const link = orderLink("id", title);
    assert.ok(link.startsWith(`https://wa.me/${siteConfig.whatsapp}?text=`));
    assert.ok(messageOf(link).includes(translations[title] ?? title), title);
  }
});
test("order message follows the language and works without a package", () => {
  assert.match(messageOf(orderLink("en")), /^Hi Kevin/);
  assert.match(messageOf(orderLink("id")), /^Halo Kevin/);
  assert.ok(!messageOf(orderLink("id")).includes("{package}"));
});
test("contact number is in international format", () => {
  assert.match(siteConfig.whatsapp, /^62\d{8,13}$/);
});
test("four packages with unique slugs", () => {
  assert.deepEqual(
    services.map((item) => item.slug),
    ["starter", "landing-page", "company-profile", "web-app"],
  );
  assert.equal(workSteps.length, 4);
  assert.ok(serviceFaq.length >= 3 && serviceFaq.length <= 5);
});
test("starting prices rise per package and read as Rupiah", () => {
  const prices = services.map((item) => item.startingPrice);
  assert.deepEqual(prices, [500000, 750000, 1750000, 3500000]);
  assert.match(priceLabel(prices[0]), /^Rp\s500\.000$/);
});
test("every service text has an Indonesian translation", () => {
  const texts = [
    ...services.flatMap((item) => [
      item.summary,
      item.estimatedDuration,
      ...item.features,
    ]),
    ...workSteps.flatMap((step) => [step.title, step.description]),
    ...serviceFaq.flatMap((item) => [item.question, item.answer]),
    revisionPolicy,
  ];
  for (const text of texts) assert.ok(translations[text], text);
});
