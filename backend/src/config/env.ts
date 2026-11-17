import { ConfigurationError } from "../errors/index.js";

const NODE_ENVIRONMENTS = ["development", "test", "production"] as const;
const DEFAULT_NODE_ENV: NodeEnvironment = "development";
const DEFAULT_PORT = 4000;
const MAX_PORT = 65535;

export type NodeEnvironment = (typeof NODE_ENVIRONMENTS)[number];

export interface AppConfig {
  readonly nodeEnv: NodeEnvironment;
  readonly port: number;
}

type Environment = Readonly<Record<string, string | undefined>>;

function isNodeEnvironment(value: string): value is NodeEnvironment {
  return (NODE_ENVIRONMENTS as readonly string[]).includes(value);
}

function parseNodeEnv(value: string | undefined): NodeEnvironment {
  if (value === undefined) return DEFAULT_NODE_ENV;
  if (isNodeEnvironment(value)) return value;

  throw new ConfigurationError(
    `NODE_ENV must be one of ${NODE_ENVIRONMENTS.join(", ")}; received "${value}".`,
  );
}

function parsePort(value: string | undefined): number {
  if (value === undefined) return DEFAULT_PORT;

  const port = Number(value);
  if (Number.isInteger(port) && port > 0 && port <= MAX_PORT) return port;

  throw new ConfigurationError(
    `PORT must be an integer between 1 and ${MAX_PORT}; received "${value}".`,
  );
}

/** Validates the raw environment once, at startup, into a typed configuration. */
export function loadConfig(env: Environment): AppConfig {
  return {
    nodeEnv: parseNodeEnv(env.NODE_ENV),
    port: parsePort(env.PORT),
  };
}
