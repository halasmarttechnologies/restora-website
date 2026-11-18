import Image from "next/image";

import type { TeamMember } from "./about.types";

/** "Ada Lovelace" -> "AL". */
const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

/** Portrait (or initials until one is supplied), then name, role and a short bio, centred. */
export function TeamMemberCard({ name, role, bio, portraitSrc }: TeamMember) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="relative flex aspect-[4/5] w-full max-w-[300px] items-center justify-center overflow-hidden rounded-lg bg-brand-white">
        {portraitSrc ? (
          <Image src={portraitSrc} alt={name} fill sizes="300px" className="object-cover" />
        ) : (
          <span aria-hidden="true" className="text-5xl tracking-[-0.02em] text-brand-black/30">
            {initialsOf(name)}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-xs tracking-[0.08em] uppercase sm:text-sm">{name}</h3>
      <p className="mt-1 text-xs tracking-[0.08em] text-brand-black/60 uppercase">{role}</p>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-black/70">{bio}</p>
    </article>
  );
}
