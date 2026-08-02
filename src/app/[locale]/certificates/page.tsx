import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import { CertificatesPageClient } from "@/components/certificates/certificates-page-client/certificates-page-client";
import type { Locale } from "@/types";

interface CertificatesPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: CertificatesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "certificates" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("subtitle"),
    pathname: "/certificates",
  });
}

export default async function CertificatesPage({ params }: CertificatesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "certificates" });

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <section className="overflow-hidden pb-16 pt-6 md:pb-20 md:pt-8">
        <div className="container mx-auto max-w-6xl px-4">
          <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
            {t("intro")}
          </p>
          <CertificatesPageClient />
        </div>
      </section>
    </>
  );
}
