import { downloads } from "@/config/downloads";

export const CATALOG_ASSETS = {
  hero: "/images/Catalog/portfolio/portfolio-3.jpg",
  finale: "/images/Catalog/portfolio/portfolio-8.jpg",
} as const;

export const CATALOG_PDF = downloads.catalog.href;
export const CATALOG_PDF_FILENAME = downloads.catalog.filename;
