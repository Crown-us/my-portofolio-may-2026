import test from "node:test";
import assert from "node:assert/strict";
import { submitContact, createRateLimiter } from "../lib/contact-server.ts";
const valid = {
  name: "Test user",
  email: "test@example.com",
  message: "A valid project inquiry",
  service: "",
  budget: "",
  website: "",
};
const config = {
  apiKey: "test-key",
  from: "from@example.com",
  to: "to@example.com",
};
test("validation stops email provider calls", async () => {
  let calls = 0;
  const result = await submitContact(
    { ...valid, website: "bot" },
    [],
    config,
    async () => {
      calls++;
    },
  );
  assert.equal(result.status, 400);
  assert.equal(calls, 0);
});
test("unconfigured email returns 503, never fake success", async () => {
  const result = await submitContact(valid, [], {});
  assert.equal(result.status, 503);
});
test("provider failure is a safe error", async () => {
  const result = await submitContact(
    valid,
    [],
    config,
    async () => new Response("secret details", { status: 403 }),
  );
  assert.equal(result.status, 502);
  assert.ok(!JSON.stringify(result).includes("secret"));
});
test("network failure returns 502", async () => {
  const result = await submitContact(valid, [], config, async () => {
    throw new Error("network");
  });
  assert.equal(result.status, 502);
});
test("successful provider receipt sends expected plain-text email", async () => {
  let sent;
  const result = await submitContact(
    valid,
    [],
    config,
    async (url, options) => {
      assert.equal(url, "https://api.resend.com/emails");
      sent = JSON.parse(options.body);
      return Response.json({ id: "mock-receipt" });
    },
  );
  assert.equal(result.status, 200);
  assert.equal(sent.reply_to, valid.email);
  assert.ok(sent.text.includes(valid.message));
  assert.equal(sent.html, undefined);
});
test("malformed provider success is not accepted", async () => {
  assert.equal(
    (await submitContact(valid, [], config, async () => Response.json({})))
      .status,
    502,
  );
});
test("rate limiter isolates keys and expires windows", () => {
  const allow = createRateLimiter(2, 100);
  assert.ok(allow("a", 0));
  assert.ok(allow("a", 1));
  assert.equal(allow("a", 2), false);
  assert.ok(allow("b", 2));
  assert.ok(allow("a", 100));
});

import { isAllowedOrigin } from "../lib/contact-server.ts";
test("origin accepts same browser Host when Next uses localhost internally", () => {
  assert.ok(
    isAllowedOrigin(
      "http://127.0.0.1:3001",
      "http://localhost:3001/api/contact",
      "127.0.0.1:3001",
    ),
  );
  assert.equal(
    isAllowedOrigin(
      "https://evil.example",
      "http://localhost:3001/api/contact",
      "127.0.0.1:3001",
    ),
    false,
  );
  assert.equal(
    isAllowedOrigin(
      "null",
      "http://localhost:3001/api/contact",
      "127.0.0.1:3001",
    ),
    false,
  );
});
