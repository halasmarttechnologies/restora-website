import type { ArrowButtonProps } from "./arrow-button.types";

/** Small round outlined button with an arrow, used for carousel and gallery controls. */
export function ArrowButton({
  label,
  direction,
  onClick,
  disabled = false,
  className = "",
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`grid size-9 place-items-center rounded-full border border-brand-black/40 text-brand-black/70 transition-[color,border-color,opacity] enabled:hover:border-brand-black enabled:hover:text-brand-black disabled:opacity-30 ${className}`}
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
