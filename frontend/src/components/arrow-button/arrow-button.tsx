import type { ArrowButtonProps } from "./arrow-button.types";

const VARIANTS = {
  outline:
    "size-9 border border-brand-black/40 text-brand-black/70 enabled:hover:border-brand-black enabled:hover:text-brand-black",
  solid:
    "size-12 bg-brand-white text-brand-black enabled:hover:bg-brand-black enabled:hover:text-brand-white",
} as const;

/** Round arrow button used for carousel and gallery controls. */
export function ArrowButton({
  label,
  direction,
  onClick,
  disabled = false,
  variant = "outline",
  className = "",
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid cursor-pointer place-items-center rounded-full transition-[color,background-color,border-color,opacity] disabled:cursor-default disabled:opacity-30 ${VARIANTS[variant]} ${className}`}
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={`size-4 ${direction === "left" ? "rotate-180" : ""}`}
      >
        <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
