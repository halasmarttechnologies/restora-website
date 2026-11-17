import type { ReactNode } from "react";

import type { NavLink } from "@/types/navigation";

export interface NavbarLinksProps {
  readonly links: readonly NavLink[];
}

export interface ScrollAwareHeaderProps {
  readonly className: string;
  readonly children: ReactNode;
}
