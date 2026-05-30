"use client";

import Link from "next/link";
import { useState } from "react";
import { ShieldMark } from "./ShieldMark";
import { siteConfig } from "@/lib/siteConfig";
import { LinkButton } from "./Button";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/screening", label: "CPPA/CCPA Check" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex w-full max-w-container items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-navy-900"
          onClick={() => setOpen(false)}
        >
          <ShieldMark className="h-7 w-7" />
          {siteConfig.displayName}
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-2 -mr-2 text-navy-900"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-800 transition-colors hover:text-cyan-deep"
            >
              {item.label}
            </Link>
          ))}
          <LinkButton href="/contact" size="md">
            Contact
          </LinkButton>
        </nav>
      </div>

      {open && (
        <nav className="border-t border-ink-200 bg-white md:hidden">
          <div className="mx-auto flex w-full max-w-container flex-col px-5 py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-ink-100 py-3 text-base font-medium text-ink-800 last:border-0"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-3 inline-flex items-center justify-center rounded bg-cyan px-5 py-3 text-sm font-semibold text-navy-900"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
