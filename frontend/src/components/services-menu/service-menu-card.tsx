import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/types/service";

/** White card: code badge, photo, uppercase name and a short description. The whole card is
 *  clickable through the name's stretched link. */
export function ServiceMenuCard({ code, name, description, href, imageSrc }: Service) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg bg-brand-white p-6 text-brand-black">
      <span className="self-start rounded-full bg-brand-black px-2.5 py-0.5 text-[11px] text-brand-white">
        {code}
      </span>
      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-md">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 1280px) 20vw, 30vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />
      </div>
      <h3 className="mt-6 text-sm uppercase xl:text-base">
        <Link
          href={href}
          className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-brand-black"
        >
          {name}
        </Link>
      </h3>
      <p className="mt-1 text-sm leading-snug text-brand-black/70">{description}</p>
    </article>
  );
}
