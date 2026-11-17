import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Editorial } from "@/components/editorial";
import type { EditorialProps } from "@/components/editorial";

const content: EditorialProps = {
  carousel: {
    heading: "Test add-ons",
    imageSrc: "/images/editorial/carousel.webp",
    slides: [
      {
        name: "First slide",
        description: "First description",
        imageSrc: "/images/first.webp",
        action: { label: "First action", href: "/first" },
      },
      {
        name: "Second slide",
        description: "Second description",
        imageSrc: "/images/second.webp",
        action: { label: "Second action", href: "/second" },
      },
    ],
  },
  stories: [
    {
      heading: "first story",
      body: "First story body.",
      imageSrc: "/images/editorial/first-story.webp",
      action: { label: "Read first", href: "/first-story" },
    },
    {
      heading: "second story",
      body: "Second story body.",
      imageSrc: "/images/editorial/second-story.webp",
      action: { label: "Read second", href: "/second-story" },
    },
  ],
};

const imageSources = (scope: HTMLElement) =>
  [...scope.querySelectorAll("img")].map((img) => decodeURIComponent(img.src));

describe("Editorial", () => {
  describe("stories", () => {
    it.each(content.stories)("renders $heading as a labelled region", (story) => {
      render(<Editorial {...content} />);

      const region = screen.getByRole("region", { name: story.heading });
      expect(within(region).getByText(story.body)).toBeInTheDocument();
      expect(within(region).getByRole("link", { name: story.action.label })).toHaveAttribute(
        "href",
        story.action.href,
      );
      expect(imageSources(region)).toEqual([expect.stringContaining(story.imageSrc)]);
    });

    it("renders story photos as decorative images", () => {
      render(<Editorial {...content} />);

      const region = screen.getByRole("region", { name: "first story" });
      expect(region.querySelector("img")).toHaveAttribute("alt", "");
    });
  });

  describe("carousel", () => {
    function renderCarousel() {
      render(<Editorial {...content} />);
      return screen.getByRole("region", { name: content.carousel.heading });
    }

    it("shows the first slide and its position", () => {
      const region = renderCarousel();

      expect(within(region).getByText("First slide")).toBeInTheDocument();
      expect(within(region).getByText("First description")).toBeInTheDocument();
      expect(within(region).getByRole("group", { name: "1 of 2" })).toBeInTheDocument();
      expect(within(region).getByRole("link", { name: "First action" })).toHaveAttribute(
        "href",
        "/first",
      );
      expect(imageSources(region)).toEqual([
        expect.stringContaining(content.carousel.imageSrc),
        expect.stringContaining("/images/first.webp"),
      ]);
    });

    it("moves to the next slide", () => {
      const region = renderCarousel();

      fireEvent.click(within(region).getByRole("button", { name: "Next slide" }));

      expect(within(region).getByText("Second slide")).toBeInTheDocument();
      expect(within(region).queryByText("First slide")).toBeNull();
      expect(within(region).getByRole("group", { name: "2 of 2" })).toBeInTheDocument();
    });

    it("wraps around to the first slide after the last", () => {
      const region = renderCarousel();
      const next = within(region).getByRole("button", { name: "Next slide" });

      fireEvent.click(next);
      fireEvent.click(next);

      expect(within(region).getByText("First slide")).toBeInTheDocument();
    });
  });
});
