import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Penetration Testing",
  description:
    "Authorized penetration testing of your systems and applications with risk-rated findings and remediation guidance.",
};

export default function PenTestPage() {
  return (
    <>
      <PageHead
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: "Penetration Testing" },
        ]}
        title="Penetration Testing"
        intro="Authorized security testing to find exploitable weaknesses before someone else does."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="prose-apex">
            <h2>What it is</h2>
            <p>
              A penetration test is hands-on, authorized testing of your
              systems by experienced operators. We try to do — under controlled
              conditions — what a real attacker would try. Then we tell you
              exactly what we found, how we got in, and how to close the door.
            </p>

            <h2>Who it&apos;s for</h2>
            <ul>
              <li>
                Companies preparing for a security review, audit, or customer
                due-diligence questionnaire.
              </li>
              <li>
                Teams that ship a web or network-facing product and want an
                outside set of eyes.
              </li>
              <li>
                Businesses that just want to know what&apos;s actually exposed —
                not what a scanner claims.
              </li>
            </ul>

            <h2>What you get</h2>
            <ul>
              <li>
                An engagement scope agreed in writing — what&apos;s in,
                what&apos;s out, and the rules of engagement.
              </li>
              <li>
                External, web application, and internal/network testing as
                scoped.
              </li>
              <li>
                A written findings report with severity ratings,
                business-language impact, and reproduction steps.
              </li>
              <li>
                Remediation guidance your engineers can act on, not boilerplate.
              </li>
              <li>
                A debrief call to walk through findings and prioritization.
              </li>
            </ul>

            <div className="callout">
              <strong>Lower-friction option:</strong> If a full pen test is
              more than you need right now, our{" "}
              <Link href="/services/easm">EASM service</Link> is a non-intrusive
              look at your public attack surface — no probes, no exploitation,
              just the view an attacker has.
            </div>

            <h2>Next step</h2>
            <p>
              Tell us about your environment and what you&apos;d like in scope.
              We&apos;ll come back with a proposal.
            </p>
            <div className="mt-6">
              <LinkButton
                href="/contact?service=pentest"
                size="lg"
                variant="primary"
              >
                Request a pen test
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
