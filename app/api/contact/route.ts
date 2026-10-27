import {
  createRateLimiter,
  submitContact,
  isAllowedOrigin,
} from "@/lib/contact-server";
import { services } from "@/lib/services";
const allow = createRateLimiter();
export const runtime = "nodejs";
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin, request.url, request.headers.get("host")))
    return Response.json({ message: "Invalid origin." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json({ message: "Expected JSON." }, { status: 415 });
  // Only trust a client-IP header explicitly configured by the deployment proxy.
  const ipHeader = process.env.CONTACT_TRUSTED_IP_HEADER;
  const key = ipHeader
    ? request.headers.get(ipHeader)?.split(",")[0]?.trim() || "unknown"
    : "shared";
  if (!allow(key))
    return Response.json(
      { message: "Too many attempts. Please try again in ten minutes." },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  if (Number(request.headers.get("content-length")) > 32_000)
    return Response.json({ message: "Message too large." }, { status: 413 });
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("Empty body");
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 32_000) {
        await reader.cancel();
        return Response.json(
          { message: "Message too large." },
          { status: 413 },
        );
      }
      chunks.push(value);
    }
    const input: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    const result = await submitContact(
      input,
      services.map((item) => item.slug),
      {
        apiKey: process.env.RESEND_API_KEY,
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL,
      },
    );
    return Response.json(result.body, { status: result.status });
  } catch {
    return Response.json({ message: "Invalid form data." }, { status: 400 });
  }
}
