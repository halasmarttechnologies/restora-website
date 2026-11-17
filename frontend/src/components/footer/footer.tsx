import { FOOTER_CONTENT } from "@/constants/footer";
import { SITE_NAME } from "@/constants/site";

import { FooterColumn } from "./footer-column";
import type { FooterProps } from "./footer.types";
import { NewsletterForm } from "./newsletter-form";

const DIVIDER = "border-brand-black/15";

/**
 * Site footer: an oversized wordmark, then the newsletter sign-up beside four link columns,
 * then the copyright line. Content lives in `constants/footer.ts`.
 */
export function Footer({ className = "" }: FooterProps) {
  const { newsletter, linkGroups, copyright } = FOOTER_CONTENT;

  return (
    <footer
      className={`overflow-hidden rounded-xl bg-brand-background text-brand-black ${className}`}
    >
      {/*
        Decorative: the name is already announced by the navbar's home link.
        Sized in container units (`cqw`) so the word spans the footer's width at any size.
      */}
      <div aria-hidden="true" className="@container px-4 pt-4 select-none sm:px-6 sm:pt-6">
        <p className="text-[36.8cqw] leading-[0.78] tracking-[-0.06em] whitespace-nowrap lowercase">
          {SITE_NAME}
        </p>
      </div>

      <div className={`grid border-t ${DIVIDER} lg:grid-cols-[5fr_8fr]`}>
        <div className={`p-5 sm:p-[30px] lg:border-r ${DIVIDER}`}>
          <p className="text-sm">{newsletter.intro}</p>
          <p className="mt-3 max-w-sm text-sm text-brand-black/70">{newsletter.description}</p>
          <NewsletterForm />
        </div>

        <nav
          aria-label="Footer"
          className={`grid grid-cols-2 gap-8 border-t p-5 sm:grid-cols-4 sm:p-[30px] lg:border-t-0 ${DIVIDER}`}
        >
          {linkGroups.map((group) => (
            <FooterColumn key={group.title} group={group} />
          ))}
        </nav>
      </div>

      <p className={`border-t px-5 py-4 text-center text-xs text-brand-black/60 ${DIVIDER}`}>
        {copyright}
      </p>
    </footer>
  );
}
