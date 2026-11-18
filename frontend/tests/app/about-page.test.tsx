import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage, { metadata } from "@/app/(site)/about/page";
import { ABOUT_CONTENT } from "@/constants/about";

import { renderPage } from "./render-page";

describe("About page", () => {
  it("renders the About content inside the main landmark", () => {
    renderPage(<AboutPage />);

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { level: 1, name: ABOUT_CONTENT.hero.heading }),
    );
  });

  it("has its own page title and description", () => {
    expect(metadata.title).toBe("About");
    expect(metadata.description).toEqual(expect.any(String));
  });
});
