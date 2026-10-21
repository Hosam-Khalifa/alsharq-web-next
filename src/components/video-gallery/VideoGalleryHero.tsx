import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types";
import { galleryVideos } from "@/data/video-gallery";

interface VideoGalleryHeroProps {
  locale: Locale;
}

export async function VideoGalleryHero({ locale }: VideoGalleryHeroProps) {
  const t = await getTranslations({ locale, namespace: "videos" });

  return (
    <section className="border-b border-border bg-[linear-gradient(180deg,rgb(230_126_34/0.08),transparent_70%)]">
      <div className="container mx-auto max-w-6xl px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-12 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
          {t("eyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {t.rich("heading", {
            highlight: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("intro")}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("countLabel", { count: galleryVideos.length })}
        </p>
      </div>
    </section>
  );
}
