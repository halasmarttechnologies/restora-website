import { TextLink } from "@/components/text-link";

import type { ContentSectionsProps } from "./content-sections.types";

/** Long-form text (policies, statements): an `<h2>` per section with paragraphs and lists. */
export function ContentSections({ sections }: ContentSectionsProps) {
  return (
    <div className="mt-12 flex flex-col gap-10">
      {sections.map(({ heading, paragraphs, list, link }) => (
        <section key={heading}>
          <h2 className="text-lg tracking-[-0.01em] lowercase sm:text-xl">{heading}</h2>
          <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-brand-black/80">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {list && (
              <ul className="flex list-disc flex-col gap-1.5 pl-5">
                {list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {link && (
              <p>
                <TextLink href={link.href}>{link.label}</TextLink>
              </p>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
