import type { PagePanelProps } from "./page-panel.types";

const HEADING_ID = "page-heading";

/**
 * Off-white page card with a narrow, centred column: the `<h1>`, intro paragraphs, then the
 * page content. It starts under the navbar, and `data-light-page` switches the navbar to dark
 * text while it is transparent at the top of the page (see `navbar.tsx`).
 */
export function PagePanel({ heading, intro = [], children }: PagePanelProps) {
  return (
    <section
      aria-labelledby={HEADING_ID}
      data-light-page
      className="rounded-xl bg-brand-background px-5 pt-28 pb-16 text-brand-black sm:px-[30px] sm:pt-32 lg:pt-40 lg:pb-24"
    >
      <div className="mx-auto max-w-xl">
        <h1
          id={HEADING_ID}
          className="text-[32px] leading-tight tracking-[-0.02em] lowercase sm:text-[40px]"
        >
          {heading}
        </h1>
        {intro.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-sm leading-relaxed text-brand-black/80">
            {paragraph}
          </p>
        ))}
        {children}
      </div>
    </section>
  );
}
