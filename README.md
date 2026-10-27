# Kevinâ€™s portfolio

A Next.js App Router portfolio at https://kvndwi.com. The interface keeps the clean store-inspired design, shared sticky navigation, and light CSS interactions. No Three.js scene or animation runtime is loaded.

## Run locally

Requires Node.js 22.18+ (Node 24 recommended) and npm.

```sh
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3001
```

Open http://127.0.0.1:3001. For a production preview, stop the dev process, run `npm run build`, then `npm start -- --hostname 127.0.0.1 --port 3001`. The webpack build avoids the local Turbopack font-cache problem; next/font needs access to Google Fonts during the build.

## Verify

```sh
npm test
npm run lint
npm run typecheck
npm run format:check
npm run build
# With the preview running on port 3001:
npm run test:smoke
```

Tests use Nodeâ€™s built-in runner and never send real email. Prettier is the only added development dependency, to enforce the requested formatting consistently. TypeScript checks are strict. The Blog adds server-only Markdown parsing, sanitization and syntax highlighting dependencies; they are not shipped in the browser bundle.

## Content and routes

| File              | Content                                                                                              |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| `lib/projects.ts` | Single project source: featured flags, summary, status, grouped stack, case-study evidence and links |
| `lib/about.ts`    | Profile image, internships, certifications, skill groups, PDF CV                                     |
| `lib/services.ts` | Service areas, deliverables, prices, estimated duration, process and FAQ                             |
| `lib/store.ts`    | Real products only, checkout platform and HTTPS checkout links                                       |
| `lib/config.ts`   | Identity, contacts, availability and global-search flag                                              |
| `lib/seo.ts`      | Canonical and social metadata defaults                                                               |

Discover shows at most three featured projects, service previews and a contact CTA. Projects is the full category-filtered library. Details live at `/projects/[slug]`; old `/works/[slug]` links redirect permanently. Unknown slugs return 404.

About and Resume share one profile source. Empty case-study sections, internship and certification lists, and the PDF download are hidden. Screenshot galleries use the native dialog for focus trapping, Escape dismissal and focus restoration.

Store is intentionally empty: its navigation, teaser and routes stay hidden/404 until real products are added. Product data validates unique slugs, nonnegative IDR prices and the matching Gumroad, Trakteer or Lynk HTTPS checkout host. `null` means Free for products and Contact for quote for services. Product descriptions support safe basic Markdown: paragraphs, headings, bullet lists, bold, inline code, HTTPS links; HTML is not rendered. Images should be local files under `public/`.

Global search is disabled until `hasGlobalSearch` is true AND products exist, so it can meaningfully search both projects and products. Blog is available at `/blog`; translations remain deferred.

## Contact email

Copy `.env.example` to `.env.local` and configure:

- `RESEND_API_KEY`: server-only Resend API key.
- `CONTACT_FROM_EMAIL`: sender on a verified Resend domain.
- `CONTACT_TO_EMAIL`: recipient inbox.
- `CONTACT_TRUSTED_IP_HEADER`: optional client-IP header overwritten by your trusted hosting proxy. Never trust a header that clients can forge. If unset, all requests share a conservative limit.

The form POSTs to `/api/contact`. Client/server validation share one function; the server enforces JSON, a 32 KB body limit, origin checking, a honeypot, and five attempts per ten minutes. Email is sent as plain text via Resend with a ten-second timeout. A success response requires a provider receipt; this confirms provider acceptance, not final inbox delivery. Missing configuration returns 503 and leaves WhatsApp/direct email available. Errors never expose credentials or provider diagnostics.

The rate limiter is bounded and in-memory, per server process. For multiple instances/serverless production, add a shared limiter or platform WAF rule; restarts reset the local limit. Set body/time limits at the hosting proxy too. No database, payment processing or message storage is introduced.

## SEO and analytics

All public pages use canonical URLs rooted at `https://kvndwi.com`, with OG/Twitter metadata. `/opengraph-image` generates the default image; projects/products use their own cover. `/sitemap.xml` includes available routes and content; `/robots.txt` excludes `/api/`. About, projects and products emit escaped JSON-LD.

Optional Umami setup:

1. Register the production website in Umami.
2. Set `NEXT_PUBLIC_UMAMI_WEBSITE_ID` and `NEXT_PUBLIC_UMAMI_SCRIPT_URL` to the supplied ID and HTTPS script URL before building.
3. Deploy to `kvndwi.com` or `www.kvndwi.com`.

The script is never loaded in dev/test, localhost production previews or other domains. Tracking is limited to pageviews and explicitly annotated contact, buy and resume-download clicks. Query strings/hash fragments are excluded, performance tracking is off, and Do Not Track is respected. No form fields are tracked. These public environment values are not secrets. See the [Umami configuration](https://docs.umami.is/docs/tracker-configuration) and [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).

## Content still needed from Kevin

- Confirmed profile photo and final CV PDF.
- Three real internship records: company, role, dates, responsibilities and highlights.
- BNSP certification title, issuer, year and credential link.
- For each project: actual problem, role, timeframe/team, features, architecture, challenges/solutions and sourced outcomes. Existing screenshots, stacks and demo/repository links were preserved from the repository; current deployment status still needs owner confirmation.
- Confirm offered services, real scope, pricing and estimated durations. No prices or delivery promises were invented.
- Finished digital products with images, price and checkout URL; no placeholders are published.
- Resend and optional Umami configuration. Do not put secrets into source files or chat.

The migration removes unused dark-design components and duplicate resume data containing placeholder contacts or unsupported metrics. The approved visual baseline remains in Git history. Changes are local; publishing is a separate step.

## Blog / devlog

`/blog` is visible in navigation even when no posts exist. No sample article is published. To add a real post, copy `content/blog/post.md.example` to a `.md` file in the same folder and replace the template content.

Required YAML frontmatter: `title`, unique kebab-case `slug`, ISO `date` (quote it, e.g. `"2026-10-28"`), `summary`, `tags` (array), and `draft` (boolean). Optional `coverImage` uses a local `/images/...` path. Put images in `public/images/blog/`.

Drafts preview only with `npm run dev`; production pages, RSS and sitemap exclude them. Set `draft: false` only when ready to publish, then rebuild. Content validation fails loudly for invalid fields, dates or duplicate slugs. Published posts sort by date, with client-side tag filtering. Detail pages include reading time, heading anchors/table of contents, code highlighting, and neighbouring posts. Markdown body headings never create a second h1.

The pipeline uses gray-matter for frontmatter and unified/remark/rehype for Markdown, HTML sanitization and highlighting, rather than a custom Markdown parser. Raw HTML is discarded and unsafe link protocols are stripped. All parsing/highlighting runs on the server. Supported code languages include TypeScript, JavaScript, CSS, JSON, Python and other common languages; unknown languages remain plain text.

`/rss.xml` is a static RSS feed and `/sitemap.xml` includes published posts. The template `.example` extension is deliberately ignored. No CMS or database is required.
