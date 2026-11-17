import { AppError } from "./app-error.js";

export class ConfigurationError extends AppError {
  readonly code = "CONFIGURATION_ERROR";
}
