import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { Navbar } from "@/components/navbar";
import { SERVICES } from "@/constants/services";
import { SERVICES_MENU } from "@/constants/services-menu";

const trigger = () => screen.getByRole("button", { name: "Services" });
const panel = () => document.getElementById(trigger().getAttribute("aria-controls") ?? "")!;
const cardList = () => within(panel()).getByRole("list", { name: "Services" });
const cardNames = () =>
  within(cardList())
    .getAllByRole("heading", { level: 3 })
    .map(({ textContent }) => textContent);

function openMenu() {
  render(<Navbar />);
  fireEvent.click(trigger());
}

describe("Services menu", () => {
  afterEach(() => setScrollY(0));

  it("starts closed, with the panel hidden from interaction", () => {
    render(<Navbar />);

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(panel()).toHaveAttribute("inert");
    expect(screen.getByRole("banner")).toHaveAttribute("data-menu", "closed");
  });

  it("does not load the service cards (and their photos) until the menu is first opened", () => {
    render(<Navbar />);
    expect(panel().querySelector("img")).toBeNull();

    fireEvent.click(trigger());
    fireEvent.click(trigger());

    // Once loaded, the cards stay, so reopening is instant.
    expect(panel().querySelectorAll("img")).toHaveLength(SERVICES.length);
  });

  it("opens the panel when Services is clicked, and closes it on a second click", () => {
    openMenu();

    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    expect(panel()).not.toHaveAttribute("inert");
    expect(screen.getByRole("banner")).toHaveAttribute("data-menu", "open");

    fireEvent.click(trigger());
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("slides open when a mouse hovers Services and closes when it leaves the navbar", () => {
    render(<Navbar />);

    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    expect(trigger()).toHaveAttribute("aria-expanded", "true");

    // Moving into the panel keeps it open; leaving the whole navbar closes it.
    fireEvent.pointerEnter(panel(), { pointerType: "mouse" });
    expect(trigger()).toHaveAttribute("aria-expanded", "true");

    fireEvent.pointerLeave(screen.getByRole("banner"), { pointerType: "mouse" });
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps a hover-opened menu open when Services is then clicked", () => {
    render(<Navbar />);

    fireEvent.pointerEnter(trigger(), { pointerType: "mouse" });
    fireEvent.click(trigger(), { pointerType: "mouse" });

    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("ignores hover from touch, which opens the menu with a tap instead", () => {
    render(<Navbar />);

    fireEvent.pointerEnter(trigger(), { pointerType: "touch" });
    expect(trigger()).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger(), { pointerType: "touch" });
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("shows a card for every service with its code, description, link and photo", () => {
    openMenu();

    const cards = within(cardList()).getAllByRole("listitem");
    expect(cards).toHaveLength(SERVICES.length);
    SERVICES.forEach(({ code, name, description, href, imageSrc }, index) => {
      const card = cards[index]!;
      expect(within(card).getByRole("link", { name })).toHaveAttribute("href", href);
      expect(within(card).getByText(code)).toBeInTheDocument();
      expect(within(card).getByText(description)).toBeInTheDocument();
      expect(card.querySelector("img")).toHaveAttribute("alt", "");
      expect(decodeURIComponent(card.querySelector("img")?.getAttribute("src") ?? "")).toContain(
        imageSrc,
      );
    });
  });

  it("filters the cards by category", () => {
    openMenu();
    const [featured, ...categories] = SERVICES_MENU.filters;

    expect(screen.getByRole("button", { name: featured!.label })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    categories.forEach(({ label, category }) => {
      fireEvent.click(screen.getByRole("button", { name: label }));

      expect(screen.getByRole("button", { name: label })).toHaveAttribute("aria-pressed", "true");
      expect(cardNames()).toEqual(
        SERVICES.filter((service) => service.category === category).map(({ name }) => name),
      );
    });

    fireEvent.click(screen.getByRole("button", { name: featured!.label }));
    expect(cardNames()).toHaveLength(SERVICES.length);
  });

  it("links to the full services page", () => {
    openMenu();

    const { label, href } = SERVICES_MENU.action;
    expect(within(panel()).getByRole("link", { name: label })).toHaveAttribute("href", href);
  });

  it("closes on Escape and returns focus to the trigger", () => {
    openMenu();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger()).toHaveFocus();
  });

  it("closes when clicking outside the navbar", () => {
    openMenu();

    fireEvent.pointerDown(document.body);

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("stays open when clicking inside the panel", () => {
    openMenu();

    fireEvent.pointerDown(panel());

    expect(trigger()).toHaveAttribute("aria-expanded", "true");
  });

  it("closes when a link in the panel is followed", () => {
    openMenu();

    fireEvent.click(within(cardList()).getByRole("link", { name: SERVICES[0]!.name }));

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when the page scrolls down", () => {
    openMenu();

    act(() => {
      setScrollY(400);
      fireEvent.scroll(window);
    });

    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  describe("carousel arrows", () => {
    const scrollBy = vi.fn<(options: ScrollToOptions) => void>();

    beforeAll(() => {
      HTMLElement.prototype.scrollBy = scrollBy as HTMLElement["scrollBy"];
    });
    afterEach(() => scrollBy.mockClear());

    it("shows only the arrows that lead somewhere and scrolls one page per click", () => {
      openMenu();
      const list = cardList();

      expect(screen.queryByRole("button", { name: "Next services" })).toBeNull();

      fakeScroll(list, 0);
      expect(screen.queryByRole("button", { name: "Previous services" })).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: "Next services" }));
      expect(scrollBy).toHaveBeenLastCalledWith({ left: 600 });

      fakeScroll(list, 1200);
      expect(screen.queryByRole("button", { name: "Next services" })).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: "Previous services" }));
      expect(scrollBy).toHaveBeenLastCalledWith({ left: -600 });
    });
  });
});

/** Fakes an 1800px-wide card row in a 600px viewport (jsdom has no layout). */
function fakeScroll(list: HTMLElement, scrollLeft: number) {
  const metrics = { scrollLeft, scrollWidth: 1800, clientWidth: 600 };
  Object.entries(metrics).forEach(([key, value]) =>
    Object.defineProperty(list, key, { value, configurable: true }),
  );
  fireEvent.scroll(list);
}

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", { value, configurable: true });
}
