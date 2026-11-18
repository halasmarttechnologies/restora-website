export interface DisclosureItem {
  /** Always visible; toggles the body. */
  readonly title: string;
  readonly body: string;
}

export interface DisclosureListProps {
  readonly items: readonly DisclosureItem[];
  /** Spacing from the surrounding layout (e.g. `mt-auto` to pin it to the bottom). */
  readonly className?: string;
}
