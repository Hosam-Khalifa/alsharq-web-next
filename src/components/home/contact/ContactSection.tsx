import { getTranslations } from "next-intl/server";
import { routes } from "@/config/routes";
import { CallToAction } from "@/components/shared/call-to-action/call-to-action";
import type { Locale } from "@/types";

interface ContactSectionProps {
  locale: Locale;
}

export async function ContactSection({ locale }: ContactSectionProps) {
  const t = await getTranslations({ locale });

  return (
    <CallToAction
      title={t("home.contactCtaTitle")}
      description={t("home.contactCtaText")}
      primaryLabel={t("nav.contact")}
      primaryHref={routes.contact()}
    />
  );
}
