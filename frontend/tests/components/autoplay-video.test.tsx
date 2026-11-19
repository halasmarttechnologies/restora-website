import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AutoplayVideo } from "@/components/autoplay-video";

// `play` and `pause` are stubbed in tests/setup.ts because jsdom has no media playback.
const play = vi.mocked(HTMLMediaElement.prototype.play);

/** Replaces IntersectionObserver with one the test can trigger by hand. */
function mockIntersectionObserver() {
  let notify: (visible: boolean) => void = () => {};
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        notify = (visible) =>
          callback([{ isIntersecting: visible } as IntersectionObserverEntry], this as never);
      }
      observe() {}
      disconnect() {}
    },
  );
  return (visible: boolean) => act(() => notify(visible));
}

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce, media: query }));
}

describe("AutoplayVideo", () => {
  beforeEach(() => play.mockClear());
  afterEach(() => vi.unstubAllGlobals());

  it("is muted, looping and inline, and hidden from screen readers when decorative", () => {
    const { container } = render(<AutoplayVideo src="/videos/a.mp4" />);

    const video = container.querySelector("video")!;
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video).toHaveAttribute("playsinline");
    expect(video).toHaveAttribute("aria-hidden", "true");
  });

  it("is announced by its label when it is content", () => {
    render(<AutoplayVideo src="/videos/a.mp4" label="A relaxing massage" />);

    expect(screen.getByLabelText("A relaxing massage").tagName).toBe("VIDEO");
  });

  it("loads lazily, showing its first frame until it plays", () => {
    const { container } = render(<AutoplayVideo src="/videos/a.mp4" />);

    const video = container.querySelector("video")!;
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).toHaveAttribute("src", "/videos/a.mp4#t=0.1");
    expect(video.autoplay).toBe(false);
  });

  it("starts loading straight away when eager (above the fold)", () => {
    const { container } = render(<AutoplayVideo src="/videos/a.mp4" eager />);

    const video = container.querySelector("video")!;
    expect(video).toHaveAttribute("preload", "auto");
    expect(video.autoplay).toBe(true);
  });

  it("plays only while on screen", () => {
    const setVisible = mockIntersectionObserver();
    render(<AutoplayVideo src="/videos/a.mp4" />);
    expect(play).not.toHaveBeenCalled();

    setVisible(true);
    expect(play).toHaveBeenCalledTimes(1);
  });

  it("does not start by itself when the visitor prefers reduced motion", () => {
    mockReducedMotion(true);
    render(<AutoplayVideo src="/videos/a.mp4" />);

    expect(play).not.toHaveBeenCalled();
  });

  it("offers a play / pause button", () => {
    mockReducedMotion(true);
    render(<AutoplayVideo src="/videos/a.mp4" />);

    fireEvent.click(screen.getByRole("button", { name: "Play video" }));

    expect(play).toHaveBeenCalledTimes(1);
  });
});
