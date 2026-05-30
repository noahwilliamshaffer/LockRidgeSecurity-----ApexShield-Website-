# ApexShield Website (v2)

Marketing and lead-generation site for **ApexShield LLC** — California privacy (CPPA/CCPA) compliance and offensive security services. Engineering partner: **LockRidge LLC**.

## Stack choice

**Next.js 14 (App Router) + TypeScript + Tailwind CSS + MDX.**

Per the v2 spec, the engineer is free to pick. Next.js earns its weight here because:

- The contact form needs a real serverless endpoint — App Router Route Handlers (`src/app/api/contact/route.ts`) give us that without a separate backend.
- The blog should be MDX-driven so the team can drop in real content later by editing files in `src/content/blog/`.
- Shared layout (header, footer, fonts) is one place instead of inlined per HTML page.
- Image, font, and metadata APIs are all batteries-included.
- Vercel deploys are zero-config.

The screening flow is a client component (`src/components/Screening.tsx`); the qualifying logic lives in `src/lib/screening.ts` as the single source of truth so the UI and the API/test paths agree.

## Project layout

```
src/
├── app/
│   ├── layout.tsx              Root layout (header, footer, fonts, metadata)
│   ├── globals.css             Tailwind base + design tokens + .prose-apex / .callout
│   ├── page.tsx                Home (hero, path selector, services strip, stats, CTA)
│   ├── not-found.tsx
│   ├── services/
│   │   ├── page.tsx                       Overview
│   │   ├── cppa-ccpa-audit/page.tsx       Flagship service
│   │   ├── penetration-testing/page.tsx
│   │   └── easm/page.tsx
│   ├── screening/page.tsx      Renders the <Screening/> client component
│   ├── contact/page.tsx        Renders the <ContactForm/> client component
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx                       Reads listPosts() from MDX
│   │   └── [slug]/page.tsx                Renders one MDX post
│   └── api/contact/route.ts    POST handler for lead delivery
├── components/
│   ├── Header.tsx / Footer.tsx / Container.tsx
│   ├── Button.tsx (Button + LinkButton)
│   ├── PageHead.tsx (page banner w/ breadcrumbs)
│   ├── ShieldMark.tsx (logo mark SVG)
│   ├── Screening.tsx (client, useState, the 5-step flow)
│   └── ContactForm.tsx (client, with screening-context banner + honeypot)
├── content/blog/
│   └── *.mdx                   Four placeholder posts, frontmatter-driven
└── lib/
    ├── siteConfig.ts           ALL placeholder values + env wiring
    ├── screening.ts            CPPA/CCPA qualifying logic + question copy
    └── posts.ts                MDX file loader
```

## How the conversion flow works

1. **Home** has two equally-weighted CTAs: **Compliance Software** (→ `/screening`) and **Penetration Testing** (→ `/contact?service=pentest`).
2. **Screening** runs five questions encoding the actual qualifying criteria from the draft CPPA cybersecurity audit regulations:
   - **Q1** California scope. `no` → result page says CCPA likely doesn't apply.
   - **Q2** 50%+ revenue from sale/share of personal info. `yes` → qualifies (Path A).
   - **Q3** Revenue over `$28M` (configurable). `no` → below threshold; Q4 is skipped.
   - **Q4** 250k+ consumers, 50k+ sensitive, both, or neither. Qualifies if any of the first three (Path B).
   - **Q5** Auditor — *only shown on a qualifying result*. `need` flags to the team that we should introduce them to an independent qualified auditor.
3. **Result page** shows a tailored banner reflecting their specific qualifying path. The "Continue to contact form" link carries every answer in the query string.
4. **Contact page** reads the query string, pre-fills the service dropdown, and shows a context banner reflecting their screening outcome (or service deep-link). Submits to `/api/contact`.

## Lead delivery

The `/api/contact` route handler validates the payload, drops bot traffic on the honeypot, then logs the lead (visible in Vercel function logs). A drop-in example for **Resend** is commented in the file — uncomment and provide `RESEND_API_KEY` to activate. Recipients come from `LEAD_RECIPIENT_EMAILS` via `siteConfig.leads.recipients`.

If the API call fails for any reason, the client falls back to a `mailto:` link prefilled with the full payload so a lead is never silently lost.

## Configuration / placeholders

Everything intended to be swappable lives in either `src/lib/siteConfig.ts` or environment variables. Copy `.env.example` to `.env.local` and fill in.

| Placeholder | Where to swap |
|---|---|
| Final logo | Replace `src/components/ShieldMark.tsx` |
| Final domain | `NEXT_PUBLIC_SITE_URL` env var |
| Lead recipient emails | `LEAD_RECIPIENT_EMAILS` env var |
| `$28M` CCPA threshold (CPI-adjusted) | `siteConfig.cppa.revenueThresholdUSD` |
| Display name / legal name / tagline | `siteConfig` |
| Real service descriptions | The three `src/app/services/*/page.tsx` files |
| Bios + headshots | `src/app/about/page.tsx` (replace the avatar div with `<Image>`) |
| Real blog content | Edit the MDX files in `src/content/blog/` |
| Analytics | Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`; layout adds the script automatically |

The contact API route is set up to take a Resend (or any provider's) SDK — see the commented block in `src/app/api/contact/route.ts`.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
npm run type-check
```

## Deploy

The repo deploys to Vercel as-is — `next.config.mjs` is already configured and the contact route handler runs on Vercel's Node runtime. Set the env vars listed in `.env.example` in your Vercel project settings.

## What's intentionally out of scope (per spec)

- No user accounts, login, or client portal.
- No actual audit tool, scoring engine, or report generation.
- No payments, scheduling, or e-signature.
- No CMS — flat MDX files are the content workflow for v1.
- No CRM integration — the contact route's notification email is the v1 lead delivery.
