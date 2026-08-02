import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types";
import { partnerItems } from "./partners.data";
import { PartnersSliderClient } from "./PartnersSliderClient";

interface PartnersSectionProps {
  locale: Locale;
}

export async function PartnersSection({ locale }: PartnersSectionProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  const partners = partnerItems
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((partner) => ({
      id: partner.id,
      imageLight: partner.imageLight,
      imageDark: partner.imageDark,
      alt: t(partner.altKey),
      width: partner.width,
      height: partner.height,
      website: partner.website,
    }));

  return (
    <section className="overflow-hidden py-12 md:py-16 lg:py-20" aria-labelledby="partners-heading">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-copper">
            {t("partners.eyebrow")}
          </p>
          <h2
            id="partners-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {t("partners.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{t("partners.subtitle")}</p>
        </div>

        <div className="mt-10 md:mt-12">
          <PartnersSliderClient
            partners={partners}
            sliderLabel={t("partners.sliderLabel")}
            isRtl={locale === "ar"}
          />
        </div>
      </div>
    </section>
  );
}
