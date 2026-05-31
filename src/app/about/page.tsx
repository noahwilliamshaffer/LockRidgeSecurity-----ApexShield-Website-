import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { PageHead } from "@/components/PageHead";
import { LinkButton } from "@/components/Button";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "About",
  description:
    "ApexShield LLC — California privacy and security consultancy. Owned by Erwin Bruno and Jinjie (Bobby) Dai. Engineering partner: LockRidge LLC (Noah Shaffer).",
};

interface TeamMember {
  name: string;
  role: string;
  ownership?: string;
  bio: string;
  /** When set, renders an image at this public path as the avatar. */
  avatarSrc?: string;
  /** Tone for the gradient avatar fallback. */
  avatarTone?: "navy" | "orange";
}

const team: TeamMember[] = [
  {
    name: "Erwin Bruno",
    role: "Managing Member",
    ownership: "60% owner",
    bio:
      "Premier cybersecurity engineer and US Navy veteran. Erwin leads engagements, scopes audits, and is the primary point of contact for clients.",
    avatarTone: "navy",
  },
  {
    name: "Jinjie (Bobby) Dai",
    role: "Member",
    ownership: "40% owner",
    bio:
      "Premier cybersecurity engineer with a veteran background. Bobby drives technical assessments and the security tooling behind every engagement.",
    avatarTone: "navy",
  },
  {
    name: "Noah Shaffer",
    role: "Engineering Partner — LockRidge LLC",
    bio:
      "CISSP-certified software engineer behind ApexShield's compliance software, penetration-testing platform, and this website. Noah owns LockRidge LLC, ApexShield's engineering partner.",
    avatarSrc: "/lockridge-logo.svg",
    avatarTone: "orange",
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
            <p className="mt-3 text-lg text-ink-600">
              Veteran cybersecurity engineers in the field, an engineering
              partner behind the platform.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {team.map((m) => (
              <article
                key={m.name}
                className="flex flex-col rounded-xl border border-ink-200 bg-white p-7 shadow-soft"
              >
                <Avatar member={m} />
                <h3 className="mt-5 text-xl font-bold text-navy-900">
                  {m.name}
                </h3>
                <div className="mt-0.5 text-sm font-semibold text-cyan-deep">
                  {m.role}
                  {m.ownership && (
                    <span className="text-ink-500"> — {m.ownership}</span>
                  )}
                </div>
                <p className="mt-3 flex-1 text-ink-600">{m.bio}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="prose-apex">
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

function Avatar({ member }: { member: TeamMember }) {
  if (member.avatarSrc) {
    return (
      <div className="h-20 w-20 overflow-hidden rounded-full border border-ink-200 bg-white">
        <Image
          src={member.avatarSrc}
          alt={`${member.name} — ${member.role}`}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  const gradient =
    member.avatarTone === "orange"
      ? "from-amber-600 to-orange-500"
      : "from-navy-900 to-cyan";
  return (
    <div
      aria-hidden="true"
      className={`h-20 w-20 rounded-full bg-gradient-to-br ${gradient}`}
    />
  );
}
