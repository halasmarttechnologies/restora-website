/**
 * Base class for every expected, domain-level error raised by the backend.
 * Centralized error handling maps `code` to a transport-specific response.
 */
export abstract class AppError extends Error {
  abstract readonly code: string;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}
