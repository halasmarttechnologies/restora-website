import Image from "next/image";

import { PillLink } from "@/components/pill-link";
import { SectionHeading } from "@/components/section-heading";

import type { ServiceGiftProps } from "./service-page.types";

const HEADING_ID = "service-gift-heading";

/** Off-white row: gift-card copy and link on the left, a photo on a white card on the right. */
export function ServiceGift({ heading, body, action, imageSrc }: ServiceGiftProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      className="grid gap-5 rounded-xl bg-brand-background p-5 text-brand-black sm:p-[30px] lg:grid-cols-2 lg:gap-9"
    >
      <div className="flex flex-col justify-end">
        <SectionHeading id={HEADING_ID}>{heading}</SectionHeading>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-black/80 sm:text-base">
          {body}
        </p>
        <PillLink {...action} tone="dark" className="mt-5 self-start" />
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-brand-white">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
