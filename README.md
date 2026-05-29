# ApexShield Website

Marketing and lead-generation site for **ApexShield LLC** — California privacy (CPPA/CCPA) compliance and offensive security services.

Engineering partner: **LockRidge LLC**.

## Stack

Plain static HTML / CSS / JS. No build step, no framework, no database. Designed to be hosted as-is on GitHub Pages, Vercel, Netlify, or any static host.

```
/                       Static site root
├── index.html          Home page (path selector: Compliance vs Pen Test)
├── services.html       Services overview
├── cppa-ccpa-audit.html    Flagship service (CPPA/CCPA Audit)
├── penetration-testing.html
├── easm.html
├── screening.html      CPPA/CCPA 60-second qualifying screening
├── contact.html        Lead-capture form
├── about.html
├── blog.html
├── post-*.html         Four placeholder posts
└── assets/
    ├── css/styles.css
    └── js/
        ├── main.js         Nav toggle, footer year
        ├── screening.js    Screening flow logic + routing
        └── contact.js      Form pre-fill (from screening), submit
```

## How the conversion flow works

1. **Home** has two clear CTAs: **Compliance Software** (starts the screening) and **Penetration Testing** (jumps straight to the contact form scoped to pen test).
2. **Screening** runs five questions based on the actual CPPA/CCPA qualifying criteria (revenue, sale/share of personal info, data-volume thresholds, plus an auditor-availability question if they qualify).
3. **Result** is displayed and the visitor is routed to the **Contact form** with their screening context attached via query string.
4. The contact form pre-fills service selection and shows a banner reflecting their screening outcome (and whether they asked for an auditor referral).

## Lead delivery

The contact form ships with a `mailto:` fallback so leads are never lost while a backend delivery endpoint is being chosen. To wire up a real endpoint:

1. Pick a delivery target — a serverless function (Vercel, Netlify, Cloudflare Pages Functions), or a form service (Formspree, Basin, Web3Forms).
2. Set `window.APEXSHIELD_FORM_ENDPOINT` in `contact.html` (or a small inline `<script>`) to the POST URL.
3. The form will POST JSON containing all form fields, including screening context.

## Open items (from the handoff)

These are intentionally left as placeholders so they can be swapped without code changes:

- Final logo asset (currently a clean wordmark + geometric mark).
- Final domain (assumed `apexshield.io`).
- Business-domain emails for the team (currently `leads@apexshield.io` as a placeholder).
- Final service description copy.
- Real bios + headshots.
- Real blog content for the four placeholder posts.

## Local preview

It's static HTML — open `index.html` directly, or serve the directory with any static server:

```bash
python -m http.server 8080
# or
npx http-server -p 8080
```
