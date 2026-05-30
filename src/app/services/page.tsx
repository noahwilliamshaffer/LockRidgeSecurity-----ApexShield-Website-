import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ApexShield's three focused services: CPPA/CCPA audit, penetration testing, and external attack surface management.",
};

const services = [
  {
    badge: "Flagship",
    title: "CPPA / CCPA Audit",
    body:
      "A California privacy readiness audit anchored on NIST CSF 2.0. We assess whether your business meets CCPA obligations, document gaps, and deliver a prioritized roadmap to close them.",
    href: "/services/cppa-ccpa-audit",
  },
  {
    badge: "Offensive",
    title: "Penetration Testing",
    body:
      "Authorized external, web, and network testing of your environment. Findings come with risk ratings, reproduction steps, and remediation guidance your team can act on.",
    href: "/services/penetration-testing",
  },
  {
    badge: "Recon",
    title: "External Attack Surface Mgmt",
    body:
      "Non-intrusive discovery of your internet-facing exposure — domains, subdomains, services, leaked data. Delivered as an exposure report. No probes, no exploitation.",
    href: "/services/easm",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
        title="Three services. Focused, not bloated."
        intro="Every engagement is scoped to fit a small or mid-sized business — plain-language deliverables, no jargon, no upsells."
      />
      <section className="py-20 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group flex flex-col rounded-xl border border-ink-200 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-cyan hover:shadow-card"
              >
                <span className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-deep">
                  {s.badge}
                </span>
                <h3 className="mb-2 text-xl font-bold text-navy-900">{s.title}</h3>
                <p className="flex-1 text-ink-600">{s.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-deep">
                  Learn more
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-ink-50 py-20 md:py-24">
        <Container className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to scope an engagement?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-600">
            Tell us about your environment and what you need. We&apos;ll reach out to
            discuss next steps.
          </p>
          <div className="mt-7">
            <LinkButton href="/contact" size="lg" variant="primary">
              Contact us
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
