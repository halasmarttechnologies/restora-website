import { loadConfig } from "./config/env.js";
import type { AppConfig } from "./config/env.js";

export interface App {
  readonly config: AppConfig;
}

/**
 * Composition root. Future modules (services, repositories, transport layer)
 * are wired together here once the backend framework is selected.
 */
export function createApp(env: Readonly<Record<string, string | undefined>> = process.env): App {
  return { config: loadConfig(env) };
}
