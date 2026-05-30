import Link from "next/link";
import { type ReactNode } from "react";

interface Crumb {
  href?: string;
  label: string;
}

export function PageHead({
  title,
  intro,
  crumbs = [],
}: {
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
}) {
  return (
    <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 text-white">
      <div className="mx-auto w-full max-w-container px-5 py-16 md:py-24">
        {crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 text-sm text-ink-400"
          >
            {crumbs.map((c, i) => (
              <span key={i}>
                {c.href ? (
                  <Link href={c.href} className="text-cyan-bright hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span className="mx-2">›</span>}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-lg text-ink-100 md:text-xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
