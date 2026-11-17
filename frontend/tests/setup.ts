import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// jsdom does not implement media playback; give `play()` its browser shape (a promise).
vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();

afterEach(() => {
  cleanup();
});
