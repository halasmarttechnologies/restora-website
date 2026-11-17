import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeaturedServices } from "@/components/featured-services";
import type { FeaturedService } from "@/types/service";

const SERVICES: readonly FeaturedService[] = [
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
];

function renderSection() {
  render(<FeaturedServices services={SERVICES} />);
  return screen.getByRole("region", { name: "Featured services" });
}

describe("FeaturedServices", () => {
  it("renders one card per service inside a labelled region", () => {
    const region = renderSection();

    expect(within(region).getAllByRole("article")).toHaveLength(SERVICES.length);
  });

  it.each(SERVICES)("links $name to its service page", ({ name, href }) => {
    renderSection();

    const heading = screen.getByRole("heading", { level: 3, name });
    expect(within(heading).getByRole("link", { name })).toHaveAttribute("href", href);
  });

  it.each(SERVICES)("shows the details for $name", ({ name, title, description, duration }) => {
    renderSection();

    const card = screen.getByRole("heading", { name }).closest("article");
    expect(card).not.toBeNull();
    const scope = within(card as HTMLElement);
    expect(scope.getByText(title)).toBeInTheDocument();
    expect(scope.getByText(description)).toBeInTheDocument();
    expect(scope.getByText(duration)).toBeInTheDocument();
  });

  it.each(SERVICES)(
    "renders the icon and hover photo for $name as decorative images",
    ({ name, iconSrc, imageSrc }) => {
      renderSection();

      const card = screen.getByRole("heading", { name }).closest("article") as HTMLElement;
      const images = [...card.querySelectorAll("img")];
      // next/image may route sources through its optimiser, so compare the decoded URL.
      const sources = images.map((img) => decodeURIComponent(img.getAttribute("src") ?? ""));

      images.forEach((img) => expect(img).toHaveAttribute("alt", ""));
      expect(sources).toEqual([
        expect.stringContaining(imageSrc),
        expect.stringContaining(iconSrc),
      ]);
    },
  );
});
