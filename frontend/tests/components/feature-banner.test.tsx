import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeatureBanner } from "@/components/feature-banner";
import type { FeatureBannerProps } from "@/components/feature-banner";

const content: FeatureBannerProps = {
  heading: "test heading",
  body: "Test body copy.",
  action: { label: "Test action", href: "/test" },
  imageSrc: "/images/banners/test.webp",
};

function renderBanner() {
  render(<FeatureBanner {...content} />);
  return screen.getByRole("region", { name: content.heading });
}

describe("FeatureBanner", () => {
  it("is a region labelled by its heading", () => {
    const region = renderBanner();

    expect(
      within(region).getByRole("heading", { level: 2, name: content.heading }),
    ).toBeInTheDocument();
  });

  it("renders the body copy", () => {
    const region = renderBanner();

    expect(within(region).getByText(content.body)).toBeInTheDocument();
  });

  it("renders the call to action as a link", () => {
    const region = renderBanner();

    expect(within(region).getByRole("link", { name: content.action.label })).toHaveAttribute(
      "href",
      content.action.href,
    );
  });

  it("renders the background photo as a decorative image", () => {
    const region = renderBanner();

    const image = region.querySelector("img");
    expect(image).toHaveAttribute("alt", "");
    expect(decodeURIComponent(image?.getAttribute("src") ?? "")).toContain(content.imageSrc);
  });
});
