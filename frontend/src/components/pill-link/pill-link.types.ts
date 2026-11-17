import type { CallToAction } from "@/types/call-to-action";

export interface PillLinkProps extends CallToAction {
  /** `light` sits on photos and video; `dark` on light surfaces. Defaults to `light`. */
  readonly tone?: "light" | "dark";
  /** Spacing from the surrounding layout (e.g. margins). */
  readonly className?: string;
}
