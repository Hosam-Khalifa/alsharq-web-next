import { brandAssets } from "./brand-assets";
import { company } from "./company";

export const locales = ["ar", "en"] as const;
export const defaultLocale = "ar" as const;

export const site = {
  name: company.name,
  url: process.env.NEXT_PUBLIC_SITE_URL || company.website,
  defaultOgImage: "/images/og-default.png",
  logo: brandAssets.logoLight,
  icon: brandAssets.icon,
  locales,
  defaultLocale,
} as const;
