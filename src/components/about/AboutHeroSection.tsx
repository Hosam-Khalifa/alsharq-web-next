import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";
import { ABOUT_ASSETS } from "./about-assets";
import { ABOUT_FEATURES } from "./data";
import { aboutIconMap } from "./icon-map";
import { FadeInView } from "./motion/FadeInView";

interface AboutHeroSectionProps {
  locale: Locale;
}

export async function AboutHeroSection({ locale }: AboutHeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={ABOUT_ASSETS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgb(10_12_16/0.62)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 py-16 md:min-h-[75vh] md:py-20 lg:min-h-[80vh] lg:py-24">
        <FadeInView direction="right" className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">{t("heroEyebrow")}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {t.rich("heroTitle", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {t("heroSubtitle")}
          </p>
          <a href="#about-story" className="mt-7 inline-flex">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-primary/60 bg-[rgb(15_17_21/0.35)] text-white backdrop-blur-sm hover:border-primary hover:bg-accent-soft hover:text-foreground"
            >
              <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />
              {t("heroCta")}
            </Button>
          </a>
        </FadeInView>

        <FadeInView delay={0.12} className="mt-12 md:mt-16">
          <ul
            aria-label={t("featuresAriaLabel")}
            className="grid gap-1 rounded-2xl border border-white/10 bg-[rgb(15_17_21/0.55)] p-3 shadow-[0_18px_50px_rgb(0_0_0/0.28)] backdrop-blur-[18px] sm:grid-cols-3 sm:p-4 md:p-5"
          >
            {ABOUT_FEATURES.map((feature, index) => {
              const Icon = aboutIconMap[feature.icon];

              return (
                <li
                  key={feature.id}
                  className={`flex items-start gap-3 rounded-xl px-3 py-3 sm:px-4 ${
                    index > 0 ? "sm:border-s sm:border-white/10" : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/70 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-primary sm:text-[0.95rem]">
                      {t(feature.titleKey)}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/70 sm:text-sm">
                      {t(feature.textKey)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </FadeInView>
      </div>

      <span className="sr-only">{t("heroImageAlt")}</span>
    </section>
  );
}
