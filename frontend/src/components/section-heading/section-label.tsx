import type { SectionHeadingProps } from "./section-heading.types";

/** Small uppercase section heading (`<h2>`), used where the panel content carries the weight. */
export function SectionLabel({ id, children }: SectionHeadingProps) {
  return (
    <h2 id={id} className="text-xs tracking-[0.08em] uppercase">
      {children}
    </h2>
  );
}
