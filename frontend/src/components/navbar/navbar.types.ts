import type { ReactNode } from "react";

import type { NavLink } from "@/types/navigation";

export interface NavbarLinksProps {
  readonly links: readonly NavLink[];
  /** Extra `<li>` items rendered before the links (e.g. a menu trigger). */
  readonly children?: ReactNode;
}

export interface ScrollAwareHeaderProps {
  readonly className: string;
  readonly children: ReactNode;
}
