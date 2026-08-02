# Project Structure

## Top-level

| Path | Responsibility |
|------|----------------|
| `src/app/` | Next.js App Router pages, layouts, API routes, SEO files |
| `src/components/` | UI, layout, domain, and form components |
| `src/config/` | Centralized company, navigation, routes, site settings |
| `src/data/` | CMS-ready placeholder business data |
| `src/dictionaries/` | Arabic and English translation JSON files |
| `src/i18n/` | next-intl routing and request configuration |
| `src/lib/` | Metadata, validation, utilities, constants |
| `src/services/` | Form submission and email service abstractions |
| `src/types/` | Shared TypeScript types |
| `src/providers/` | React context providers (theme, etc.) |
| `src/middleware.ts` | Locale detection and routing |
| `public/` | Static assets |

## Components

```
src/components/
├── layout/       Header, footer, navigation, theme/language switchers
├── shared/       Reusable page sections (hero, CTA, modal, etc.)
├── ui/           Primitive UI elements
├── home/         Homepage sections (composed in page for foundation phase)
├── products/     Product listing components
├── catalog/      Catalog search/filter UI
├── projects/     Project gallery components
├── certificates/ Certificate listing components
├── downloads/    Download listing components
└── forms/        Contact and quote forms
```

## Routing

All user-facing pages live under `src/app/[locale]/`:

- `/` — Homepage
- `/about`, `/products`, `/catalog`, `/projects`, `/certificates`, `/downloads`
- `/request-quote`, `/contact`
- `/privacy-policy`, `/terms`
- Dynamic: `/products/[categorySlug]`, `/products/[categorySlug]/[productSlug]`, `/projects/[projectSlug]`

API routes: `src/app/api/contact`, `src/app/api/quote`

## Internationalization

- Config: `src/i18n/routing.ts`, `src/i18n/request.ts`
- Locale-aware navigation: import `Link`, `useRouter`, `usePathname` from `@/i18n/routing`
- Utilities: `src/lib/i18n/locale-utils.ts`

## Data organization

Business content is stored in typed data files under `src/data/`. UI components read from these files — not hardcoded strings for translatable or reusable content.

Company contact details are only stored in `src/config/company.ts`.

## Validation

Zod schemas in `src/lib/validation/schemas.ts` are used by forms (client) and API routes (server).

## Services

Service interfaces decouple forms from email/DB providers. Current implementations are mocks in `src/services/`.
