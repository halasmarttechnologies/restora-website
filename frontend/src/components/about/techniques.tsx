import type { TechniquesProps } from "./about.types";
import { PanelIntro } from "./panel-intro";
import { TechniqueCard } from "./technique-card";

const HEADING_ID = "about-techniques-heading";

/** Off-white panel: heading and short copy, then a row of technique cards. */
export function Techniques({ heading, body, techniques }: TechniquesProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="rounded-xl bg-brand-background p-5 text-brand-black sm:p-[30px]"
    >
      <PanelIntro headingId={HEADING_ID} heading={heading} body={body} />

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
