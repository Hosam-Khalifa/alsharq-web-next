import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/types";
import { ABOUT_ASSETS } from "../about-assets";
import { ABOUT_STORY_POINTS } from "../data";
import { FadeInView } from "../motion/FadeInView";

interface AboutStorySectionProps {
  locale: Locale;
}

export async function AboutStorySection({ locale }: AboutStorySectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section id="about-story" className="scroll-mt-24 py-14 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          <FadeInView direction="right" className="relative">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:aspect-[4/5]">
              <Image
                src={ABOUT_ASSETS.story}
                alt={t("storyImageAlt")}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-[rgb(15_17_21/0.82)] p-4 shadow-[var(--shadow-elevated)] backdrop-blur-md sm:inset-x-5 sm:bottom-5 sm:p-5">
                <p className="text-sm leading-relaxed text-white/90 sm:text-[0.95rem]">
                  {t("storyOverlay")}
                </p>
              </div>
            </div>
          </FadeInView>

          <FadeInView direction="left" delay={0.08}>
            <p className="text-sm font-semibold text-primary">{t("storyEyebrow")}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.1rem] lg:leading-snug">
              {t("storyTitle")}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("storyText")}
            </p>

            <ul className="mt-6 space-y-3">
              {ABOUT_STORY_POINTS.map((point) => (
                <li key={point.id} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground sm:text-[0.95rem]">
                    {t(point.textKey)}
                  </span>
                </li>
              ))}
            </ul>

            <a href="#about-impact" className="mt-8 inline-flex">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-primary/50 hover:border-primary hover:bg-accent-soft"
              >
                <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />
                {t("storyCta")}
              </Button>
            </a>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
