import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import {
  CatalogBoardsExplorer,
  CatalogBoardsHeroSection,
  CatalogCtaSection,
} from "@/components/catalog";
import "@/components/catalog/catalog.css";
import type { Locale } from "@/types";

interface CatalogBoardsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: CatalogBoardsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catalog" });
  return generatePageMetadata({
    locale,
    title: `${t("chooseBoardsTitle")} | ${t("title")}`,
    description: t("boardsHeroSubtitle"),
    pathname: "/catalog/boards",
  });
}

export default async function CatalogBoardsPage({ params }: CatalogBoardsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CatalogBoardsHeroSection locale={locale} />
      <CatalogBoardsExplorer />
      <CatalogCtaSection locale={locale} quoteCategory="boards" />
    </>
  );
}
