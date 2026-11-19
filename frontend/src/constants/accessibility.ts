import type { ContentPage } from "@/components/content-sections";
import { SITE_NAME } from "@/constants/site";

/**
 * Accessibility statement. Keep it truthful: update "What we have done" and "Known
 * limitations" whenever the site changes, and re-check it before launch.
 */
export const ACCESSIBILITY_STATEMENT: ContentPage = {
  heading: "accessibility",
  intro: [
    `${SITE_NAME} wants everyone to be able to find information, get in touch and book with ease, whatever their abilities or the technology they use.`,
    "Last reviewed: 20 November 2026.",
  ],
  sections: [
    {
      heading: "Our standard",
      paragraphs: [
        "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, the internationally recognised standard for accessible websites.",
      ],
    },
    {
      heading: "What we have done",
      paragraphs: ["The site has been built with accessibility in mind from the start:"],
      list: [
        "Clear page structure with headings and landmarks (header, main content, footer) for screen readers.",
        "Everything works with a keyboard: menus, forms, carousels and expandable answers, with a visible focus outline. Escape closes the services menu.",
        "Text alternatives for meaningful images; purely decorative images are hidden from screen readers.",
        "Every form field has a label, errors are described next to the field they belong to, and confirmations are announced.",
        "Animations are reduced or switched off when your device asks for reduced motion, and videos then wait for you to press play.",
        "Every video has a pause button, and plays only while it is on screen.",
        "Pages adapt to any screen size and to browser zoom up to 400% without losing content.",
        "Dark text on light backgrounds (and white on dark) from a simple two-colour palette.",
      ],
    },
    {
      heading: "Known limitations",
      paragraphs: ["We are still working on the following:"],
      list: [
        "Some secondary text, such as unselected filter labels in the services menu, is lighter than ideal and may be hard to read for some visitors.",
        "Several pages linked from the menus are still being built.",
      ],
    },
    {
      heading: "Feedback and help",
      paragraphs: [
        "If something on the site is difficult to use, or you need information in a different format, please tell us. We read every message and aim to reply within two business days.",
      ],
      link: { label: "Contact us about accessibility", href: "/contact" },
    },
    {
      heading: "How we checked",
      paragraphs: [
        "This statement is based on our own review of the site with keyboard-only navigation, a screen reader and automated checks. We plan an independent audit before launch.",
      ],
    },
  ],
};
