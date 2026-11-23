import { fireEvent, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ServicesPage, { metadata } from "@/app/(site)/services/page";
import { SERVICES } from "@/constants/services";
import { SERVICES_MENU } from "@/constants/services-menu";

import { renderPage } from "./render-page";

const cardList = () => screen.getByRole("list", { name: "All services" });
const cardNames = () =>
  within(cardList())
    .getAllByRole("heading", { level: 3 })
    .map(({ textContent }) => textContent);

describe("Services page", () => {
  it("renders its heading inside the main landmark, on a light page", () => {
    renderPage(<ServicesPage />);

    const main = screen.getByRole("main");
    expect(main).toContainElement(screen.getByRole("heading", { level: 1, name: "our services" }));
    expect(main.querySelector("[data-light-page]")).not.toBeNull();
  });

  it("has its own title and description", () => {
    expect(metadata.title).toBe("Services");
    expect(metadata.description).toEqual(expect.any(String));
  });

  it("links to every service page", () => {
    renderPage(<ServicesPage />);

    SERVICES.forEach(({ name, href }) =>
      expect(within(cardList()).getByRole("link", { name })).toHaveAttribute("href", href),
    );
  });

  it("filters the services by category, like the desktop menu", () => {
    renderPage(<ServicesPage />);
    const [, ...categories] = SERVICES_MENU.filters;
    const filters = within(screen.getByRole("main")).getByRole("group", {
      name: "Filter services",
    });

    categories.forEach(({ label, category }) => {
      fireEvent.click(within(filters).getByRole("button", { name: label }));

      expect(cardNames()).toEqual(
        SERVICES.filter((service) => service.category === category).map(({ name }) => name),
      );
    });
  });
});
