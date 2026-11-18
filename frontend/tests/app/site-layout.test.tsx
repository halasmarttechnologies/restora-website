import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ANNOUNCEMENT_MESSAGE } from "@/constants/site";

import { renderPage } from "./render-page";

describe("Site layout", () => {
  it("renders the announcement bar", () => {
    renderPage(<p>Page content</p>);

    expect(screen.getByText(ANNOUNCEMENT_MESSAGE)).toBeInTheDocument();
  });

  it("places the page inside the main landmark", () => {
    renderPage(<p>Page content</p>);

    expect(screen.getByRole("main")).toContainElement(screen.getByText("Page content"));
  });

  it("keeps the navbar and footer outside the main landmark", () => {
    renderPage(<p>Page content</p>);

    const main = screen.getByRole("main");
    expect(main).not.toContainElement(screen.getByRole("banner"));
    expect(main).not.toContainElement(screen.getByRole("contentinfo"));
  });
});
