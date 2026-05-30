/**
 * CPPA/CCPA screening logic.
 *
 * Encodes the qualifying criteria from the draft California Privacy
 * Protection Agency cybersecurity audit regulations. This is the
 * single source of truth for the screening flow — the React component
 * just renders and routes; this file decides who qualifies.
 */

import { siteConfig } from "./siteConfig";

export type Q1 = "yes" | "no" | "unsure" | null;
export type Q2 = "yes" | "no" | null;
export type Q3 = "yes" | "no" | null;
export type Q4 = "consumers" | "sensitive" | "both" | "neither" | null;
export type Q5 = "have" | "need" | "unsure" | null;

export interface ScreeningAnswers {
  q1: Q1;
  q2: Q2;
  q3: Q3;
  q4: Q4;
  q5: Q5;
}

export const emptyAnswers: ScreeningAnswers = {
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
};

export type Outcome =
  | { kind: "out-of-scope"; reason: "not-california" }
  | { kind: "qualifies"; path: "sale-share" | "revenue-volume" }
  | { kind: "below-threshold" };

export function evaluate(answers: ScreeningAnswers): Outcome | null {
  // Need at least Q1 + Q2 to begin; with revenue path we need Q3 (and Q4 if Q3=yes)
  if (answers.q1 === null) return null;

  // California scope short-circuit
  if (answers.q1 === "no") {
    return { kind: "out-of-scope", reason: "not-california" };
  }

  if (answers.q2 === null) return null;

  // Path A — 50%+ revenue from selling or sharing PI
  if (answers.q2 === "yes") {
    return { kind: "qualifies", path: "sale-share" };
  }

  if (answers.q3 === null) return null;

  // Path B — revenue threshold + data volume
  if (answers.q3 === "yes") {
    if (answers.q4 === null) return null;
    const volumeQualifies =
      answers.q4 === "consumers" ||
      answers.q4 === "sensitive" ||
      answers.q4 === "both";
    if (volumeQualifies) {
      return { kind: "qualifies", path: "revenue-volume" };
    }
    return { kind: "below-threshold" };
  }

  // Q3 = no — below revenue threshold, doesn't trigger CCPA audit obligation.
  return { kind: "below-threshold" };
}

/**
 * The 5 questions, kept here so the component is just presentation.
 * Wording is plain-language; thresholds reference siteConfig so they
 * stay in sync with the CPI-adjusted values.
 */
export const questions = {
  q1: {
    title:
      "Does your business operate in California or handle personal information of California residents?",
    body:
      "CCPA generally applies to for-profit businesses that do business in California and meet certain thresholds. It does not typically apply to nonprofits or government agencies.",
    choices: [
      { value: "yes", title: "Yes", sub: "We do business in California or process data on California residents." },
      { value: "no", title: "No", sub: "We don't operate in California or touch California residents' data." },
      { value: "unsure", title: "Not sure", sub: "Treat this as a yes for the screening." },
    ],
  },
  q2: {
    title:
      "Does your business make 50% or more of its annual revenue from selling or sharing consumers' personal information?",
    body:
      "This is one of two paths that trigger the CCPA cybersecurity audit obligation. A 'yes' here alone is enough.",
    choices: [
      { value: "yes", title: "Yes", sub: "Half or more of our revenue comes from selling or sharing personal info." },
      { value: "no", title: "No", sub: "Selling or sharing personal info is not a major revenue source." },
    ],
  },
  q3: {
    title: `Did your business make more than $${(
      siteConfig.cppa.revenueThresholdUSD / 1_000_000
    ).toFixed(0)} million in annual gross revenue last year?`,
    body: `$${(siteConfig.cppa.revenueThresholdUSD / 1_000_000).toFixed(
      0,
    )}M is the current revenue threshold under the draft regulations (CPI-adjusted). If you cleared it last year, you may be in scope when paired with the next question.`,
    choices: [
      { value: "yes", title: `Yes — over $${(siteConfig.cppa.revenueThresholdUSD / 1_000_000).toFixed(0)}M`, sub: "Annual gross revenue exceeded the threshold last year." },
      { value: "no", title: `No — under $${(siteConfig.cppa.revenueThresholdUSD / 1_000_000).toFixed(0)}M`, sub: "We were below the threshold." },
    ],
  },
  q4: {
    title: "Do you process personal information at this scale?",
    body:
      "If you're over the revenue threshold, this is the second half of the test. 'Sensitive personal information' includes Social Security numbers, financial info, precise geolocation, health info, and children's data.",
    choices: [
      { value: "consumers", title: `Personal info of ${siteConfig.cppa.consumersThreshold.toLocaleString()}+ consumers`, sub: "We collect, use, or process personal info on at least 250,000 consumers." },
      { value: "sensitive", title: `Sensitive personal info of ${siteConfig.cppa.sensitiveConsumersThreshold.toLocaleString()}+ consumers`, sub: "We process sensitive personal info — SSNs, financial, health, children's data — on at least 50,000 consumers." },
      { value: "both", title: "Both apply", sub: "Both volumes describe our business." },
      { value: "neither", title: "Neither", sub: "Below both volume thresholds." },
    ],
  },
  q5: {
    title: "Do you have an independent qualified auditor?",
    body:
      "The CCPA cybersecurity audit must be performed by an independent, qualified auditor. If you don't have one in place, we can introduce you to one through our network.",
    choices: [
      { value: "have", title: "Yes — we have one", sub: "We already work with a qualified independent auditor." },
      { value: "need", title: "No — we need one", sub: "We need help finding a qualified independent auditor." },
      { value: "unsure", title: "Not sure", sub: "We're not sure who would qualify. Let's talk through it." },
    ],
  },
} as const;

/**
 * Build a query string carrying the screening context to the contact page.
 */
export function toContactQueryString(
  answers: ScreeningAnswers,
  outcome: Outcome | null,
): string {
  const params = new URLSearchParams();
  params.set("source", "screening");
  params.set("service", "cppa");
  if (outcome && outcome.kind === "qualifies") {
    params.set("qualifies", "yes");
    params.set("path", outcome.path);
  } else if (outcome && outcome.kind === "below-threshold") {
    params.set("qualifies", "no");
  } else if (outcome && outcome.kind === "out-of-scope") {
    params.set("qualifies", "no");
    params.set("reason", "not-california");
  }
  (Object.keys(answers) as (keyof ScreeningAnswers)[]).forEach((k) => {
    if (answers[k]) params.set(k, String(answers[k]));
  });
  return params.toString();
}
