import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import type { Locale } from "@/types";

interface TermsPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: TermsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return generatePageMetadata({
    locale,
    title: t("termsTitle"),
    description: t("termsContent"),
    pathname: "/terms",
    noIndex: true,
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <PageHero title={t("termsTitle")} />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <p className="text-muted-foreground">{t("termsContent")}</p>
        <p className="mt-4 text-sm font-medium text-destructive">{tCommon("legalReviewRequired")}</p>
      </div>
    </>
  );
}
