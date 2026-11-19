import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom does not implement media playback; give `play()` its browser shape (a promise) and
// make `pause()` a no-op instead of a "not implemented" error.
vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});

afterEach(() => {
  cleanup();
});
