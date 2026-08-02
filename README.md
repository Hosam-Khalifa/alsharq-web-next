# Near East WPC Factory Website

Modern bilingual (Arabic/English) website foundation for **Near East WPC Factory** (مصنع الشرق الأدنى WPC), built with Next.js App Router.

## Technology stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- next-intl (Arabic default, English secondary)
- next-themes (Light / Dark / System)
- React Hook Form + Zod
- Lucide React (temporary icons)

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000/ar](http://localhost:3000/ar) or [http://localhost:3000/en](http://localhost:3000/en).

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript (`tsc --noEmit`) |
| `npm run format` | Format with Prettier |

## Environment variables

See [`.env.example`](.env.example). Do not commit real secrets.

## How to add a page

1. Add route path to [`src/config/routes.ts`](src/config/routes.ts) and `staticPaths` if static.
2. Add navigation entry in [`src/config/navigation.ts`](src/config/navigation.ts) if needed.
3. Create page under `src/app/[locale]/your-page/page.tsx`.
4. Add translations to [`src/dictionaries/ar.json`](src/dictionaries/ar.json) and [`src/dictionaries/en.json`](src/dictionaries/en.json).
5. Export `generateMetadata` using [`src/lib/metadata/generate-page-metadata.ts`](src/lib/metadata/generate-page-metadata.ts).

## How to add a translation

Add keys to both `src/dictionaries/ar.json` and `src/dictionaries/en.json`, then use `getTranslations()` (server) or `useTranslations()` (client).

## How to add content

| Content type | File |
|--------------|------|
| Company info | [`src/config/company.ts`](src/config/company.ts) |
| Products | [`src/data/products.ts`](src/data/products.ts) |
| Catalog items | [`src/data/catalog.ts`](src/data/catalog.ts) |
| Projects | [`src/data/projects.ts`](src/data/projects.ts) |
| Certificates | [`src/data/certificates.ts`](src/data/certificates.ts) |
| Downloads | [`src/data/downloads.ts`](src/data/downloads.ts) |
| Product claims | [`src/data/product-claims.ts`](src/data/product-claims.ts) |

See [`CONTENT_MODEL.md`](CONTENT_MODEL.md) for field definitions.

## Themes

Semantic CSS variables are defined in [`src/app/globals.css`](src/app/globals.css). Theme switching uses `next-themes` via [`src/providers/theme-provider.tsx`](src/providers/theme-provider.tsx).

## Localization

- Default locale: `ar`
- URL structure: `/ar/...`, `/en/...`
- RTL for Arabic, LTR for English
- Middleware: [`src/middleware.ts`](src/middleware.ts)
- Routing utilities: [`src/i18n/routing.ts`](src/i18n/routing.ts)

## Forms

- Contact: [`src/components/forms/contact-form`](src/components/forms/contact-form) → `/api/contact`
- Quote: [`src/components/forms/quote-form`](src/components/forms/quote-form) → `/api/quote`
- Validation: [`src/lib/validation/schemas.ts`](src/lib/validation/schemas.ts)
- Services: [`src/services/`](src/services/) (mock implementations during foundation phase)

## Current limitations

- Placeholder/sample business content in data files
- Mock form submission services (no real email provider)
- No final visual design system
- Many TODO items documented in [`PROJECT_TODO.md`](PROJECT_TODO.md)
- Unverified product claims gated in [`src/data/product-claims.ts`](src/data/product-claims.ts)

## Documentation

- [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) — folder responsibilities
- [`CONTENT_MODEL.md`](CONTENT_MODEL.md) — data models
- [`PROJECT_TODO.md`](PROJECT_TODO.md) — pending items and confirmations
