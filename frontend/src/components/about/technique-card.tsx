import Image from "next/image";

import type { Technique } from "./about.types";

/** Square photo with an uppercase name and a one-line description beneath. */
export function TechniqueCard({ name, description, imageSrc }: Technique) {
  return (
    <article>
      <div className="relative aspect-square overflow-hidden rounded-lg bg-brand-white">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-3 text-xs tracking-[0.08em] uppercase sm:text-sm">{name}</h3>
      <p className="mt-1 text-xs leading-relaxed text-brand-black/70 sm:text-sm">{description}</p>
    </article>
  );
}
