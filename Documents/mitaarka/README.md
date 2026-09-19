# Mitraarka Software Solutions — website

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: SMTP settings for the contact form
npm run dev                  # http://localhost:3000
```

`npm run build && npm start` for production, `npm run lint` for ESLint.

## Structure

- `src/content/site.ts` — company name, tagline, contact details, nav
- `src/content/services.ts` — services; drives the home grid, `/services`, `/services/[slug]`, footer and sitemap
- `src/components/` — Header, Footer, Logo, PageHero, CtaBand, ContactForm, Reveal
- `src/app/api/contact/route.ts` — contact form endpoint (zod validation, honeypot, nodemailer)
- `public/brand/` — logo (`mitraarka-logo.png`), white-text logo for dark backgrounds, sun mark
- Brand colours live in the `@theme` block of `src/app/globals.css` (gold `#9a7026`)

## Contact form

Enquiries are emailed via SMTP. If `SMTP_HOST` is not set, they are logged to the server console
and the API responds `{ ok: true, simulated: true }`, which is handy for local development.

## Note

Keep `tailwindcss` and `@tailwindcss/postcss` pinned at `4.1.13`; 4.2+ breaks the Next 16 Turbopack build
(`Missing field 'negated' on ScannerOptions.sources`).
