/**
 * App pathnames without a locale prefix.
 * Use with `Link` / `router` from `@/i18n/routing` — next-intl adds the locale automatically.
 */
export const routes = {
  home: () => "/",
  about: () => "/about",
  products: () => "/products",
  productCategory: (categorySlug: string) => `/products/${categorySlug}`,
  productDetail: (categorySlug: string, productSlug: string) =>
    `/products/${categorySlug}/${productSlug}`,
  projectDetail: (projectSlug: string) => `/projects/${projectSlug}`,
  catalog: () => "/catalog",
  catalogDoors: () => "/catalog/doors",
  catalogBoards: () => "/catalog/boards",
  projects: () => "/projects",
  gallery: () => "/gallery",
  certificates: () => "/certificates",
  requestQuote: (options?: { category?: "doors" | "boards"; product?: string }) => {
    const params = new URLSearchParams();
    if (options?.category) params.set("category", options.category);
    if (options?.product) params.set("product", options.product);
    const query = params.toString();
    return query ? `/request-quote?${query}` : "/request-quote";
  },
  contact: () => "/contact",
  privacyPolicy: () => "/privacy-policy",
  terms: () => "/terms",
} as const;

/** Locale-prefixed path for canonical URLs, sitemap, and external links only. */
export function localizedPath(locale: string, pathname: string): string {
  if (pathname === "/") {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}

export const staticPaths = [
  "",
  "/about",
  "/products",
  "/catalog",
  "/catalog/doors",
  "/catalog/boards",
  "/projects",
  "/gallery",
  "/certificates",
  "/request-quote",
  "/contact",
  "/privacy-policy",
  "/terms",
] as const;
