import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Navbar } from "@/components/navbar";
import { MOBILE_NAV_LINKS } from "@/constants/navigation";
import { SITE_NAME } from "@/constants/site";

const ALL_NAV_LINKS = MOBILE_NAV_LINKS;

describe("Navbar", () => {
  it("renders a banner landmark containing the primary navigation", () => {
    render(<Navbar />);

    expect(screen.getByRole("banner")).toContainElement(
      screen.getByRole("navigation", { name: "Primary" }),
    );
  });

  it("links the brand wordmark to the home page", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: SITE_NAME })).toHaveAttribute("href", "/");
  });

  it.each(ALL_NAV_LINKS)("renders the $label link pointing to $href", ({ label, href }) => {
    render(<Navbar />);

    const links = within(screen.getByRole("navigation", { name: "Primary" })).getAllByRole("link", {
      name: label,
    });

    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => expect(link).toHaveAttribute("href", href));
  });

  it("offers a menu toggle for small screens", () => {
    render(<Navbar />);

    expect(screen.getByText("Menu").tagName).toBe("SUMMARY");
  });

  describe("scroll state", () => {
    afterEach(() => setScrollY(0));

    it("is in its resting state at the top of the page", () => {
      render(<Navbar />);

      expect(screen.getByRole("banner")).toHaveAttribute("data-scroll", "top");
    });

    it("hides while scrolling down and reappears while scrolling up", () => {
      render(<Navbar />);
      const banner = screen.getByRole("banner");

      scrollTo(400);
      expect(banner).toHaveAttribute("data-scroll", "down");

      scrollTo(300);
      expect(banner).toHaveAttribute("data-scroll", "up");

      scrollTo(500);
      expect(banner).toHaveAttribute("data-scroll", "down");
    });

    it("returns to its resting state back at the top", () => {
      render(<Navbar />);
      const banner = screen.getByRole("banner");

      scrollTo(400);
      scrollTo(0);
      expect(banner).toHaveAttribute("data-scroll", "top");
    });

    it("ignores tiny scroll movements", () => {
      render(<Navbar />);
      const banner = screen.getByRole("banner");

      scrollTo(400);
      scrollTo(396);
      expect(banner).toHaveAttribute("data-scroll", "down");
    });
  });
});

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true });
}

function scrollTo(value: number) {
  act(() => {
    setScrollY(value);
    fireEvent.scroll(window);
  });
}
