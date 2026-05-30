import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "External Attack Surface Management",
  description:
    "Non-intrusive discovery of your internet-facing assets and exposure. See what an attacker sees, without touching your systems.",
};

export default function EasmPage() {
  return (
    <>
      <PageHead
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: "EASM" },
        ]}
        title="External Attack Surface Management"
        intro="See what an attacker sees — without touching your systems."
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="prose-apex">
            <h2>What it is</h2>
            <p>
              EASM is the reconnaissance phase of a penetration test, delivered
              on its own. We use passive techniques to discover everything
              that&apos;s exposed to the public internet under your name:
              domains, subdomains, services, certificates, leaked credentials,
              and data that should not be exposed.
            </p>
            <p>
              <strong>It is non-intrusive.</strong> We do not probe your
              systems, we do not exploit anything, and nothing changes on your
              side.
            </p>

            <h2>Who it&apos;s for</h2>
            <ul>
              <li>
                Businesses that want a low-friction security checkpoint without
                scoping a full pen test.
              </li>
              <li>
                Companies with a sprawling cloud footprint and no good
                inventory of what&apos;s exposed.
              </li>
              <li>
                Anyone preparing for a pen test or audit who wants to clean up
                easy wins first.
              </li>
            </ul>

            <h2>What you get</h2>
            <ul>
              <li>
                An exposure report covering everything publicly discoverable
                tied to your organization.
              </li>
              <li>
                Identified risk areas — exposed admin interfaces, stale
                certificates, leaked credentials, forgotten subdomains.
              </li>
              <li>Prioritized recommendations, with effort estimates.</li>
              <li>A short briefing call to walk through findings.</li>
            </ul>

            <div className="callout">
              <strong>Good entry point:</strong> Many clients start with EASM
              before scoping a penetration test. It&apos;s faster, lower cost,
              and gives both sides a much better picture of where to focus.
            </div>

            <h2>Next step</h2>
            <p>
              All we need to start is your organization name and a list of
              domains you own.
            </p>
            <div className="mt-6">
              <LinkButton
                href="/contact?service=easm"
                size="lg"
                variant="primary"
              >
                Get an EASM report
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
