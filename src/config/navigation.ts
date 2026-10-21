import { productCategories } from "@/data/products";
import type { Locale } from "@/types";
import { routes } from "./routes";

export interface NavItem {
  id: string;
  labelKey: string;
  href: () => string;
  children?: NavItem[];
}

export interface ProductFooterLink {
  id: string;
  href: () => string;
  name: { ar: string; en: string };
}

const PRODUCT_CATEGORY_LABEL_KEYS: Record<string, string> = {
  "wpc-doors": "products.categories.wpcDoors",
  "wpc-foam-boards": "products.categories.wpcFoamBoards",
  "decorative-cladding": "products.categories.decorativeCladding",
  "decorative-profiles": "products.categories.decorativeProfiles",
};

/** Canonical product destinations used by the site (catalog for doors/boards). */
function productCategoryHref(slug: string): string {
  if (slug === "wpc-doors") return routes.catalogDoors();
  if (slug === "wpc-foam-boards") return routes.catalogBoards();
  return routes.productCategory(slug);
}

export const mainNavigation: NavItem[] = [
  { id: "home", labelKey: "nav.home", href: routes.home },
  { id: "about", labelKey: "nav.about", href: routes.about },
  {
    id: "products",
    labelKey: "nav.products",
    href: routes.products,
    children: productCategories.map((category) => ({
      id: category.slug,
      labelKey: PRODUCT_CATEGORY_LABEL_KEYS[category.slug] ?? "nav.products",
      href: () => productCategoryHref(category.slug),
    })),
  },
  { id: "catalog", labelKey: "nav.catalog", href: routes.catalog },
  { id: "projects", labelKey: "nav.projects", href: routes.projects },
  { id: "gallery", labelKey: "nav.gallery", href: routes.gallery },
  { id: "videos", labelKey: "nav.videos", href: routes.videos },
  { id: "certificates", labelKey: "nav.certificates", href: routes.certificates },
  { id: "contact", labelKey: "nav.contact", href: routes.contact },
];

export const footerNavigation: NavItem[] = [
  { id: "home", labelKey: "nav.home", href: routes.home },
  { id: "about", labelKey: "nav.about", href: routes.about },
  { id: "products", labelKey: "nav.products", href: routes.products },
  { id: "catalog", labelKey: "nav.catalog", href: routes.catalog },
  { id: "projects", labelKey: "nav.projects", href: routes.projects },
  { id: "gallery", labelKey: "nav.gallery", href: routes.gallery },
  { id: "videos", labelKey: "nav.videos", href: routes.videos },
  { id: "certificates", labelKey: "nav.certificates", href: routes.certificates },
  { id: "contact", labelKey: "nav.contact", href: routes.contact },
  { id: "requestQuote", labelKey: "nav.requestQuote", href: routes.requestQuote },
];

export const legalNavigation: NavItem[] = [
  { id: "privacy", labelKey: "nav.privacyPolicy", href: routes.privacyPolicy },
  { id: "terms", labelKey: "nav.terms", href: routes.terms },
];

const FOOTER_PRODUCT_SLUGS = new Set(["wpc-doors", "wpc-foam-boards"]);

/** Footer products — doors & boards only (from `productCategories`). */
export const productFooterLinks: ProductFooterLink[] = productCategories
  .filter((category) => FOOTER_PRODUCT_SLUGS.has(category.slug))
  .map((category) => ({
    id: category.slug,
    href: () => productCategoryHref(category.slug),
    name: { ar: category.nameAr, en: category.nameEn },
  }));

export function getProductFooterLabel(link: ProductFooterLink, locale: Locale): string {
  return link.name[locale];
}
