import { existsSync } from "node:fs";
import { join } from "node:path";

import { screen } from "@testing-library/react";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";

import DeepTissuePage, { metadata as deepTissue } from "@/app/(site)/services/deep-tissue/page";
import PrenatalPage, { metadata as prenatal } from "@/app/(site)/services/prenatal/page";
import ReflexologyPage, { metadata as reflexology } from "@/app/(site)/services/reflexology/page";
import SignatureRestoraPage, {
  metadata as signatureRestora,
} from "@/app/(site)/services/signature-restora/page";
import SportsRecoveryPage, {
  metadata as sportsRecovery,
} from "@/app/(site)/services/sports-recovery/page";
import SwedishRelaxationPage, {
  metadata as swedishRelaxation,
} from "@/app/(site)/services/swedish-relaxation/page";
import { FEATURED_SERVICES, SERVICES } from "@/constants/services";
import { createServicePage } from "@/constants/services/create-service-page";

import { renderPage } from "./render-page";

const PAGES: [string, () => ReactElement, Metadata][] = [
  ["Deep Tissue", () => <DeepTissuePage />, deepTissue],
  ["Swedish Relaxation", () => <SwedishRelaxationPage />, swedishRelaxation],
  ["Sports Recovery", () => <SportsRecoveryPage />, sportsRecovery],
  ["Prenatal", () => <PrenatalPage />, prenatal],
  ["Signature Restora", () => <SignatureRestoraPage />, signatureRestora],
  ["Reflexology", () => <ReflexologyPage />, reflexology],
];

describe.each(PAGES)("%s page", (name, page, metadata) => {
  it("renders the service name as the page heading inside main", () => {
    renderPage(page());

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { level: 1, name }),
    );
  });

  it("uses the service name as its title", () => {
    expect(metadata.title).toBe(name);
    expect(metadata.description).toEqual(expect.any(String));
  });
});

describe("service links", () => {
  // Tests run from the frontend workspace root.
  const pageExists = (href: string) =>
    existsSync(join(process.cwd(), "src", "app", "(site)", href, "page.tsx"));

  it("gives every service on the menu its own page folder", () => {
    SERVICES.forEach(({ href }) => expect(pageExists(href), href).toBe(true));
  });

  it("points every home-page service card at an existing page", () => {
    FEATURED_SERVICES.forEach(({ href }) => expect(pageExists(href), href).toBe(true));
  });
});

describe("createServicePage", () => {
  const own = {
    durations: [60],
    tagline: "Tagline",
    specs: [],
    feelings: ["a", "b", "c"],
    details: [],
    pairings: [],
  } as const;

  it.each(SERVICES.map(({ href }) => href.replace("/services/", "")))(
    "never repeats the %s hero photo in the rows below",
    (slug) => {
      const page = createServicePage(slug, own);

      expect(Object.values(page.images)).not.toContain(page.service.imageSrc);
    },
  );

  it("fails loudly for a slug that is not on the menu", () => {
    expect(() => createServicePage("not-a-service", own)).toThrow(/not-a-service/);
  });

  it("fails loudly for a pairing that is not on the menu", () => {
    expect(() => createServicePage("deep-tissue", { ...own, pairings: ["nope"] })).toThrow(/nope/);
  });
});
