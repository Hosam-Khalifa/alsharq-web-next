import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/gallery";
import type { Locale } from "@/types";
import { GALLERY_HERO_IMAGE } from "./gallery-assets";

interface GalleryHeroSectionProps {
  locale: Locale;
}

export async function GalleryHeroSection({ locale }: GalleryHeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "gallery" });

  return (
    <section className="relative min-h-[78vh] overflow-hidden md:min-h-[86vh]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={GALLERY_HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgb(10_12_16/0.88)_0%,rgb(10_12_16/0.62)_48%,rgb(10_12_16/0.35)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_20%_80%,rgb(230_126_34/0.22),transparent_60%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 md:min-h-[86vh] md:pb-16">
        <div className="gallery-hero-copy max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t("heroEyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            {t.rich("heroTitle", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
            {t("heroSubtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#gallery-grid">
              <Button size="lg" className="gap-2">
                {t("heroCta")}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <p className="text-sm text-white/65">{t("countLabel", { count: galleryImages.length })}</p>
          </div>
        </div>
      </div>

      <span className="sr-only">{t("heroImageAlt")}</span>
    </section>
  );
}
