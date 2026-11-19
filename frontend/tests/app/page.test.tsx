import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/(site)/page";
import { HOME_BRAND_STORY, HOME_EDITORIAL, HOME_FEATURE_BANNER, HOME_HERO } from "@/constants/home";

import { renderPage } from "./render-page";

describe("Home page", () => {
  it("opens the you + restora gallery with the men's video and closes it with the women's", () => {
    const { items } = HOME_BRAND_STORY.gallery;

    expect(items.at(0)).toMatchObject({ type: "video", src: "/videos/gallery/men.mp4" });
    expect(items.at(-1)).toMatchObject({ type: "video", src: "/videos/gallery/woman.mp4" });
    expect(items.slice(1, -1).every(({ type }) => type === "image")).toBe(true);
  });

  it("renders the hero inside the main landmark", () => {
    renderPage(<Home />);

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { level: 1, name: HOME_HERO.heading }),
    );
  });

  it("renders every home section inside the main landmark", () => {
    renderPage(<Home />);

    const main = screen.getByRole("main");
    const { gallery, values, milestone } = HOME_BRAND_STORY;
    [
      "Featured services",
      HOME_FEATURE_BANNER.heading,
      HOME_EDITORIAL.carousel.heading,
      ...HOME_EDITORIAL.stories.map(({ heading }) => heading),
      gallery.heading,
      values.heading,
      milestone.heading,
    ].forEach((name) => expect(main).toContainElement(screen.getByRole("region", { name })));
  });
});
