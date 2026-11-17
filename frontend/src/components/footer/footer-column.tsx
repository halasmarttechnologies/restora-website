import Link from "next/link";

import type { FooterColumnProps } from "./footer.types";

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Column heading with a list of links and/or short notes. External links open in a new tab. */
export function FooterColumn({ group }: FooterColumnProps) {
  return (
    <div>
      <h2 className="text-xs tracking-[0.04em] uppercase">{group.title}</h2>
      <ul className="mt-4 flex flex-col gap-3 text-sm text-brand-black/70">
        {group.items.map((item) =>
          typeof item === "string" ? (
            <li key={item}>{item}</li>
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition-colors hover:text-brand-black"
                {...(isExternal(item.href) && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
