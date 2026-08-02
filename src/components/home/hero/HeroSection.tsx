import { getTranslations } from "next-intl/server";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { AnimatedHeroClient } from "./AnimatedHeroClient";

interface HeroSectionProps {
  locale: Locale;
}

export async function HeroSection({ locale }: HeroSectionProps) {
  const t = await getTranslations({ locale });

  const featureItems = [
    {
      id: "saudi",
      icon: "saudi" as const,
      title: t("home.heroFeatureSaudiTitle"),
      description: t("home.heroFeatureSaudiText"),
    },
    {
      id: "quality",
      icon: "quality" as const,
      title: t("home.heroFeatureQualityTitle"),
      description: t("home.heroFeatureQualityText"),
    },
    {
      id: "moisture",
      icon: "moisture" as const,
      title: t("home.heroFeatureMoistureTitle"),
      description: t("home.heroFeatureMoistureText"),
    },
  ];

  return (
    <AnimatedHeroClient
      title={t("home.heroTitle")}
      subtitle={t("home.heroSubtitle")}
      primaryLabel={t("home.heroCtaCatalog")}
      primaryHref={routes.catalog()}
      secondaryLabel={t("home.heroCtaQuote")}
      secondaryHref={routes.requestQuote()}
      featureItems={featureItems}
      featureAriaLabel={t("home.heroFeaturesAriaLabel")}
    />
  );
}
