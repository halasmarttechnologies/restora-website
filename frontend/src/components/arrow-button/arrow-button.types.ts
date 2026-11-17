export interface ArrowButtonProps {
  /** Accessible name, e.g. "Next slide". */
  readonly label: string;
  readonly direction: "left" | "right";
  readonly onClick: () => void;
  readonly disabled?: boolean;
  /** Positioning from the surrounding layout. */
  readonly className?: string;
}
