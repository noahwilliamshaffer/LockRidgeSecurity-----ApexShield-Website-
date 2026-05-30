"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/lib/siteConfig";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; mode: "api" | "mailto" }
  | { kind: "error"; msg: string };

function ContactFormInner() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const initialService = useMemo(() => {
    const s = params.get("service");
    return s && ["cppa", "pentest", "easm", "other"].includes(s) ? s : "";
  }, [params]);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: initialService,
    message: "",
    website: "", // honeypot
  });

  useEffect(() => {
    setForm((f) => ({ ...f, service: initialService }));
  }, [initialService]);

  const screeningContext = useMemo(() => {
    const source = params.get("source");
    if (source !== "screening") return null;
    const qualifies = params.get("qualifies");
    const auditor = params.get("q5");
    const path = params.get("path");
    const reason = params.get("reason");
    return { source, qualifies, auditor, path, reason };
  }, [params]);

  const serviceFromUrl = params.get("service");

  const update = (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = (): string | null => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.company.trim()) return "Please enter your company or organization.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      return "Please enter a valid email address.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website.trim()) {
      // Silently succeed on honeypot trip
      setStatus({ kind: "success", mode: "api" });
      return;
    }
    const err = validate();
    if (err) {
      setStatus({ kind: "error", msg: err });
      return;
    }

    setStatus({ kind: "submitting" });

    // Carry all screening params so the team gets full context
    const screeningPairs: Record<string, string> = {};
    ["source", "service", "qualifies", "path", "reason", "q1", "q2", "q3", "q4", "q5"].forEach(
      (k) => {
        const v = params.get(k);
        if (v) screeningPairs[k] = v;
      },
    );

    const payload = {
      ...form,
      context: screeningPairs,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Upstream");
      setStatus({ kind: "success", mode: "api" });
    } catch {
      // Fall back to mailto so leads aren't lost.
      const subject = `ApexShield inquiry — ${form.company}`;
      const body =
        `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n` +
        `Phone: ${form.phone || "-"}\nService: ${form.service || "-"}\n` +
        `Source: ${screeningPairs.source || "direct"}\n` +
        `Screening qualifies: ${screeningPairs.qualifies || "-"}\n` +
        `Path: ${screeningPairs.path || "-"}\n` +
        `Q1: ${screeningPairs.q1 || "-"} | Q2: ${screeningPairs.q2 || "-"} | ` +
        `Q3: ${screeningPairs.q3 || "-"} | Q4: ${screeningPairs.q4 || "-"} | ` +
        `Q5: ${screeningPairs.q5 || "-"}\n\nMessage:\n${form.message || "-"}`;
      window.location.href = `mailto:${siteConfig.leads.publicEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "success", mode: "mailto" });
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <ContextBanner ctx={screeningContext} serviceFromUrl={serviceFromUrl} />

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        <Field id="name" label="Full name" required value={form.name} onChange={update("name")} autoComplete="name" />
        <Field id="company" label="Company or organization" required value={form.company} onChange={update("company")} autoComplete="organization" />
        <Field id="email" type="email" label="Work or school email" required value={form.email} onChange={update("email")} autoComplete="email" hint="School emails (e.g. .edu) are fine — no business-domain restriction." />
        <Field id="phone" type="tel" label="Phone" optional value={form.phone} onChange={update("phone")} autoComplete="tel" />

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-semibold text-navy-900">
            What you&apos;re interested in
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={update("service")}
            className="w-full rounded border border-ink-200 bg-white px-3 py-2.5 text-base text-ink-800 transition-shadow focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30"
          >
            <option value="">— Choose one —</option>
            <option value="cppa">CPPA / CCPA Audit</option>
            <option value="pentest">Penetration Testing</option>
            <option value="easm">External Attack Surface Management</option>
            <option value="other">Other / not sure yet</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy-900">
            Anything you&apos;d like us to know? <span className="font-normal text-ink-500">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={update("message")}
            placeholder="A sentence or two on your situation is great."
            className="min-h-[120px] w-full resize-y rounded border border-ink-200 bg-white px-3 py-2.5 text-base text-ink-800 transition-shadow focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30"
          />
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[10000px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update("website")}
          />
        </div>

        <button
          type="submit"
          disabled={status.kind === "submitting" || status.kind === "success"}
          className="w-full rounded bg-cyan px-7 py-4 text-base font-semibold text-navy-900 transition-all hover:bg-cyan-bright hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status.kind === "submitting" ? "Sending…" : status.kind === "success" ? "Sent" : "Send message"}
        </button>

        <StatusBlock status={status} />
      </form>

      <p className="mt-6 text-center text-sm text-ink-600">
        Prefer email? Reach us at{" "}
        <a href={`mailto:${siteConfig.leads.publicEmail}`} className="text-cyan-deep underline">
          {siteConfig.leads.publicEmail}
        </a>
        .
      </p>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
  optional,
  value,
  onChange,
  hint,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}{" "}
        {required && <span className="text-cyan-deep">*</span>}
        {optional && <span className="font-normal text-ink-500">(optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full rounded border border-ink-200 bg-white px-3 py-2.5 text-base text-ink-800 transition-shadow focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30"
      />
      {hint && <p className="mt-1 text-xs text-ink-600">{hint}</p>}
    </div>
  );
}

function ContextBanner({
  ctx,
  serviceFromUrl,
}: {
  ctx: {
    source: string;
    qualifies: string | null;
    auditor: string | null;
    path: string | null;
    reason: string | null;
  } | null;
  serviceFromUrl: string | null;
}) {
  if (ctx) {
    const lines: string[] = ["We have your screening context."];
    if (ctx.qualifies === "yes") {
      lines.push("Your screening suggests you likely need a CPPA/CCPA audit.");
      if (ctx.auditor === "need")
        lines.push(
          "You also asked for help finding an independent qualified auditor — we'll address both when we reach out.",
        );
      else if (ctx.auditor === "have")
        lines.push(
          "You noted you already have a qualified auditor in place; we'll focus on the software side.",
        );
    } else if (ctx.qualifies === "no") {
      lines.push(
        "Your screening suggests CCPA may not require an audit yet. We can still talk through where you are.",
      );
    }
    return (
      <div className="callout">
        <strong>{lines[0]}</strong>{" "}
        {lines.slice(1).join(" ")}
      </div>
    );
  }

  if (serviceFromUrl) {
    const labels: Record<string, string> = {
      cppa: "CPPA/CCPA Audit",
      pentest: "Penetration Testing",
      easm: "External Attack Surface Management",
    };
    const lbl = labels[serviceFromUrl];
    if (lbl) {
      return (
        <div className="callout">
          <strong>{lbl}.</strong> We&apos;ll scope the conversation around
          this. Add any specifics in the message below.
        </div>
      );
    }
  }
  return null;
}

function StatusBlock({ status }: { status: Status }) {
  if (status.kind === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded border border-cyan bg-cyan/10 p-4 text-navy-900">
        Thanks — we&apos;ll reach out to you shortly.
        {status.mode === "mailto" &&
          " If your email client just opened, please send the prepared message so we have your details."}
      </div>
    );
  }
  if (status.kind === "error") {
    return (
      <div role="alert" className="rounded border border-red-200 bg-red-50 p-4 text-red-900">
        {status.msg}
      </div>
    );
  }
  return null;
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="mx-auto h-32 max-w-2xl animate-pulse rounded bg-ink-100" />}>
      <ContactFormInner />
    </Suspense>
  );
}
