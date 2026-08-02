import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

const WpcShowcase = dynamic(
  () => import("./WpcShowcase").then((module) => module.WpcShowcase),
  {
    loading: () => (
      <section
        className="min-h-[80svh] border-y border-border bg-surface-muted"
        aria-busy="true"
        aria-label="WPC foam boards showcase loading"
      />
    ),
  },
);

interface WpcShowcaseSectionProps {
  locale: Locale;
}

export async function WpcShowcaseSection({ locale }: WpcShowcaseSectionProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <WpcShowcase
      sectionAriaLabel={t("wpcShowcaseAriaLabel")}
      title={t("wpcShowcaseTitle")}
      subtitle={t("wpcShowcaseSubtitle")}
      previousLabel={t("wpcShowcasePrevious")}
      nextLabel={t("wpcShowcaseNext")}
      thicknessLabel={t("wpcShowcaseThicknessLabel")}
      selectorAriaLabel={t("wpcShowcaseSelectorAriaLabel")}
      catalogLabel={t("heroCtaCatalog")}
      catalogHref={routes.catalogBoards()}
      selectorLabels={{
        "05": t("wpcShowcaseSelector05"),
        "08": t("wpcShowcaseSelector08"),
        "12": t("wpcShowcaseSelector12"),
        "19": t("wpcShowcaseSelector19"),
      }}
      thicknessValues={{
        "05": t("wpcShowcaseThickness05"),
        "08": t("wpcShowcaseThickness08"),
        "12": t("wpcShowcaseThickness12"),
        "19": t("wpcShowcaseThickness19"),
      }}
    />
  );
}
