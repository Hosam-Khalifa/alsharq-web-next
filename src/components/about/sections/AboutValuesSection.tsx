import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types";
import { ABOUT_VALUES } from "../data";
import { aboutIconMap } from "../icon-map";
import { FadeInView } from "../motion/FadeInView";

interface AboutValuesSectionProps {
  locale: Locale;
}

export async function AboutValuesSection({ locale }: AboutValuesSectionProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section className="py-14 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <FadeInView className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">{t("valuesEyebrow")}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("valuesTitle")}
          </h2>
        </FadeInView>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5">
          {ABOUT_VALUES.map((value, index) => {
            const Icon = aboutIconMap[value.icon];

            return (
              <li key={value.id} className="h-full">
                <FadeInView delay={index * 0.06} className="h-full">
                  <div className="flex h-full flex-col items-start rounded-2xl border border-border bg-surface px-5 py-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-primary/35">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-primary">
                      <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-foreground">
                      {t(value.titleKey)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(value.textKey)}
                    </p>
                  </div>
                </FadeInView>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
