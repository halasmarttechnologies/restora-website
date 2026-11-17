import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Hero } from "@/components/hero";
import type { HeroProps } from "@/components/hero";

const content: HeroProps = {
  eyebrow: "Test eyebrow",
  heading: "Test heading",
  action: { label: "Test action", href: "/test" },
};

describe("Hero", () => {
  it("renders the eyebrow and the heading as the page's h1", () => {
    render(<Hero {...content} />);

    expect(screen.getByText("Test eyebrow")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "Test heading" })).toBeInTheDocument();
  });

  it("renders the call to action as a link", () => {
    render(<Hero {...content} />);

    expect(screen.getByRole("link", { name: "Test action" })).toHaveAttribute("href", "/test");
  });

  it("is a region labelled by its heading", () => {
    render(<Hero {...content} />);

    expect(screen.getByRole("region", { name: "Test heading" })).toBeInTheDocument();
  });

  it("renders a placeholder instead of a video when no video is supplied", () => {
    const { container } = render(<Hero {...content} />);

    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("[data-hero-placeholder]")).not.toBeNull();
  });

  it("renders a muted, looping, inline background video when supplied", () => {
    const { container } = render(
      <Hero {...content} video={{ src: "/videos/hero.mp4", posterSrc: "/images/poster.jpg" }} />,
    );

    const video = container.querySelector("video");

    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("src", "/videos/hero.mp4");
    expect(video).toHaveAttribute("poster", "/images/poster.jpg");
    expect(video?.muted).toBe(true);
    expect(video?.loop).toBe(true);
    expect(video?.autoplay).toBe(true);
    expect(video).toHaveAttribute("playsinline");
    expect(container.querySelector("[data-hero-placeholder]")).toBeNull();
  });

  describe("video playback", () => {
    const video = { src: "/videos/hero.mp4" };
    // `play` is stubbed in tests/setup.ts because jsdom has no media playback.
    const play = vi.mocked(HTMLMediaElement.prototype.play);

    beforeEach(() => play.mockClear());

    it("starts playing as soon as it mounts", () => {
      render(<Hero {...content} video={video} />);

      expect(play).toHaveBeenCalledTimes(1);
    });

    it("resumes playing when the page becomes visible again", () => {
      render(<Hero {...content} video={video} />);

      setVisibility("hidden");
      setVisibility("visible");

      expect(play).toHaveBeenCalledTimes(2);
    });

    it("does not throw when the browser blocks playback", async () => {
      play.mockRejectedValueOnce(new DOMException("Blocked", "NotAllowedError"));

      expect(() => render(<Hero {...content} video={video} />)).not.toThrow();
      await Promise.resolve();
    });
  });
});

function setVisibility(state: DocumentVisibilityState) {
  Object.defineProperty(document, "visibilityState", { value: state, configurable: true });
  fireEvent(document, new Event("visibilitychange"));
}
