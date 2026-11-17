import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BrandStory } from "@/components/brand-story";
import type { BrandStoryProps } from "@/components/brand-story";

const content: BrandStoryProps = {
  gallery: {
    heading: "you + test",
    action: { label: "Find us on social", href: "https://example.com/social" },
    images: [
      { src: "/images/gallery/one.webp", alt: "First photo" },
      { src: "/images/gallery/two.webp", alt: "Second photo" },
    ],
  },
  values: {
    heading: "Our values",
    statement: "To test, check and verify.",
    action: { label: "Our values", href: "/about" },
    items: [
      { title: "first value", body: "First value body." },
      { title: "second value", body: "Second value body." },
    ],
    imageSrc: "/images/values.webp",
  },
  milestone: {
    heading: "test milestone",
    action: { label: "Plan your visit", href: "/book" },
    imageSrc: "/images/milestone.webp",
  },
};

/** Fakes a 1000px-wide strip in a 500px viewport (jsdom has no layout), scrolled to `scrollLeft`. */
function scrollStrip(strip: HTMLElement, scrollLeft: number) {
  const metrics = { scrollLeft, scrollWidth: 1000, clientWidth: 500 };
  Object.entries(metrics).forEach(([key, value]) =>
    Object.defineProperty(strip, key, { value, configurable: true }),
  );
  fireEvent.scroll(strip);
}

const firstImageSrc = (scope: HTMLElement) =>
  decodeURIComponent(scope.querySelector("img")?.getAttribute("src") ?? "");

describe("BrandStory", () => {
  describe("social gallery", () => {
    const scrollBy = vi.fn<(options: ScrollToOptions) => void>();

    beforeEach(() => {
      // jsdom has no layout or scrolling.
      HTMLElement.prototype.scrollBy = scrollBy as HTMLElement["scrollBy"];
    });
    afterEach(() => scrollBy.mockClear());

    function renderGallery() {
      render(<BrandStory {...content} />);
      return screen.getByRole("region", { name: content.gallery.heading });
    }

    it("renders every photo with its description", () => {
      const region = renderGallery();

      content.gallery.images.forEach(({ alt }) =>
        expect(within(region).getByRole("img", { name: alt })).toBeInTheDocument(),
      );
    });

    it("links to the social profile", () => {
      const region = renderGallery();

      expect(
        within(region).getByRole("link", { name: content.gallery.action.label }),
      ).toHaveAttribute("href", content.gallery.action.href);
    });

    it("disables the left arrow at the start of the strip", () => {
      const region = renderGallery();

      expect(within(region).getByRole("button", { name: "Scroll photos left" })).toBeDisabled();
      expect(within(region).getByRole("button", { name: "Scroll photos right" })).toBeEnabled();
    });

    it("scrolls the strip right and left with the arrow buttons", () => {
      const region = renderGallery();
      const strip = within(region).getByRole("list");

      scrollStrip(strip, 0);
      fireEvent.click(within(region).getByRole("button", { name: "Scroll photos right" }));
      scrollStrip(strip, 250);
      fireEvent.click(within(region).getByRole("button", { name: "Scroll photos left" }));

      expect(scrollBy.mock.calls.map(([options]) => options.left)).toEqual([400, -400]);
    });

    it("disables the right arrow at the end of the strip", () => {
      const region = renderGallery();

      scrollStrip(within(region).getByRole("list"), 500);

      expect(within(region).getByRole("button", { name: "Scroll photos right" })).toBeDisabled();
      expect(within(region).getByRole("button", { name: "Scroll photos left" })).toBeEnabled();
    });
  });

  describe("values", () => {
    function renderValues() {
      render(<BrandStory {...content} />);
      return screen.getByRole("region", { name: content.values.heading });
    }

    it("renders the statement and its call to action", () => {
      const region = renderValues();

      expect(within(region).getByText(content.values.statement)).toBeInTheDocument();
      expect(
        within(region).getByRole("link", { name: content.values.action.label }),
      ).toHaveAttribute("href", content.values.action.href);
    });

    it.each(content.values.items)("lists $title as an expandable item", ({ title, body }) => {
      const region = renderValues();

      const summary = within(region).getByText(title);
      expect(summary.closest("summary")).not.toBeNull();
      expect(summary.closest("details")).toContainElement(within(region).getByText(body));
    });

    it("renders the photo as a decorative image", () => {
      const region = renderValues();

      expect(region.querySelector("img")).toHaveAttribute("alt", "");
      expect(firstImageSrc(region)).toContain(content.values.imageSrc);
    });
  });

  describe("milestone banner", () => {
    it("renders its heading, call to action and decorative photo", () => {
      render(<BrandStory {...content} />);

      const region = screen.getByRole("region", { name: content.milestone.heading });
      expect(
        within(region).getByRole("link", { name: content.milestone.action.label }),
      ).toHaveAttribute("href", content.milestone.action.href);
      expect(region.querySelector("img")).toHaveAttribute("alt", "");
      expect(firstImageSrc(region)).toContain(content.milestone.imageSrc);
    });
  });
});
