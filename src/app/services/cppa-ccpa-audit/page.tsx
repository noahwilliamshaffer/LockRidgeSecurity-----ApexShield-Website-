import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "CPPA / CCPA Audit",
  description:
    "California Privacy Protection Agency (CPPA) and CCPA readiness audit, framed on NIST CSF 2.0.",
};

export default function CppaAuditPage() {
  return (
    <>
      <PageHead
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: "CPPA/CCPA Audit" },
        ]}
        title="CPPA / CCPA Audit"
        intro="California privacy readiness, anchored on NIST CSF 2.0. We tell you what you have, what you're missing, and what to do about it."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="prose-apex">
            <h2>What it is</h2>
            <p>
              The California Privacy Protection Agency (CPPA) is moving toward
              requiring annual cybersecurity audits for businesses subject to
              the CCPA. Our audit assesses your organization against those
              requirements and identifies the controls and documentation you
              need to be ready.
            </p>

            <h2>Who it&apos;s for</h2>
            <ul>
              <li>
                Businesses subject to the CCPA — generally those over the
                revenue threshold or that process large volumes of consumer
                personal information.
              </li>
              <li>
                Companies that sell or share consumer personal information as a
                meaningful share of revenue.
              </li>
              <li>
                Service providers and contractors who need to demonstrate
                compliance to their clients.
              </li>
            </ul>
            <p>
              Not sure if that&apos;s you?{" "}
              <Link href="/screening">Take our 60-second screening</Link> — it
              walks through the actual qualifying criteria.
            </p>

            <h2>What you get</h2>
            <ul>
              <li>
                A documented assessment of your cybersecurity program against
                CPPA/CCPA expectations.
              </li>
              <li>
                A gap analysis covering the control areas the regulations care
                about — access management, encryption, MFA, asset inventory,
                training, incident response, and more.
              </li>
              <li>A prioritized remediation roadmap with effort estimates.</li>
              <li>
                Our compliance software set up for your environment, so the
                audit isn&apos;t a one-time PDF — you keep visibility year-round.
              </li>
              <li>
                If you need an independent qualified auditor (CCPA requires
                one), we can introduce you to one through our network.
              </li>
            </ul>

            <div className="callout">
              <strong>Methodology:</strong> Our audit is framed on the NIST
              Cybersecurity Framework 2.0. NIST CSF is the de facto standard
              the regulators draw from, so your documentation maps cleanly to
              whatever final form the rules take.
            </div>

            <h2>Next step</h2>
            <p>
              The fastest way to see if this applies to your business is the
              screening. It takes about a minute, asks the same questions a
              regulator would, and ends with a clear answer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/screening" size="lg" variant="primary">
                Start the screening
              </LinkButton>
              <LinkButton
                href="/contact?service=cppa"
                size="lg"
                variant="outline"
              >
                Talk to us instead
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
