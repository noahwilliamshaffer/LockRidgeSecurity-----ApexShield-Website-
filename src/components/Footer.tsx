import Link from "next/link";
import { ShieldMark } from "./ShieldMark";
import { siteConfig } from "@/lib/siteConfig";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-navy-950 pt-16 pb-6 text-ink-100">
      <div className="mx-auto w-full max-w-container px-5">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
              <ShieldMark className="h-6 w-6" />
              {siteConfig.displayName}
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink-400">
              California privacy compliance and offensive security for small
              and mid-sized businesses. Based in {siteConfig.city}.
            </p>
          </div>
          <FooterColumn
            title="Services"
            items={[
              { href: "/services/cppa-ccpa-audit", label: "CPPA/CCPA Audit" },
              { href: "/services/penetration-testing", label: "Penetration Testing" },
              { href: "/services/easm", label: "EASM" },
            ]}
          />
          <FooterColumn
            title="Company"
            items={[
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ]}
          />
          <FooterColumn
            title="Get started"
            items={[
              { href: "/screening", label: "CPPA/CCPA Check" },
              { href: "/contact", label: "Request a quote" },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-5 text-sm text-ink-400 sm:flex-row sm:items-center">
          <span>
            &copy; {year} {siteConfig.legalName}. {siteConfig.city}.
          </span>
          <span>
            {siteConfig.partner.role}: {siteConfig.partner.name}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
        {title}
      </h4>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-ink-100 transition-colors hover:text-cyan-bright"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
