"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  emptyAnswers,
  evaluate,
  questions,
  toContactQueryString,
  type Outcome,
  type ScreeningAnswers,
} from "@/lib/screening";

type StepNum = 1 | 2 | 3 | 4 | 5;
const TOTAL = 5;

export function Screening() {
  const [answers, setAnswers] = useState<ScreeningAnswers>(emptyAnswers);
  const [step, setStep] = useState<StepNum>(1);

  const outcome: Outcome | null = useMemo(() => evaluate(answers), [answers]);

  const canAdvance = (s: StepNum): boolean => {
    if (s === 1) return answers.q1 !== null;
    if (s === 2) return answers.q2 !== null;
    if (s === 3) return answers.q3 !== null;
    if (s === 4) return answers.q4 !== null;
    return true;
  };

  const goNext = () => {
    let next = (step + 1) as StepNum;
    // Skip Q4 entirely if revenue is under threshold (Q3 = no)
    if (next === 4 && answers.q3 === "no") next = 5;
    // From Q1 "no" → straight to result
    if (step === 1 && answers.q1 === "no") next = 5;
    // From Q2 "yes" → straight to result (sale/share path qualifies on its own)
    if (step === 2 && answers.q2 === "yes") next = 5;
    if (next > TOTAL) next = TOTAL as StepNum;
    setStep(next);
    smoothScrollTop();
  };

  const goBack = () => {
    let prev = (step - 1) as StepNum;
    if (prev === 4 && answers.q3 === "no") prev = 3;
    if (prev < 1) prev = 1;
    setStep(prev);
    smoothScrollTop();
  };

  const setAnswer = <K extends keyof ScreeningAnswers>(
    key: K,
    value: ScreeningAnswers[K],
  ) => {
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const progressPct = Math.round((step / TOTAL) * 100);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-ink-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPct}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan to-cyan-bright transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="mt-8">
        {step === 1 && (
          <QuestionStep
            label={`Question 1 of ${TOTAL}`}
            q={questions.q1}
            value={answers.q1}
            onChange={(v) => setAnswer("q1", v as ScreeningAnswers["q1"])}
          />
        )}
        {step === 2 && (
          <QuestionStep
            label={`Question 2 of ${TOTAL}`}
            q={questions.q2}
            value={answers.q2}
            onChange={(v) => setAnswer("q2", v as ScreeningAnswers["q2"])}
          />
        )}
        {step === 3 && (
          <QuestionStep
            label={`Question 3 of ${TOTAL}`}
            q={questions.q3}
            value={answers.q3}
            onChange={(v) => setAnswer("q3", v as ScreeningAnswers["q3"])}
          />
        )}
        {step === 4 && (
          <QuestionStep
            label={`Question 4 of ${TOTAL}`}
            q={questions.q4}
            value={answers.q4}
            onChange={(v) => setAnswer("q4", v as ScreeningAnswers["q4"])}
          />
        )}
        {step === 5 && (
          <ResultStep
            outcome={outcome}
            answers={answers}
            onAuditorChange={(v) =>
              setAnswer("q5", v as ScreeningAnswers["q5"])
            }
          />
        )}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            className="rounded border border-ink-200 px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:border-cyan hover:text-cyan-deep"
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {step < 5 ? (
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance(step)}
            className="rounded bg-cyan px-6 py-3 text-sm font-semibold text-navy-900 transition-all hover:bg-cyan-bright hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step === 4 ? "See result" : "Next"}
          </button>
        ) : (
          <Link
            href={`/contact?${toContactQueryString(answers, outcome)}`}
            className="rounded bg-cyan px-7 py-4 text-base font-semibold text-navy-900 transition-all hover:bg-cyan-bright hover:-translate-y-px"
          >
            Continue to contact form
          </Link>
        )}
      </div>
    </div>
  );
}

function smoothScrollTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

type ChoiceShape = {
  readonly value: string;
  readonly title: string;
  readonly sub: string;
};

