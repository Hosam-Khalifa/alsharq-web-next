import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { company } from "@/config/company";
import { site } from "@/config/site";
import type { Locale } from "@/types";

interface GeneratePageMetadataOptions {
  locale: Locale;
  title?: string;
  description?: string;
  pathname: string;
  noIndex?: boolean;
}

export async function generatePageMetadata({
  locale,
  title,
  description,
  pathname,
  noIndex = false,
}: GeneratePageMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteName = t("siteName");
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription = description ?? t("defaultDescription");
  const baseUrl = site.url.replace(/\/$/, "");
  const pathSuffix = pathname === "" || pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  const canonical = `${baseUrl}/${locale}${pathSuffix}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical,
      languages: {
        ar: `${baseUrl}/ar${pathSuffix}`,
        en: `${baseUrl}/en${pathSuffix}`,
        "x-default": `${baseUrl}/ar${pathSuffix}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonical,
      siteName,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [{ url: `${baseUrl}${site.defaultOgImage}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function getOrganizationSchema(locale: Locale) {
  const baseUrl = site.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name[locale],
    url: company.website,
    logo: `${baseUrl}${site.logo}`,
    email: company.email,
    telephone: company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address[locale],
      addressLocality: company.city[locale],
      addressCountry: company.country[locale],
    },
  };
}

export function getLocalBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name[locale],
    url: company.website,
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address[locale],
      addressLocality: company.city[locale],
      addressCountry: company.country[locale],
    },
    // TODO: Confirm official business hours before adding openingHoursSpecification
  };
}

export function getBreadcrumbSchema(
  locale: Locale,
  items: Array<{ name: string; path: string }>,
) {
  const baseUrl = site.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}/${locale}${item.path}`,
    })),
  };
}
