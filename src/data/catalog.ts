export interface CatalogFinish {
  id: string;
  code: string;
  slug: string;
  name: { ar: string; en: string };
  doorImage: string;
  swatchImage: string;
  isAvailable: boolean;
}

export interface CatalogPortfolioItem {
  id: string;
  src: string;
  alt: { ar: string; en: string };
}

const CATALOG_BASE = "/images/Catalog";

const FINISH_CODES = [
  "SHD-593",
  "SHD-599",
  "SHD-600",
  "SHD-601",
  "SHD-603",
  "SHD-605",
  "SHD-606",
  "SHD-611",
  "SHD-612",
  "SHD-621",
  "SHD-630",
  "SHD-638",
  "SHD-651",
  "SHD-666",
  "SHD-674",
  "SHD-696",
  "SHD-806",
  "SHD-808",
  "SHD-818",
  "SHD-820",
  "SHD-1026",
] as const;

export const CATALOG_BASE_DOOR = `${CATALOG_BASE}/door/base-door.jpg`;

export const catalogFinishes: CatalogFinish[] = FINISH_CODES.map((code) => ({
  id: code.toLowerCase(),
  code,
  slug: code.toLowerCase(),
  name: {
    ar: `تشطيب ${code}`,
    en: `${code} finish`,
  },
  doorImage: `${CATALOG_BASE}/door/${code}.jpg`,
  swatchImage: `${CATALOG_BASE}/swatch/${code}.jpg`,
  isAvailable: true,
}));

export const catalogPortfolio: CatalogPortfolioItem[] = Array.from(
  { length: 12 },
  (_, index) => {
    const n = index + 1;
    return {
      id: `portfolio-${n}`,
      src: `${CATALOG_BASE}/portfolio/portfolio-${n}.jpg`,
      alt: {
        ar: `مشروع من كتالوج الشرق الأدنى ${n}`,
        en: `Near East catalog project ${n}`,
      },
    };
  },
);

/** @deprecated Kept for any legacy imports; prefer catalogFinishes */
export type CatalogItem = CatalogFinish & {
  categorySlug: string;
  description?: { ar: string; en: string };
  thumbnail: string;
  images: string[];
  material: "WPC";
};

export const catalogItems: CatalogItem[] = catalogFinishes.map((finish) => ({
  ...finish,
  categorySlug: "wpc-doors",
  description: {
    ar: `تشطيب باب WPC برمز ${finish.code}.`,
    en: `WPC door finish code ${finish.code}.`,
  },
  thumbnail: finish.swatchImage,
  images: [finish.doorImage, finish.swatchImage],
  material: "WPC" as const,
}));

export const catalogColorFamilies = [
  { id: "wood", ar: "خشبي", en: "Wood" },
  { id: "neutral", ar: "محايد", en: "Neutral" },
];

export const catalogFinishTypes = [
  { id: "wood-grain", ar: "خشبي", en: "Wood grain" },
];

export function getCatalogFinishByCode(code: string) {
  return catalogFinishes.find(
    (finish) => finish.code.toLowerCase() === code.toLowerCase(),
  );
}

export function getCatalogItemBySlug(slug: string) {
  return catalogItems.find((item) => item.slug === slug);
}
