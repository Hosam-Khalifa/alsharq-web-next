import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types";
import { routes } from "@/config/routes";

const DoorShowcase = dynamic(
  () => import("./DoorShowcase").then((module) => module.DoorShowcase),
  {
    loading: () => (
      <section
        className="min-h-[92svh] border-b border-border bg-surface-muted"
        aria-busy="true"
        aria-label="Door showcase loading"
      />
    ),
  },
);

interface DoorShowcaseSectionProps {
  locale: Locale;
}

export async function DoorShowcaseSection({ locale }: DoorShowcaseSectionProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <DoorShowcase
      sectionAriaLabel={t("doorShowcaseAriaLabel")}
      previousLabel={t("doorShowcasePrevious")}
      nextLabel={t("doorShowcaseNext")}
      catalogPreviewLabel={t("doorShowcaseCatalogPreview")}
      catalogHref={routes.catalogDoors()}
      productNames={{
        "SHD-593": t("doorShowcaseProduct593"),
        "SHD-601": t("doorShowcaseProduct601"),
        "SHD-605": t("doorShowcaseProduct605"),
      }}
    />
  );
}
