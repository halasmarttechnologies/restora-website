# API Guidelines

> No API exists in Phase 01. These guidelines govern the API once it is introduced.

- **Style:** JSON over HTTPS, resource-oriented REST, plural nouns (`/v1/bookings`).
- **Versioning:** URL prefix (`/v1`). Breaking changes require a new version.
- **Validation:** every request body, query and parameter is validated at the boundary in
  `validators/` before reaching a service.
- **Errors:** a single error middleware maps `AppError` subclasses to responses:

  ```json
  { "error": { "code": "BOOKING_NOT_FOUND", "message": "Booking not found." } }
  ```

  Unknown errors return `500` with code `INTERNAL_ERROR` and never leak stack traces.

- **Status codes:** 200/201/204 success; 400 validation; 401/403 auth; 404 not found;
  409 conflict; 422 business-rule violation; 500 unexpected.
- **Contracts:** request and response types are defined once and shared with the frontend via a
  dedicated workspace package when needed, never by cross-importing application code.
