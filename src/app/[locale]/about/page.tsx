import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AboutHeroSection,
  AboutImpactSection,
  AboutStorySection,
  AboutValuesSection,
} from "@/components/about";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import "@/components/about/about.css";
import type { Locale } from "@/types";

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("intro"),
    pathname: "/about",
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHeroSection locale={locale} />
      <AboutStorySection locale={locale} />
      <AboutValuesSection locale={locale} />
      <AboutImpactSection locale={locale} />
    </>
  );
}
