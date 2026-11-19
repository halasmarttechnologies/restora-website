import type { DisclosureItem } from "@/components/disclosure-list";

export interface FaqGroup {
  readonly heading: string;
  /** Questions (`title`) with their answers (`body`). */
  readonly items: readonly DisclosureItem[];
}

export interface FaqGroupsProps {
  readonly groups: readonly FaqGroup[];
}
