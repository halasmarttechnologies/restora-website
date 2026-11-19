import type { FeaturedService, Service } from "@/types/service";

/** Home-page service cards. Placeholder copy: replace once content is approved. */
export const FEATURED_SERVICES: readonly FeaturedService[] = [
  {
    title: "release",
    name: "Deep Tissue",
    description: "Slow, firm pressure for lasting tension.",
    duration: "60 min",
    href: "/services/deep-tissue",
    iconSrc: "/images/services/icons/deep-tissue.webp",
    imageSrc: "/images/services/photos/deep-tissue.webp",
  },
  {
    title: "unwind",
    name: "Swedish Relaxation",
    description: "Long, flowing strokes to settle body and mind.",
    duration: "90 min",
    href: "/services/swedish-relaxation",
    iconSrc: "/images/services/icons/swedish-relaxation.webp",
    imageSrc: "/images/services/photos/swedish-relaxation.webp",
  },
  {
    title: "recover",
    name: "Sports Recovery",
    description: "Focused work to ease soreness after training.",
    duration: "60 min",
    href: "/services/sports-recovery",
    iconSrc: "/images/services/icons/post-recovery.webp",
    imageSrc: "/images/services/photos/post-recovery.webp",
  },
];

/**
 * The full treatment menu (navbar Services panel). To change a photo, replace
 * `public/images/services/photos/<slug>.webp`; several are placeholders reusing other photos.
 */
export const SERVICES: readonly Service[] = [
  {
    code: "T—01",
    name: "Deep Tissue",
    description:
      "Slow, focused pressure for chronic tension and knots. Best after heavy training or long-standing tightness.",
    category: "recover",
    href: "/services/deep-tissue",
    imageSrc: "/images/services/photos/deep-tissue.webp",
  },
  {
    code: "T—02",
    name: "Swedish Relaxation",
    description:
      "Long, flowing strokes that calm the nervous system. Gentle stress relief and general wellbeing.",
    category: "relax",
    href: "/services/swedish-relaxation",
    imageSrc: "/images/services/photos/swedish-relaxation.webp",
  },
  {
    code: "T—03",
    name: "Sports Recovery",
    description:
      "Targeted work for active bodies: mobility, injury prevention and faster recovery between sessions.",
    category: "recover",
    href: "/services/sports-recovery",
    imageSrc: "/images/services/photos/post-recovery.webp",
  },
  {
    code: "T—04",
    name: "Prenatal",
    description:
      "Gentle, carefully positioned session for expecting mothers, easing common pregnancy discomfort.",
    category: "specialty",
    href: "/services/prenatal",
    imageSrc: "/images/brand-story/milestone.webp",
  },
  {
    code: "T—05",
    name: "Signature Restora",
    description:
      "Our full experience: deep tissue and relaxation technique, tailored to what your body needs that day.",
    category: "relax",
    href: "/services/signature-restora",
    imageSrc: "/images/banners/signature-ritual.webp",
  },
  {
    code: "T—06",
    name: "Reflexology",
    description:
      "Pressure-point work on feet, hands and ears to release tension held elsewhere and restore balance.",
    category: "specialty",
    href: "/services/reflexology",
    imageSrc: "/images/services/photos/swedish-relaxation.webp",
  },
];
