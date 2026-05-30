import Link from "next/link";
import { Container } from "@/components/Container";
import { LinkButton } from "@/components/Button";
import { siteConfig } from "@/lib/siteConfig";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PathSelector />
      <ServicesStrip />
      <StatStrip />
      <ScreeningCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 20%, rgba(34,211,238,0.18), transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(6,182,212,0.12), transparent 60%)",
        }}
      />
      <Container className="relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="inline-block rounded-full border border-cyan-bright/35 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-bright">
            CPPA / CCPA &middot; Penetration Testing &middot; EASM
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-100 md:text-xl">
            ApexShield helps small and mid-sized businesses meet their
            California privacy obligations and find real security weaknesses
            before attackers do — without the jargon.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="#choose" size="lg" variant="primary">
              Get started
            </LinkButton>
            <LinkButton href="/services" size="lg" variant="outline-on-dark">
              Explore services
            </LinkButton>
          </div>
        </div>
        <HeroVisual />
      </Container>
    </section>
  );
}

function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto grid aspect-square w-full max-w-[380px] place-items-center rounded-3xl border border-white/10 p-8"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.2), transparent 60%), linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
      }}
    >
      <svg viewBox="0 0 200 220" className="w-3/4 opacity-90">
        <defs>
          <linearGradient id="hero-shield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path
          d="M100 10 L185 45 L185 110 C185 165 145 200 100 210 C55 200 15 165 15 110 L15 45 Z"
          fill="url(#hero-shield)"
          stroke="#22d3ee"
          strokeWidth="2"
        />
        <path
          d="M70 110 L92 132 L135 88"
          stroke="#0a1628"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function PathSelector() {
  return (
    <section id="choose" className="py-20 md:py-24">
      <Container>
        <SectionHead
          eyebrow="Choose your path"
          title="What do you need today?"
          subtitle="Pick the option that fits where you are. Not sure? Start with the compliance check — it takes about a minute."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <PathCard
            title="Compliance Software"
            description="Take a 60-second assessment to see if your business needs a CPPA/CCPA audit. If you do, we'll set you up with the right tooling — and an independent qualified auditor if you need one."
            cta="Start the assessment"
            href="/screening"
            variant="primary"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M12 2 L4 6 V12 C4 17 8 21 12 22 C16 21 20 17 20 12 V6 Z" />
                <path d="M9 12 L11 14 L15 10" />
              </svg>
            }
          />
          <PathCard
            title="Penetration Testing"
            description="Authorized testing of your systems and applications to find exploitable weaknesses before someone else does. Includes a clear findings report with risk ratings and remediation guidance."
            cta="Request a pen test"
            href="/contact?service=pentest"
            variant="secondary"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21 L16 16" />
              </svg>
            }
          />
        </div>
      </Container>
    </section>
  );
}

function PathCard({
  title,
  description,
  cta,
  href,
  variant,
  icon,
}: {
  title: string;
  description: string;
  cta: string;
  href: string;
  variant: "primary" | "secondary";
  icon: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-ink-200 bg-white p-8 shadow-soft transition-all duration-150 hover:-translate-y-1 hover:border-cyan hover:shadow-lift">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-navy-900 to-cyan text-white">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-navy-900">{title}</h3>
      <p className="flex-1 text-ink-600">{description}</p>
      <div className="pt-2">
        <LinkButton href={href} variant={variant}>
          {cta}
        </LinkButton>
      </div>
    </div>
  );
}

function ServicesStrip() {
  const services = [
    {
      badge: "Flagship",
      title: "CPPA / CCPA Audit",
      body:
        "California privacy readiness, framed on NIST CSF 2.0. Identifies gaps and gives you a prioritized plan to close them.",
      href: "/services/cppa-ccpa-audit",
    },
    {
      badge: "Offensive",
      title: "Penetration Testing",
      body:
        "External, web, and network testing with a findings report you can actually act on. Risk-rated and remediation-focused.",
      href: "/services/penetration-testing",
    },
    {
      badge: "Recon",
      title: "External Attack Surface Mgmt",
      body:
        "Non-intrusive discovery of your internet-facing exposure. See what an attacker sees, without touching production.",
      href: "/services/easm",
    },
  ];

  return (
    <section className="bg-ink-50 py-20 md:py-24">
      <Container>
        <SectionHead
          eyebrow="Our services"
          title="Three focused services. No bloat."
          subtitle="We don't try to be everything. We do three things well, for businesses that need them."
        />
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
  );
}

function StatStrip() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="grid gap-8 text-center md:grid-cols-3">
          <Stat
            num={`$${(siteConfig.cppa.revenueThresholdUSD / 1_000_000).toFixed(0)}M+`}
            label="Annual revenue threshold that triggers CCPA audit obligations"
          />
          <Stat
            num={`${siteConfig.cppa.firstAuditWindowMonths} mo`}
            label="Window businesses have to complete their first cybersecurity audit"
          />
          <Stat
            num={siteConfig.cppa.methodologyFramework}
            label="The framework we anchor our compliance methodology on"
          />
        </div>
      </Container>
    </section>
  );
}

function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold text-navy-900 md:text-4xl">
        {num}
      </div>
      <div className="mt-1 text-sm text-ink-600">{label}</div>
    </div>
  );
}

function ScreeningCTA() {
  return (
    <section className="bg-ink-50 py-20 md:py-24">
      <Container className="text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Not sure if CCPA applies to your business?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-600">
          Our short screening walks through the actual qualifying criteria from
          the draft CPPA cybersecurity audit regulations. No signup. No
          marketing email. Just a clear answer.
        </p>
        <div className="mt-7">
          <LinkButton href="/screening" size="lg" variant="primary">
            Take the 60-second check
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-cyan-deep">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-ink-600">{subtitle}</p>}
    </div>
  );
}
