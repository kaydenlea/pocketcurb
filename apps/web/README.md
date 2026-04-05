# Web Lane

`apps/web` is the future landing, waitlist, trust, and SEO lane. It is intentionally separate from the mobile app so that marketing and search concerns do not leak into the product UX model.

Current baseline:

- Next.js 16 App Router with typed routes
- Tailwind CSS 4 using `@tailwindcss/postcss`
- landing, waitlist, privacy, sitemap, and robots foundation
- typed content and metadata helpers for truthful marketing copy
- room for waitlist plumbing, disclosures, and later SEO or educational expansion

What this lane should not do yet:

- share mobile UI components directly
- overclaim product behavior that is not shipped
- become the source of truth for product requirements

Environment note:

- set `NEXT_PUBLIC_SITE_URL` before production launch so canonical URLs, sitemap entries, and metadata use the real web origin

Current commands:

- `pnpm --dir apps/web dev`
- `pnpm --dir apps/web build`
- `pnpm verify:web`
