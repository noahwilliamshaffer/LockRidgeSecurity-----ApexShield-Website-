export function ShieldMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="apex-mark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      <path
        d="M12 2 L21 5 L21 12 C21 17.5 17 21 12 22 C7 21 3 17.5 3 12 L3 5 Z"
        fill="url(#apex-mark-grad)"
      />
      <path
        d="M8 12 L11 15 L16 9"
        stroke="#050b1a"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
