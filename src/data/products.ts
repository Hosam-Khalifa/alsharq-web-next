import type { LocalizedString } from "@/types";

export interface ProductCategory {
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  categorySlug: string;
  name: LocalizedString;
  summary: LocalizedString;
  description?: LocalizedString;
  thumbnail: string;
  images: string[];
  isAvailable: boolean;
  isFeatured?: boolean;
  specifications?: Record<string, string | number>;
  applications?: string[];
  claimIds?: string[];
}

export const productCategories: ProductCategory[] = [
  {
    slug: "wpc-doors",
    nameAr: "أبواب WPC",
    nameEn: "WPC Doors",
    descriptionAr: "أبواب WPC بتصاميم متعددة وجودة عالية.",
    descriptionEn: "WPC doors with multiple designs and high quality.",
    image: "/images/placeholders/product-category-doors.svg",
  },
  {
    slug: "wpc-foam-boards",
    nameAr: "ألواح WPC",
    nameEn: "WPC Foam Boards",
    descriptionAr: "ألواح WPC للتطبيقات الداخلية والتشطيب.",
    descriptionEn: "WPC boards for interior and finishing applications.",
    image: "/images/placeholders/product-category-boards.svg",
  },
  {
    slug: "decorative-cladding",
    nameAr: "كسوات الديكور",
    nameEn: "Decorative Cladding",
    descriptionAr: "كسوات ديكور بخيارات ألوان وتشطيبات متنوعة.",
    descriptionEn: "Decorative cladding with diverse colors and finishes.",
    image: "/images/placeholders/product-category-cladding.svg",
  },
  {
    slug: "decorative-profiles",
    nameAr: "قطاعات الديكور",
    nameEn: "Decorative Profiles",
    descriptionAr: "قطاعات ديكور تناسب المشاريع السكنية والتجارية.",
    descriptionEn: "Decorative profiles for residential and commercial projects.",
    image: "/images/placeholders/product-category-profiles.svg",
  },
];

// Sample products — not final company data
export const products: Product[] = [
  {
    id: "sample-door-001",
    slug: "sample-wpc-door",
    categorySlug: "wpc-doors",
    name: { ar: "[عينة] باب WPC", en: "[Sample] WPC Door" },
    summary: {
      ar: "منتج تجريبي — يتطلب استبداله ببيانات رسمية.",
      en: "Sample product — replace with official data.",
    },
    thumbnail: "/images/placeholders/product.svg",
    images: ["/images/placeholders/product.svg"],
    isAvailable: true,
    isFeatured: true,
    claimIds: ["moisture-resistance", "termite-resistance"],
  },
  {
    id: "sample-cladding-001",
    slug: "sample-cladding",
    categorySlug: "decorative-cladding",
    name: { ar: "[عينة] كسوة ديكور", en: "[Sample] Decorative Cladding" },
    summary: {
      ar: "منتج تجريبي — يتطلب استبداله ببيانات رسمية.",
      en: "Sample product — replace with official data.",
    },
    thumbnail: "/images/placeholders/product.svg",
    images: ["/images/placeholders/product.svg"],
    isAvailable: true,
    claimIds: ["multiple-finishes"],
  },
];

export function getCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductBySlug(categorySlug: string, productSlug: string) {
  return products.find(
    (product) => product.categorySlug === categorySlug && product.slug === productSlug,
  );
}
