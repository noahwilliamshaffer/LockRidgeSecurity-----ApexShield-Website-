/**
 * Site-wide configuration.
 *
 * Everything in this file is intended to be swappable without touching
 * component code. Where values map to env vars, those env vars take
 * precedence (set in .env.local / Vercel project settings).
 *
 * See README "Open items" for what's still [PLACEHOLDER] before launch.
 */

export const siteConfig = {
  // Display + identity
  displayName: "ApexShield",
  legalName: "ApexShield LLC",
  tagline: "Cybersecurity and California privacy compliance, made straightforward.",
  description:
    "ApexShield helps small and mid-sized businesses meet their California privacy obligations and find real security weaknesses before attackers do — without the jargon.",
  city: "San Diego, California",

  // Domain — assumed; swap when finalized.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://apexshield.io",

  // Lead delivery
  leads: {
    // Public address visible on the contact page (and mailto fallback).
    publicEmail: "leads@apexshield.io",
    // Internal recipient list for the contact API route.
    // Comma-separated env var, with a placeholder default.
    recipients: (process.env.LEAD_RECIPIENT_EMAILS ?? "leads@apexshield.io")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  },

  // CPPA/CCPA thresholds — these are CPI-adjusted annually, treat as config.
  cppa: {
    revenueThresholdUSD: 28_000_000,
    consumersThreshold: 250_000,
    sensitiveConsumersThreshold: 50_000,
    firstAuditWindowMonths: 24,
    methodologyFramework: "NIST CSF 2.0",
  },

  // Social / partner links
  partner: {
    name: "LockRidge LLC",
    role: "Engineering partner",
    cert: "CISSP-certified",
    url: undefined as string | undefined, // [PLACEHOLDER]
  },

  // Privacy-respecting analytics (optional).
  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  },

  // Open Graph / metadata defaults
  og: {
    image: "/og-image.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;
