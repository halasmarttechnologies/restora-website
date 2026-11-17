import type { NavLink } from "@/types/navigation";

/** A footer column: plain strings render as text, objects as links. */
export interface FooterLinkGroup {
  readonly title: string;
  readonly items: readonly (NavLink | string)[];
}

export interface FooterContent {
  readonly newsletter: {
    readonly intro: string;
    readonly description: string;
  };
  readonly linkGroups: readonly FooterLinkGroup[];
  readonly copyright: string;
}

export interface FooterProps {
  /** Spacing from the surrounding layout (e.g. top margin). */
  readonly className?: string;
}

export interface FooterColumnProps {
  readonly group: FooterLinkGroup;
}
