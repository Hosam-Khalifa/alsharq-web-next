import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import type { Locale } from "@/types";

interface PrivacyPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return generatePageMetadata({
    locale,
    title: t("privacyTitle"),
    description: t("privacyContent"),
    pathname: "/privacy-policy",
    noIndex: true,
  });
}

export default async function PrivacyPolicyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <PageHero title={t("privacyTitle")} />
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <p className="text-muted-foreground">{t("privacyContent")}</p>
        <p className="mt-4 text-sm font-medium text-destructive">{tCommon("legalReviewRequired")}</p>
      </div>
    </>
  );
}
