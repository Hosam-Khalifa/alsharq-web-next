import { downloads } from "@/config/downloads";

export const PRODUCTS_ASSETS = {
  hero: "/images/Products/Products-bg-1.webp",
  panels: "/images/Products/Products-bg-3.webp",
} as const;

export const PRODUCTS_CATALOG_PDF = downloads.catalog.href;
export const PRODUCTS_CATALOG_PDF_FILENAME = downloads.catalog.filename;

export const PRODUCTS_DOOR_PREVIEWS = [
  {
    id: "shd593",
    src: "/images/Products/door-shd593.png",
    labelKey: "doorPreviewGreyWood",
  },
  {
    id: "shd601",
    src: "/images/Products/door-shd601.png",
    labelKey: "doorPreviewDarkBrown",
  },
  {
    id: "shd605",
    src: "/images/Products/door-shd605.png",
    labelKey: "doorPreviewWarmBeige",
  },
] as const;
