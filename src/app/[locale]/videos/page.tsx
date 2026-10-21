import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { galleryVideos } from "@/data/video-gallery";
import { VideoGalleryHero, VideoGalleryPlayer } from "@/components/video-gallery";
import { GalleryCtaSection } from "@/components/gallery";
import type { Locale } from "@/types";

interface VideosPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: VideosPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "videos" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("subtitle"),
    pathname: "/videos",
  });
}

export default async function VideosPage({ params }: VideosPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "videos" });

  return (
    <>
      <VideoGalleryHero locale={locale} />
      <section className="py-8 md:py-12 lg:py-14" aria-label={t("playerAriaLabel")}>
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <VideoGalleryPlayer videos={galleryVideos} />
        </div>
      </section>
      <GalleryCtaSection locale={locale} />
    </>
  );
}
