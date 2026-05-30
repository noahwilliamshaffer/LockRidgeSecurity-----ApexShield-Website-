import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { LinkButton } from "@/components/Button";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About",
  description:
    "ApexShield LLC — California privacy and security consultancy. Owned by Erwin Bruno and Jinjie (Bobby) Dai. Engineering partner: LockRidge LLC.",
};

const team = [
  {
    name: "Erwin Bruno",
    role: "Managing Member — 60% owner",
    bio:
      "US Navy veteran and cybersecurity engineer. Erwin leads engagements and is the primary point of contact for clients.",
  },
  {
    name: "Jinjie (Bobby) Dai",
    role: "Member — 40% owner",
    bio: "Co-owner of ApexShield LLC.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        title={`About ${siteConfig.displayName}`}
        intro="A San Diego-based consultancy focused on California privacy compliance and offensive security for small and mid-sized businesses."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="prose-apex">
            <h2>Our approach</h2>
            <p>
              Most security work is dressed up in jargon. We don&apos;t do that.
              Our clients are small-business owners, not CISOs — they need
              straight talk, prioritized recommendations, and partners who treat
              their time and budget seriously. That&apos;s what we built
              ApexShield to do.
            </p>
            <p>
              We focus on three services: CPPA/CCPA readiness audits,
              penetration testing, and external attack surface management. We
              don&apos;t try to be everything to everyone.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-ink-50 py-20 md:py-24">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-cyan-deep">
              Ownership &amp; team
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              The people behind ApexShield
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {team.map((m) => (
              <div
                key={m.name}
                className="rounded-xl border border-ink-200 bg-white p-7 shadow-soft"
              >
                <div
                  aria-hidden="true"
                  className="mb-4 h-16 w-16 rounded-full bg-gradient-to-br from-navy-900 to-cyan"
                />
                <h3 className="text-xl font-bold text-navy-900">{m.name}</h3>
                <div className="mt-0.5 text-sm font-semibold text-cyan-deep">
                  {m.role}
                </div>
                <p className="mt-2 text-ink-600">{m.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="prose-apex">
            <h2>Engineering partner</h2>
            <p>
              <strong>{siteConfig.partner.name} (Noah)</strong> is ApexShield&apos;s software engineering partner.{" "}
              {siteConfig.partner.cert}, LockRidge handles the platform side of
              our compliance software and supporting tooling.
            </p>

            <h2>Where we are</h2>
            <p>
              {siteConfig.city}. We serve clients across the state — and
              anywhere California privacy law reaches.
            </p>

            <h2>Talk to us</h2>
            <p>
              Whether you&apos;re staring down a CPPA audit, scoping a pen
              test, or just trying to figure out what&apos;s exposed about your
              company online — we&apos;d be glad to hear from you.
            </p>
            <div className="mt-6">
              <LinkButton href="/contact" size="lg" variant="primary">
                Get in touch
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
