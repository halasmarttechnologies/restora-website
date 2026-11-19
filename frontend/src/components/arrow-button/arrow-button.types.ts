export interface ArrowButtonProps {
  /** Accessible name, e.g. "Next slide". */
  readonly label: string;
  readonly direction: "left" | "right";
  readonly onClick: () => void;
  readonly disabled?: boolean;
  /** `outline` (default) for light panels; `solid` is a larger white circle. */
  readonly variant?: "outline" | "solid";
  /** Positioning from the surrounding layout. */
  readonly className?: string;
}
