import Link from "next/link";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "outline-on-dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-bright focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-cyan text-navy-900 hover:bg-cyan-bright hover:-translate-y-px hover:shadow-card",
  secondary:
    "bg-navy-900 text-white hover:bg-navy-800 hover:-translate-y-px hover:shadow-card",
  outline:
    "bg-transparent border border-ink-200 text-navy-900 hover:border-cyan hover:text-cyan-deep",
  ghost:
    "bg-transparent text-ink-700 hover:text-cyan-deep",
  "outline-on-dark":
    "bg-transparent border border-white/25 text-white hover:border-cyan-bright hover:text-cyan-bright",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className = "",
  href,
  children,
}: CommonProps & { href: string }) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
