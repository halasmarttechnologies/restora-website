import type { ServiceSpecsProps } from "./service-page.types";

/** Tagline and a two-column table of specs (duration, pressure, …), anchored to the bottom. */
export function ServiceSpecs({ headingId, tagline, specs }: ServiceSpecsProps) {
  return (
    <div className="mt-auto">
      <h2
        id={headingId}
        className="max-w-md text-[28px] leading-[1.15] tracking-[-0.02em] sm:text-4xl"
      >
        {tagline}
      </h2>
      <dl className="mt-8 text-sm">
        {specs.map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between gap-6 border-t border-brand-black/15 py-3"
          >
            <dt className="text-xs tracking-[0.04em] text-brand-black/70 uppercase">{label}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