function QuestionStep({
  label,
  q,
  value,
  onChange,
}: {
  label: string;
  q: { title: string; body: string; choices: readonly ChoiceShape[] };
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <span className="text-xs font-bold uppercase tracking-widest text-cyan-deep">
        {label}
      </span>
      <h2 className="mt-2 text-2xl font-bold text-navy-900 md:text-3xl">
        {q.title}
      </h2>
      <p className="mt-2 text-ink-600">{q.body}</p>
      <div
        role="radiogroup"
        aria-label={q.title}
        className="mt-6 flex flex-col gap-3"
      >
        {q.choices.map((c) => {
          const selected = value === c.value;
          return (
            <label
              key={c.value}
              className={[
                "flex cursor-pointer items-start gap-3 rounded border p-4 transition-all",
                selected
                  ? "border-cyan bg-cyan/5 shadow-soft"
                  : "border-ink-200 bg-white hover:border-cyan",
              ].join(" ")}
            >
              <input
                type="radio"
                name={`q-${q.title}`}
                value={c.value}
                checked={selected}
                onChange={() => onChange(c.value)}
                className="mt-1 h-4 w-4 accent-cyan"
              />
              <span>
                <span className="block font-semibold text-navy-900">
                  {c.title}
                </span>
                <span className="block text-sm text-ink-600">{c.sub}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function ResultStep({
  outcome,
  answers,
  onAuditorChange,
}: {
  outcome: Outcome | null;
  answers: ScreeningAnswers;
  onAuditorChange: (v: string) => void;
}) {
  return (
    <div className="animate-fade-in">
      <span className="text-xs font-bold uppercase tracking-widest text-cyan-deep">
        Your result
      </span>
      <div className="mt-4">
        <ResultBanner outcome={outcome} />
      </div>

      {outcome?.kind === "qualifies" && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-navy-900 md:text-3xl">
            {questions.q5.title}
          </h2>
          <p className="mt-2 text-ink-600">{questions.q5.body}</p>
          <div
            role="radiogroup"
            aria-label="Auditor status"
            className="mt-6 flex flex-col gap-3"
          >
            {questions.q5.choices.map((c) => {
              const selected = answers.q5 === c.value;
              return (
                <label
                  key={c.value}
                  className={[
                    "flex cursor-pointer items-start gap-3 rounded border p-4 transition-all",
                    selected
                      ? "border-cyan bg-cyan/5 shadow-soft"
                      : "border-ink-200 bg-white hover:border-cyan",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="q5"
                    value={c.value}
                    checked={selected}
                    onChange={() => onAuditorChange(c.value)}
                    className="mt-1 h-4 w-4 accent-cyan"
                  />
                  <span>
                    <span className="block font-semibold text-navy-900">
                      {c.title}
                    </span>
                    <span className="block text-sm text-ink-600">{c.sub}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ResultBanner({ outcome }: { outcome: Outcome | null }) {
  if (outcome?.kind === "out-of-scope") {
    return (
      <div className="rounded border border-ink-200 bg-ink-50 p-6">
        <h3 className="text-xl font-bold text-navy-900">
          CCPA likely doesn&apos;t apply to your business.
        </h3>
        <p className="mt-2 text-ink-700">
          Based on what you told us, you don&apos;t operate in California or
          handle California residents&apos; data, so the CCPA&apos;s
          cybersecurity audit obligation likely isn&apos;t triggered. That
          doesn&apos;t mean you don&apos;t have security needs — most
          businesses do. If a penetration test or attack surface review would
          be useful, we&apos;d be glad to help.
        </p>
      </div>
    );
  }

  if (outcome?.kind === "qualifies") {
    const reason =
      outcome.path === "sale-share"
        ? "Half or more of your revenue comes from selling or sharing consumers' personal information."
        : "Your business is over the $28M revenue threshold and processes consumer data at the scale the regulations care about.";
    return (
      <div className="rounded border border-cyan bg-cyan/5 p-6">
        <h3 className="text-xl font-bold text-navy-900">
          You likely need a CPPA/CCPA cybersecurity audit.
        </h3>
        <p className="mt-2 text-ink-700">{reason} Under the draft regulations, that puts your business in scope for the annual audit obligation.</p>
        <p className="mt-3 text-ink-700">
          <strong>What&apos;s next:</strong> Our compliance software helps you stand up the controls and documentation an auditor will look for, framed on NIST CSF 2.0. Below, let us know whether you also need an independent qualified auditor — we can introduce you to one if so.
        </p>
      </div>
    );
  }

  if (outcome?.kind === "below-threshold") {
    return (
      <div className="rounded border border-ink-200 bg-ink-50 p-6">
        <h3 className="text-xl font-bold text-navy-900">
          You likely fall below the CCPA audit threshold today.
        </h3>
        <p className="mt-2 text-ink-700">
          Based on your answers, your business probably isn&apos;t required to
          complete the CCPA annual cybersecurity audit yet. That can change
          quickly as you grow — and good cybersecurity hygiene is worth getting
          right early.
        </p>
        <p className="mt-3 text-ink-700">
          If you&apos;d like a lightweight starting point, our{" "}
          <Link href="/services/easm" className="text-cyan-deep underline">
            External Attack Surface Management
          </Link>{" "}
          service shows you what an attacker can already see about your
          business, without touching your systems.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded border border-ink-200 bg-ink-50 p-6">
      <p className="text-ink-700">
        Answer the previous questions to see your result.
      </p>
    </div>
  );
}
