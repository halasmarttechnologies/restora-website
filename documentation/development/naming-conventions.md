# Naming Conventions

| Item                   | Convention              | Example                          |
| ---------------------- | ----------------------- | -------------------------------- |
| Folders                | kebab-case, lowercase   | `components/booking-form/`       |
| Component files        | kebab-case, lowercase   | `booking-form.tsx`               |
| Component type files   | `<name>.types.ts`       | `booking-form.types.ts`          |
| Barrel files           | `index.ts`              | `components/hero/index.ts`       |
| React components       | PascalCase              | `export function BookingForm()`  |
| Functions, variables   | camelCase               | `loadConfig`, `siteConfig`       |
| Module-level constants | SCREAMING_SNAKE_CASE    | `SITE_NAME`, `DEFAULT_PORT`      |
| Types, interfaces      | PascalCase              | `AppConfig`, `HeroProps`         |
| Error classes          | PascalCase + `Error`    | `ConfigurationError`             |
| Error codes            | SCREAMING_SNAKE_CASE    | `CONFIGURATION_ERROR`            |
| Test files             | `<subject>.test.ts(x)`  | `tests/components/hero.test.tsx` |
| CSS design tokens      | `--color-*`, `--font-*` | `--color-background`             |

Exports are **named**, except where Next.js or a tool requires a default export (`page.tsx`,
`layout.tsx`, config files).
