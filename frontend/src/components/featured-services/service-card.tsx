import Image from "next/image";
import Link from "next/link";

import type { ServiceCardProps } from "./featured-services.types";

/**
 * At rest the card shows the service icon; on hover (or keyboard focus) the icon fades
 * out and the service photo fades in behind white text. The heading link is stretched over the
 * whole card, so the card is one click target with a short accessible name.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  const { title, name, description, duration, href, iconSrc, imageSrc } = service;

  return (
    <article className="group relative isolate flex aspect-[5/6] flex-col overflow-hidden rounded-xl bg-brand-background p-5 text-brand-black/80 transition-colors duration-500 focus-within:text-brand-white hover:text-brand-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-black sm:p-[26px]">
      <Image
        src={imageSrc}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, 85vw"
        className="-z-10 scale-105 object-cover opacity-0 transition duration-700 ease-out group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-brand-black/30 via-transparent to-brand-black/60 opacity-0 transition-opacity duration-700 group-focus-within:opacity-100 group-hover:opacity-100"
      />

      <p className="text-[56px] leading-[0.9] tracking-[-0.05em] lowercase sm:text-[64px] xl:text-[80px]">
        {title}
      </p>

      <div className="flex flex-1 items-center justify-center py-4 transition duration-500 group-focus-within:scale-95 group-focus-within:opacity-0 group-hover:scale-95 group-hover:opacity-0 motion-reduce:transition-none">
        <div className="relative aspect-square w-3/5 max-w-[300px]">
          <Image src={iconSrc} alt="" fill sizes="300px" className="object-contain" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-4 text-sm uppercase sm:text-[15px]">
        <h3>
          <Link href={href} className="outline-none after:absolute after:inset-0">
            {name}
          </Link>
        </h3>
        <p className="shrink-0">{duration}</p>
      </div>
      <p className="mt-0.5 text-[13px] sm:text-sm">{description}</p>
    </article>
  );
}
