import { describe, expect, it } from "vitest";

import { loadConfig } from "../src/config/env.js";
import { AppError, ConfigurationError } from "../src/errors/index.js";

describe("loadConfig", () => {
  it("applies defaults when variables are absent", () => {
    expect(loadConfig({})).toEqual({ nodeEnv: "development", port: 4000 });
  });

  it("reads valid values from the environment", () => {
    expect(loadConfig({ NODE_ENV: "production", PORT: "8080" })).toEqual({
      nodeEnv: "production",
      port: 8080,
    });
  });

  it.each(["staging", "PROD", ""])("rejects unsupported NODE_ENV %j", (nodeEnv) => {
    expect(() => loadConfig({ NODE_ENV: nodeEnv })).toThrow(ConfigurationError);
  });

  it.each(["abc", "0", "70000", "80.5", "-1"])("rejects invalid PORT %j", (port) => {
    expect(() => loadConfig({ PORT: port })).toThrow(ConfigurationError);
  });
});

describe("ConfigurationError", () => {
  it("is an AppError with a stable code", () => {
    const error = new ConfigurationError("bad config");

    expect(error).toBeInstanceOf(AppError);
    expect(error.code).toBe("CONFIGURATION_ERROR");
    expect(error.name).toBe("ConfigurationError");
    expect(error.message).toBe("bad config");
  });
});
