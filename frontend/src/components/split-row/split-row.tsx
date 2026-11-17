import Image from "next/image";

import type { SplitRowProps } from "./split-row.types";

/** Two equal squares: a photo and an off-white content panel, side by side on desktop. */
export function SplitRow({ headingId, imageSrc, mediaPosition, children }: SplitRowProps) {
  return (
    <section aria-labelledby={headingId} className="grid gap-3 sm:gap-5 lg:grid-cols-2 lg:gap-9">
      <div
        className={`relative aspect-square overflow-hidden rounded-xl ${mediaPosition === "end" ? "lg:order-last" : ""}`}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="relative flex min-h-[420px] flex-col rounded-xl bg-brand-background p-5 text-brand-black sm:p-[30px] lg:aspect-square lg:min-h-0">
        {children}
      </div>
    </section>
  );
}
