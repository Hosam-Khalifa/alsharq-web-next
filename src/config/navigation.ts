import { routes } from "./routes";

export interface NavItem {
  id: string;
  labelKey: string;
  href: () => string;
  children?: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { id: "home", labelKey: "nav.home", href: routes.home },
  { id: "about", labelKey: "nav.about", href: routes.about },
  {
    id: "products",
    labelKey: "nav.products",
    href: routes.products,
    children: [
      { id: "wpc-doors", labelKey: "products.categories.wpcDoors", href: () => routes.productCategory("wpc-doors") },
      { id: "wpc-foam-boards", labelKey: "products.categories.wpcFoamBoards", href: () => routes.productCategory("wpc-foam-boards") },
      { id: "decorative-cladding", labelKey: "products.categories.decorativeCladding", href: () => routes.productCategory("decorative-cladding") },
      { id: "decorative-profiles", labelKey: "products.categories.decorativeProfiles", href: () => routes.productCategory("decorative-profiles") },
    ],
  },
  { id: "catalog", labelKey: "nav.catalog", href: routes.catalog },
  { id: "projects", labelKey: "nav.projects", href: routes.projects },
  { id: "gallery", labelKey: "nav.gallery", href: routes.gallery },
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
  { id: "certificates", labelKey: "nav.certificates", href: routes.certificates },
  { id: "contact", labelKey: "nav.contact", href: routes.contact },
  { id: "requestQuote", labelKey: "nav.requestQuote", href: routes.requestQuote },
];

export const legalNavigation: NavItem[] = [
  { id: "privacy", labelKey: "nav.privacyPolicy", href: routes.privacyPolicy },
  { id: "terms", labelKey: "nav.terms", href: routes.terms },
];

export const productFooterLinks = mainNavigation.find((item) => item.id === "products")?.children ?? [];
