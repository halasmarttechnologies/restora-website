import { describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";

describe("createApp", () => {
  it("builds the application context from the environment", () => {
    const app = createApp({ NODE_ENV: "test", PORT: "5000" });

    expect(app.config).toEqual({ nodeEnv: "test", port: 5000 });
  });
});
