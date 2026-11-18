import type { TechniquesProps } from "./about.types";
import { TechniqueCard } from "./technique-card";

const HEADING_ID = "about-techniques-heading";

/** Off-white panel: heading and short copy, then a row of technique cards. */
export function Techniques({ heading, body, techniques }: TechniquesProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="rounded-xl bg-brand-background p-5 text-brand-black sm:p-[30px]"
    >
      <h2
        id={HEADING_ID}
        className="text-[28px] leading-tight tracking-[-0.02em] lowercase sm:text-4xl"
      >
        {heading}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-black/70 sm:text-base">
        {body}
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 lg:mt-12 lg:grid-cols-4">
        {techniques.map((technique) => (
          <li key={technique.name}>
            <TechniqueCard {...technique} />
          </li>
        ))}
      </ul>
    </section>
  );
}
