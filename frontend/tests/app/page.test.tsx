import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import {
  ANNOUNCEMENT_MESSAGE,
  HOME_BRAND_STORY,
  HOME_EDITORIAL,
  HOME_FEATURE_BANNER,
  HOME_HERO,
} from "@/constants/home";

describe("Home page", () => {
  it("renders the announcement bar", () => {
    render(<Home />);

    expect(screen.getByText(ANNOUNCEMENT_MESSAGE)).toBeInTheDocument();
  });

  it("renders the navbar outside the main landmark", () => {
    render(<Home />);

    expect(screen.getByRole("main")).not.toContainElement(screen.getByRole("banner"));
  });

  it("renders the hero inside the main landmark", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { level: 1, name: HOME_HERO.heading }),
    );
  });

  it("renders the featured services inside the main landmark", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("region", { name: "Featured services" }),
    );
  });

  it("renders the feature banner inside the main landmark", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("region", { name: HOME_FEATURE_BANNER.heading }),
    );
  });

  it("renders the editorial rows inside the main landmark", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toContainElement(
      screen.getByRole("region", { name: HOME_EDITORIAL.carousel.heading }),
    );
    HOME_EDITORIAL.stories.forEach(({ heading }) =>
      expect(main).toContainElement(screen.getByRole("region", { name: heading })),
    );
  });

  it("renders the footer outside the main landmark", () => {
    render(<Home />);

    expect(screen.getByRole("main")).not.toContainElement(screen.getByRole("contentinfo"));
  });

  it("renders the brand story inside the main landmark", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    const { gallery, values, milestone } = HOME_BRAND_STORY;
    [gallery.heading, values.heading, milestone.heading].forEach((name) =>
      expect(main).toContainElement(screen.getByRole("region", { name })),
    );
  });
});
