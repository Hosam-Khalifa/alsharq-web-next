import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { GalleryCtaSection, GalleryGrid, GalleryHeroSection } from "@/components/gallery";
import type { Locale } from "@/types";

interface GalleryPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: GalleryPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("subtitle"),
    pathname: "/gallery",
  });
}

export default async function GalleryPage({ params }: GalleryPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <GalleryHeroSection locale={locale} />
      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-6xl px-4">
          <GalleryGrid />
        </div>
      </section>
      <GalleryCtaSection locale={locale} />
    </>
  );
}
