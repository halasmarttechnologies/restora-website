import { screen, within } from "@testing-library/react";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";

import AccessibilityPage, { metadata as accessibilityMeta } from "@/app/(site)/accessibility/page";
import ContactPage, { metadata as contactMeta } from "@/app/(site)/contact/page";
import FaqPage, { metadata as faqMeta } from "@/app/(site)/faq/page";
import PrivacyPage, { metadata as privacyMeta } from "@/app/(site)/privacy/page";
import TermsPage, { metadata as termsMeta } from "@/app/(site)/terms/page";
import { ACCESSIBILITY_STATEMENT } from "@/constants/accessibility";
import { FAQ_CONTENT } from "@/constants/faq";

import { renderPage } from "./render-page";

const PAGES: [string, () => ReactElement, Metadata, string][] = [
  ["Contact", () => <ContactPage />, contactMeta, "contact us"],
  ["Privacy", () => <PrivacyPage />, privacyMeta, "privacy policy"],
  ["Terms", () => <TermsPage />, termsMeta, "terms of service"],
  ["Accessibility", () => <AccessibilityPage />, accessibilityMeta, "accessibility"],
  ["FAQ", () => <FaqPage />, faqMeta, "frequently asked questions"],
];

describe.each(PAGES)("%s page", (title, page, metadata, heading) => {
  it("renders its heading inside the main landmark", () => {
    renderPage(page());

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { level: 1, name: heading }),
    );
  });

  it("has its own title and description", () => {
    expect(metadata.title).toBe(title);
    expect(metadata.description).toEqual(expect.any(String));
  });

  it("asks the navbar for dark text over the light page", () => {
    renderPage(page());

    expect(screen.getByRole("main").querySelector("[data-light-page]")).not.toBeNull();
  });
});

describe("Accessibility page", () => {
  it("states the conformance target and how to report a barrier", () => {
    renderPage(<AccessibilityPage />);

    expect(screen.getByText(/\(WCAG\) 2\.2 at level AA/)).toBeInTheDocument();
    ACCESSIBILITY_STATEMENT.sections.forEach(({ heading }) =>
      expect(screen.getByRole("heading", { level: 2, name: heading })).toBeInTheDocument(),
    );
    expect(screen.getAllByRole("link", { name: /contact/i })[0]).toHaveAttribute(
      "href",
      "/contact",
    );
  });
});

describe("FAQ page", () => {
  it("groups the questions, each one expandable to its answer", () => {
    renderPage(<FaqPage />);

    FAQ_CONTENT.groups.forEach(({ heading, items }) => {
      const group = screen.getByRole("region", { name: heading });
      items.forEach(({ title, body }) =>
        expect(within(group).getByText(title).closest("details")).toContainElement(
          within(group).getByText(body),
        ),
      );
    });
  });
});
