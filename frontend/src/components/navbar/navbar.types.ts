import type { ReactNode } from "react";

import type { CallToAction } from "@/types/call-to-action";
import type { NavLink } from "@/types/navigation";
import type { Service } from "@/types/service";

export interface NavbarLinksProps {
  readonly links: readonly NavLink[];
  /** Extra `<li>` items rendered before the links (e.g. a menu trigger). */
  readonly children?: ReactNode;
}

export interface MobileMenuProps {
  /** Every service, listed under "Services" (the desktop services menu's content). */
  readonly services: readonly Service[];
  /** Link to the page with every service. */
  readonly allServices: CallToAction;
  /** The other page links, shown below the services. */
  readonly links: readonly NavLink[];
}

export interface ScrollAwareHeaderProps {
  readonly className: string;
  readonly children: ReactNode;
}
