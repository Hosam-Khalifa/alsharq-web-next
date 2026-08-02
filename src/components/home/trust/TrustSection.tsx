import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types";
import { HeroStatsStrip } from "@/components/home/hero/HeroStatsStrip";

interface TrustSectionProps {
  locale: Locale;
}

export async function TrustSection({ locale }: TrustSectionProps) {
  const t = await getTranslations({ locale });

  const statItems = [
    {
      id: "manufacturing",
      icon: "manufacturing" as const,
      title: t("home.heroStatManufacturingTitle"),
      value: t("home.heroStatManufacturingValue"),
    },
    {
      id: "projects",
      icon: "projects" as const,
      title: t("home.heroStatProjectsTitle"),
      value: t("home.heroStatProjectsValue"),
    },
    {
      id: "experience",
      icon: "experience" as const,
      title: t("home.heroStatExperienceTitle"),
      value: t("home.heroStatExperienceValue"),
    },
  ];

  return <HeroStatsStrip items={statItems} ariaLabel={t("home.heroStatsAriaLabel")} />;
}
