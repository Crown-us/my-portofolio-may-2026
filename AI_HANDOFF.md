# AI / Developer Handoff

Updated: 2026-10-28 (Asia/Jakarta).

## Read first

- Checkout: `D:/Web Porto/my-portofolio-may-2026` (Windows / PowerShell).
- Repository: `Crown-us/my-portofolio-may-2026`; current branch at last inspection: `main`.
- Production: https://kvndwi.com. Local preview: http://127.0.0.1:3001/.
- Read README.md for setup, file map, environment settings and content workflow. Read CONTENT_TODO.md for missing owner content.
- Inspect current Git status before editing. Preserve changes from the user or other tools. Never assume this snapshot proves current runtime/deployment state.

## User preferences

Use concise casual Indonesian. Keep token usage low. **Do not run repeated or broad test suites for routine edits**; check references or run a narrowly relevant check only when the change warrants it. Keep progress updates short. Do not push, merge or deploy without authorization in the current conversation.

Preserve the clean Chrome Web Store-inspired design: white background, blue accents, pastel cards, custom K logo, sticky header and separate navigation pages. Earlier dark/Lusion/Three.js/music experiments were superseded. Do not bring them back unprompted.

The user feels the site needs more content. Do not invent articles, products, metrics, testimonials, work history or certifications to fill space.

## Current implementation

- Discover, project catalog/details, About, Resume, Services, Contact and Blog are implemented.
- Three internship records exist in `lib/about.ts`; Experience uses cards with initials and date badges.
- Four services with starting prices and estimated durations exist in `lib/services.ts`.
- Blog uses local Markdown, draft filtering, tag filters, TOC, reading time, safe code highlighting, RSS and SEO. The user authorized original educational content. The first article, `merapikan-file-digital-biar-gampang-dicari.md`, is now present with `draft: false`; it explains practical digital file organization without coding. It makes no personal experience claims. The `.md.example` template remains ignored.
- Store implementation exists but has no products. Its nav/teaser are hidden and routes return 404 until actual products are added.
- Global search is disabled; ID/EN is deferred.
- Missing content: chosen photo, CV PDF, BNSP details, richer case studies, Blog articles and Store products.

## Latest work

The user requested folder cleanup and an updated README. Cleanup removed old preview screenshots, unused starter SVGs/audio, confirmed byte-identical project-image duplicates, obsolete SPEC/SECURITY templates and the completed historical plan. Removed unused direct dependencies: framer-motion, lenis, clsx, tailwind-merge; npm updated the lockfile offline.

README now reflects the actual routes, existing internships/pricing, Blog setup, current content gaps and selective-check preference. This handoff was shortened to avoid duplicated stale setup instructions. Source content assets, tests, Blog template, owner content checklist, runtime caches and active preview logs were preserved. No application behavior was intentionally changed, and no tests/build were run for cleanup. No push/deployment was performed for cleanup.

## Verification history (not a fresh guarantee)

During the preceding read-only review: 28 unit tests and TypeScript passed. Public `/blog`, `/about`, `/services`, `/rss.xml` returned 200; unknown Blog slug returned 404. Production showed the new internship records and landing-page price. Full lint had not finished when that review ended; do not claim it passed based on this note. Interactive Blog/mobile review is not recorded as completed.

## Important implementation details

- `next build --webpack` avoids a prior local Turbopack font-cache issue. Google Fonts access may be needed during build.
- Contact uses Resend, with no-config 503 and receipt-required success. No real email has been sent by the checks described here.
- Contact rate limiting is per-process memory. Production multi-instance hosting needs shared limiting/WAF and trusted proxy header configuration.
- Preserve the origin regression fix: Next can see localhost internally while the browser Host is 127.0.0.1.
- Umami is optional and gated to production kvndwi.com/www.kvndwi.com; no dev/localhost tracking.
- Blog dates use YYYY-MM-DD; quoted strings and plain YAML dates are accepted, with calendar validation. Drafts are dev-only; public feeds and sitemap exclude them.
- CSS class maps combine shared modules through `lib/styles.ts`.
- Do not remove personal/content assets merely because they have not been wired into a page yet.
- Inspect the actual command line before stopping any preview process. Do not kill unrelated Node processes.

Use the README as the main maintained reference and update this handoff only with concrete state changes.

## Latest content addition

The user selected Blog content and explicitly allowed any educational topic. Added an original Indonesian article, "File Banyak, Susah Dicari? Rapikan Tanpa Ribet", dated 2026-10-28. Only the article loader/frontmatter was checked; no full tests, build, push or deployment was performed for this content edit. A production preview/deployment needs rebuilding before this static article appears.

User correction: the first article should be non-coding but still about technology. Replaced the unpublished coding article with digital file organization, naming, sync versus backup, and a small cleanup routine. No old-route redirect is needed because the previous article was not deployed.

## Current editorial direction

The user switched the Blog toward AI developments and sourced comparisons, authorizing a ChatGPT vs Claude vs Gemini article with valid data. Added `content/blog/chatgpt-vs-claude-vs-gemini.md` with `draft: false`, checked 2026-10-28 against seven official product/support pages. It compares consumer app workflows, distinguishes model/plan context, and explicitly does not claim hands-on benchmark results. The previous digital-file article is retained as a draft. No build, test suite, push or deployment was performed for this content change.


## Pages CMS — 2026-10-29

Added root `.pages.yml` for the existing Markdown blog: rich-text body, draft default true, date picker, tags and local cover uploads. No new dependencies. Parser accepts valid unquoted CMS dates without permitting impossible date rollover, and treats cleared optional covers as absent. Account login/GitHub App authorization and an actual CMS save still require the owner; do not claim end-to-end activation until observed. README contains setup and publishing steps.
