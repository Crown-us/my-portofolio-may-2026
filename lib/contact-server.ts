import { validateContact } from "./domain.ts";
type MailConfig = { apiKey?: string; from?: string; to?: string };
export function createRateLimiter(limit = 5, windowMs = 600_000) {
  const entries = new Map<string, { count: number; expires: number }>();
  return (key: string, now = Date.now()) => {
    for (const [id, item] of entries)
      if (item.expires <= now) entries.delete(id);
    const entry = entries.get(key) ?? { count: 0, expires: now + windowMs };
    if (entry.count >= limit || (!entries.has(key) && entries.size >= 10_000))
      return false;
    entry.count++;
    entries.set(key, entry);
    return true;
  };
}
export async function submitContact(
  input: unknown,
  slugs: string[],
  config: MailConfig,
  send: typeof fetch = fetch,
) {
  const result = validateContact(input, slugs);
  if (!result.isValid)
    return {
      status: 400,
      body: { message: "Please check the form.", errors: result.errors },
    };
  if (!config.apiKey || !config.from || !config.to)
    return {
      status: 503,
      body: {
        message:
          "Email delivery is not configured yet. Please use WhatsApp or email directly.",
      },
    };
  const { name, email, service, budget, message } = result.data;
  try {
    const response = await send("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: email,
        subject: `Portfolio inquiry${service ? `: ${service}` : ""}`,
        text: `Name: ${name}\nEmail: ${email}\nService: ${service || "Not selected"}\nBudget: ${budget || "Not selected"}\n\n${message}`,
      }),
    });
    const receipt = response.ok ? await response.json() : null;
    if (!response.ok || typeof receipt?.id !== "string")
      throw new Error("Delivery rejected");
    return {
      status: 200,
      body: { message: "Your message has been sent. Thank you!" },
    };
  } catch {
    return {
      status: 502,
      body: {
        message:
          "Could not send your message. Please try again or contact me directly.",
      },
    };
  }
}

export function isAllowedOrigin(
  origin: string | null,
  requestUrl: string,
  host: string | null,
) {
  if (!origin) return true;
  try {
    const source = new URL(origin),
      target = new URL(requestUrl);
    return (
      source.origin === target.origin ||
      (source.protocol === target.protocol && source.host === host)
    );
  } catch {
    return false;
  }
}
