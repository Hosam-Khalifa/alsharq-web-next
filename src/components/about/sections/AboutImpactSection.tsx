import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { ABOUT_ASSETS } from "../about-assets";
import { ABOUT_STATS } from "../data";
import { aboutIconMap } from "../icon-map";
import { AnimatedCounter } from "../motion/AnimatedCounter";
import { FadeInView } from "../motion/FadeInView";

interface AboutImpactSectionProps {
  locale: Locale;
}

export async function AboutImpactSection({ locale }: AboutImpactSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section id="about-impact" className="relative scroll-mt-24 overflow-hidden py-16 md:py-20 lg:py-24">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={ABOUT_ASSETS.impact}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_12_16/0.78)_0%,rgb(10_12_16/0.86)_45%,rgb(10_12_16/0.92)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <FadeInView className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">{t("impactEyebrow")}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.2rem]">
            {t("impactTitle")}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {t("impactText")}
          </p>
        </FadeInView>

        <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:mt-16">
          {ABOUT_STATS.map((stat, index) => {
            const Icon = aboutIconMap[stat.icon];

            return (
              <li key={stat.id}>
                <FadeInView delay={index * 0.08} className="text-center sm:text-start">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/50 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </div>
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    label={t(stat.labelKey)}
                    className="text-center sm:text-start"
                  />
                </FadeInView>
              </li>
            );
          })}
        </ul>

        <FadeInView delay={0.15} className="mt-12 ms-auto max-w-md lg:mt-16">
          <div className="rounded-2xl border border-white/10 bg-[rgb(15_17_21/0.78)] p-6 shadow-[var(--shadow-elevated)] backdrop-blur-md sm:p-7">
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              {t("impactCtaTitle")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              {t("impactCtaText")}
            </p>
            <Link href={routes.contact()} className="mt-5 inline-flex">
              <Button size="lg" className="gap-2">
                {t("impactCtaButton")}
                <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
