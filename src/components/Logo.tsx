/** The Ziki mark: a Z with a short line through its middle — the real logo, redrawn 1:1. */
export function ZikiMark({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M22 22H78L22 78H78M30 50H70"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

const LOGO_SIZES = { sm: "h-7 w-7 sm:h-8 sm:w-8", md: "h-11 w-11" } as const;

/** The Ziki logo: the mark alone, no wordmark; its name says Ziki. */
export function Logo({ size = "sm" }: { size?: "sm" | "md" }) {
  return <ZikiMark className={`${LOGO_SIZES[size]} text-ink`} />;
}
