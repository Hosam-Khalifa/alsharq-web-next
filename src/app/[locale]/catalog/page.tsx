import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { CatalogChooserSection } from "@/components/catalog";
import "@/components/catalog/catalog.css";
import type { Locale } from "@/types";

interface CatalogPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: CatalogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("chooseSubtitle"),
    pathname: "/catalog",
  });
}

export default async function CatalogPage({ params }: CatalogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CatalogChooserSection locale={locale} />;
}
