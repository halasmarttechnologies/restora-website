import type { SectionHeadingProps } from "./section-heading.types";

/** Standard lowercase section heading (`<h2>`), used across the content panels. */
export function SectionHeading({ id, children }: SectionHeadingProps) {
  return (
    <h2 id={id} className="text-[28px] leading-tight tracking-[-0.02em] lowercase sm:text-4xl">
      {children}
    </h2>
  );
}
