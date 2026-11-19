import { SectionHeading } from "@/components/section-heading";

import type { TeamProps } from "./about.types";
import { TeamMemberCard } from "./team-member-card";

const HEADING_ID = "about-team-heading";

/** Off-white panel with a centred introduction and the team side by side beneath it. */
export function Team({ heading, body, members }: TeamProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="rounded-xl bg-brand-background px-5 py-14 text-center text-brand-black sm:px-[30px] lg:py-20"
    >
      <SectionHeading id={HEADING_ID}>{heading}</SectionHeading>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brand-black/70 sm:text-base">
        {body}
      </p>

      <ul className="mx-auto mt-10 grid max-w-3xl gap-12 sm:grid-cols-2 sm:gap-8 lg:mt-14">
        {members.map((member) => (
          <li key={member.name}>
            <TeamMemberCard {...member} />
          </li>
        ))}
      </ul>
    </section>
  );
}
