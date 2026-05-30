import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/siteConfig";

/**
 * Lead-delivery route handler.
 *
 * v1 behavior:
 *   - Validates the payload.
 *   - Logs the lead (visible in Vercel function logs).
 *   - Returns 200 so the client shows the success state.
 *
 * To wire real email delivery, drop in your provider's SDK
 * (Resend, Postmark, SES, Mailgun, SendGrid…) and uncomment the
 * sendEmail block below. Recipients come from siteConfig.leads.recipients,
 * which reads LEAD_RECIPIENT_EMAILS from the environment.
 */

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  website?: string; // honeypot
  context?: Record<string, string>;
}

function isValid(p: ContactPayload): p is Required<Pick<ContactPayload, "name" | "company" | "email">> & ContactPayload {
  if (!p.name?.trim()) return false;
  if (!p.company?.trim()) return false;
  if (!p.email?.trim()) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return false;
  return true;
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: silently 200 so bots don't learn anything
  if (payload.website && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!isValid(payload)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const recipients = siteConfig.leads.recipients;

  // Build a plain-text email body
  const ctx = payload.context ?? {};
  const lines = [
    `New ApexShield lead`,
    ``,
    `Name:     ${payload.name}`,
    `Company:  ${payload.company}`,
    `Email:    ${payload.email}`,
    `Phone:    ${payload.phone || "-"}`,
    `Service:  ${payload.service || "-"}`,
    ``,
    `Source:   ${ctx.source || "direct"}`,
    `Qualify:  ${ctx.qualifies || "-"}`,
    `Path:     ${ctx.path || "-"}`,
    `Reason:   ${ctx.reason || "-"}`,
    `Answers:  q1=${ctx.q1 || "-"} q2=${ctx.q2 || "-"} q3=${ctx.q3 || "-"} q4=${ctx.q4 || "-"} q5=${ctx.q5 || "-"}`,
    ``,
    `Message:`,
    payload.message || "(none)",
  ].join("\n");

  // For now, log to function logs (visible in Vercel). Replace with provider SDK.
  console.log("[ApexShield lead]", { recipients, body: lines });

  // --- Drop-in email delivery example (uncomment when an SDK is chosen) ---
  // const { Resend } = await import("resend");
  // const resend = new Resend(process.env.RESEND_API_KEY!);
  // await resend.emails.send({
  //   from: process.env.SMTP_FROM!,
  //   to: recipients,
  //   subject: `ApexShield inquiry — ${payload.company}`,
  //   text: lines,
  //   replyTo: payload.email,
  // });

  return NextResponse.json({ ok: true });
}
