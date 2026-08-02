import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import {
  CatalogCtaSection,
  CatalogDoorExplorer,
  CatalogHeroSection,
} from "@/components/catalog";
import "@/components/catalog/catalog.css";
import type { Locale } from "@/types";

interface CatalogDoorsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: CatalogDoorsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return generatePageMetadata({
    locale,
    title: `${t("chooseDoorsTitle")} | ${t("title")}`,
    description: t("heroSubtitle"),
    pathname: "/catalog/doors",
  });
}

export default async function CatalogDoorsPage({ params }: CatalogDoorsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CatalogHeroSection locale={locale} />
      <CatalogDoorExplorer />
      <CatalogCtaSection locale={locale} quoteCategory="doors" />
    </>
  );
}
