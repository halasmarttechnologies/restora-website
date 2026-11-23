import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Navbar } from "@/components/navbar";
import { PRIMARY_NAV_LINKS, SECONDARY_NAV_LINKS } from "@/constants/navigation";
import { SERVICES } from "@/constants/services";
import { SITE_NAME } from "@/constants/site";

const PAGE_LINKS = [...PRIMARY_NAV_LINKS, ...SECONDARY_NAV_LINKS];

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

  it.each(PAGE_LINKS)("renders the $label link pointing to $href", ({ label, href }) => {
    render(<Navbar />);

    const links = within(screen.getByRole("navigation", { name: "Primary" })).getAllByRole("link", {
      name: label,
    });

    expect(links.length).toBeGreaterThan(0);
    links.forEach((link) => expect(link).toHaveAttribute("href", href));
  });

  describe("small-screen menu", () => {
    const menuButton = () => screen.getByRole("button", { name: "Menu" });
    const menuPanel = () =>
      document.getElementById(menuButton().getAttribute("aria-controls") ?? "")!;

    it("starts closed and slides open from the Menu button", () => {
      render(<Navbar />);
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
      expect(menuPanel()).toHaveAttribute("inert");

      fireEvent.click(menuButton());

      expect(menuButton()).toHaveAttribute("aria-expanded", "true");
      expect(menuPanel()).not.toHaveAttribute("inert");
    });

    it("lists every service, like the desktop services menu, and links to all services", () => {
      render(<Navbar />);
      fireEvent.click(menuButton());

      const services = within(menuPanel()).getByText("Services").closest("details")!;
      SERVICES.forEach(({ name, code, href }) => {
        const link = within(services).getByRole("link", { name: new RegExp(name) });
        expect(link).toHaveAttribute("href", href);
        expect(link).toHaveTextContent(code);
      });
      expect(within(services).getByRole("link", { name: "View all services" })).toHaveAttribute(
        "href",
        "/services",
      );
    });

    it("includes every other page link", () => {
      render(<Navbar />);
      fireEvent.click(menuButton());

      PAGE_LINKS.forEach(({ label, href }) =>
        expect(within(menuPanel()).getByRole("link", { name: label })).toHaveAttribute(
          "href",
          href,
        ),
      );
    });

    it("closes on Escape and returns focus to the Menu button", () => {
      render(<Navbar />);
      fireEvent.click(menuButton());

      fireEvent.keyDown(document, { key: "Escape" });

      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
      expect(menuButton()).toHaveFocus();
    });

    it("closes when a link is followed or the page is tapped outside it", () => {
      render(<Navbar />);
      fireEvent.click(menuButton());
      fireEvent.click(within(menuPanel()).getByRole("link", { name: "About" }));
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");

      fireEvent.click(menuButton());
      fireEvent.pointerDown(document.body);
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
    });
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
