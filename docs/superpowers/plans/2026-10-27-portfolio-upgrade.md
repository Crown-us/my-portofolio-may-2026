# Portfolio upgrade implementation plan

Goal: implement the supplied checklist 0–6 while retaining the store-inspired design.
Architecture: Next.js App Router, typed local content, shared presentational components, a server contact endpoint. No CMS, database, checkout or invented evidence.
Execution: inline in this chat, as requested. Blog and translations deferred.

- [x] 0. Extract site shell/project cards. Centralize categories, summaries and featured flags. Hide global search while only projects exist. Test selection and optional URLs.
- [x] 1. Pre-render /projects/[slug], redirect legacy /works/[slug], metadata, conditional sections and native-dialog screenshot gallery. Test lookup, missing content and navigation.
- [x] 2. Typed About data with missing photo, internships, certification and PDF explicitly empty. Preserve honest skills; remove unverified results from resume. Conditional timeline and CV.
- [x] 3. Typed services with unspecified prices/durations; data-driven process and FAQ; contact preselection. Test IDR and selection.
- [x] 4. Shared validator, bounded request payload, honeypot, origin checking, per-process rate limiter, Resend via fetch. Fail honestly when not configured. Test invalid input and upstream errors.
- [x] 5. Typed empty Store with list/detail routes hidden via 404 until real products exist. URL/slug validation, link-out checkout, metadata and structured data. Test empty store and product validation.
- [x] 6. Central SEO at https://kvndwi.com, dynamic OG, sitemap/robots, safe JSON-LD. Optional production-only Umami with environment config and limited click events. Test SEO/sitemap.
- [x] Verification: format, full lint, typecheck, Node tests, production build, browser navigation/form errors and 360px layout. Document content/env gaps and deployment limits.

Review focus: never show success without email delivery; never publish invented results; unknown slugs return 404; empty Store stays absent; search and contact preselection reject invalid query types.

Files: lib/{projects,about,services,store,domain,seo,contact}.ts; app/components/{SiteShell,ProjectCard,ContactCta,ProjectGallery,ContactForm,Analytics}.tsx; app/{projects/[slug],about,services,contact,store/[slug],api/contact}; tests/*.test.mjs; .env.example; README.md.

The earlier visual work is saved as a baseline commit before incremental upgrade commits. All commits remain local; no merge, push or deployment is requested.

## Verification record — 2026-10-28

- 23 Node unit tests passed; provider calls use mocks only.
- Full ESLint, strict typecheck, Prettier check and webpack production build passed.
- HTTP smoke tests passed for nine pages, one h1/canonical per page, unknown project/store 404s, legacy 308 redirect, OG PNG, sitemap/robots and API guards.
- Browser verified category filter, service query preselection, inline errors, missing-provider 503 message, gallery focus/Escape/return focus, and no horizontal page overflow at 360px on Discover, About, Services and Contact.
- Fixed an observed local-origin mismatch: Next internally uses localhost while the browser uses 127.0.0.1. Added a regression test that also rejects unrelated origins.
- Focused read-only review found no high/medium functional or security issues in the reviewed scope.
- Unverified externally: real inbox delivery, production proxy rate-limit setup, live Umami account and current project demo availability. Future populated Store has validation/unit coverage; no fake product was added for visual testing.
- Missing owner content and environment setup are listed in README. Implementation is complete; those content-dependent sections stay hidden.
