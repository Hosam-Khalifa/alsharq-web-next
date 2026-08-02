import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import {
  HeroSection,
  CertificatesTrustSection,
  PartnersSection,
  DiscoverCtaSection,
} from "@/components/home";
import type { Locale } from "@/types";

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return generatePageMetadata({
    locale,
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    pathname: "",
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection locale={locale} />
      <CertificatesTrustSection locale={locale} />
      <PartnersSection locale={locale} />
      <DiscoverCtaSection locale={locale} />
    </>
  );
}
