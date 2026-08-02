# Content Model

Status legend: **confirmed** | **placeholder** | **pending confirmation**

## Product category

| Field | Required | Status | Purpose |
|-------|----------|--------|---------|
| `slug` | Yes | confirmed | URL segment |
| `nameAr`, `nameEn` | Yes | confirmed | Localized category name |
| `descriptionAr`, `descriptionEn` | No | confirmed | Short description |
| `image` | No | placeholder | Category thumbnail |

File: [`src/data/products.ts`](src/data/products.ts)

## Product

| Field | Required | Status | Purpose |
|-------|----------|--------|---------|
| `id`, `slug`, `categorySlug` | Yes | placeholder | Identity and routing |
| `name`, `summary`, `description` | Yes/No | placeholder | Localized content |
| `thumbnail`, `images` | Yes | placeholder | Media |
| `isAvailable`, `isFeatured` | Yes/No | placeholder | Listing flags |
| `specifications` | No | pending | Technical specs |
| `applications`, `claimIds` | No | pending | Use cases and verified claims |

## Catalog item

| Field | Required | Status | Purpose |
|-------|----------|--------|---------|
| `id`, `slug`, `code` | Yes | placeholder | Identity and search |
| `name`, `description` | Yes/No | placeholder | Localized content |
| `categorySlug` | Yes | placeholder | Filter by category |
| `finish`, `colorFamily`, `productType` | No | placeholder | Filters |
| `material` | Yes | confirmed | Always `WPC` |
| `thumbnail`, `images` | Yes | placeholder | Media |
| `isAvailable`, `isFeatured` | Yes/No | placeholder | Listing flags |
| `specifications`, `seo` | No | pending | Detail page / SEO |

File: [`src/data/catalog.ts`](src/data/catalog.ts)

## Project

| Field | Required | Status | Purpose |
|-------|----------|--------|---------|
| `id`, `slug` | Yes | placeholder | Identity |
| `title`, `summary` | Yes | placeholder | Localized content |
| `category` | Yes | placeholder | Filter category |
| `city`, `client`, `completionDate` | No | pending | Project metadata |
| `productsUsed`, `scopeOfWork` | No | pending | Detail content |
| `coverImage`, `gallery` | Yes | placeholder | Media |
| `featured` | No | placeholder | Homepage highlight |

File: [`src/data/projects.ts`](src/data/projects.ts)

## Certificate

| Field | Required | Status | Purpose |
|-------|----------|--------|---------|
| `id`, `slug`, `title` | Yes | placeholder | Identity |
| `category` | Yes | placeholder | Filter |
| `issuer`, `issueDate`, `expiryDate`, `documentNumber` | No | pending | Validity metadata |
| `orientation` | Yes | placeholder | Layout in viewer |
| `thumbnail`, `fileUrl` | Yes | placeholder | Preview/download |
| `isActive` | Yes | pending confirmation | Must not be assumed valid |

File: [`src/data/certificates.ts`](src/data/certificates.ts)

## Download file

| Field | Required | Status | Purpose |
|-------|----------|--------|---------|
| `id`, `title`, `category` | Yes | placeholder | Identity and filter |
| `fileUrl`, `fileType` | Yes | placeholder | Download action |
| `fileSize`, `version`, `updatedAt` | No | placeholder | Display metadata |

File: [`src/data/downloads.ts`](src/data/downloads.ts)

## Partner

| Field | Required | Status | Purpose |
|-------|----------|--------|---------|
| `id`, `name`, `logo` | Yes | placeholder | Homepage partners section |
| `website` | No | pending | Optional link |

File: [`src/data/partners.ts`](src/data/partners.ts)

## Product claim

| Field | Required | Status | Purpose |
|-------|----------|--------|---------|
| `id`, `titleAr`, `titleEn` | Yes | mixed | Claim label |
| `descriptionAr`, `descriptionEn` | No | mixed | Supporting text |
| `status` | Yes | required | Verification gate |
| `supportingDocument` | No | pending | Evidence reference |

Statuses: `verified`, `needs-document`, `needs-test-report`, `needs-confirmation`

File: [`src/data/product-claims.ts`](src/data/product-claims.ts)

## Contact submission

| Field | Required | Purpose |
|-------|----------|---------|
| `name`, `email`, `mobile` | Yes | Customer identity |
| `inquiryType`, `message` | Yes | Inquiry details |
| `privacyConsent` | Yes | Legal consent |
| `honeypot` | No | Spam prevention |

Type: [`ContactRequestPayload`](src/types/index.ts)

## Quotation request

| Field | Required | Purpose |
|-------|----------|---------|
| Customer fields | Yes | Contact and project context |
| `orderItems[]` | Yes (min 1) | Product lines |
| `privacyConsent` | Yes | Legal consent |
| `honeypot` | No | Spam prevention |

Order item fields include product/code, quantity, size type, dimensions, finish, notes.

Type: [`QuoteRequestPayload`](src/types/index.ts)
