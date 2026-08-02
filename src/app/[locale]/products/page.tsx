import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import {
  ProductsDoorsSection,
  ProductsHeroSection,
  ProductsHighlightsBar,
  ProductsPanelsSection,
} from "@/components/products";
import type { Locale } from "@/types";

interface ProductsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ProductsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("heroSubtitle"),
    pathname: "/products",
  });
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProductsHeroSection locale={locale} />
      <ProductsHighlightsBar locale={locale} />
      <ProductsDoorsSection locale={locale} />
      <ProductsPanelsSection locale={locale} />
    </>
  );
}
