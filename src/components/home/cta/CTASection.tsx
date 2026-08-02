import { getTranslations } from "next-intl/server";
import { routes } from "@/config/routes";
import { CallToAction } from "@/components/shared/call-to-action/call-to-action";
import { ContactSection } from "@/components/home/contact/ContactSection";
import type { Locale } from "@/types";

interface CTASectionProps {
  locale: Locale;
}

export async function CTASection({ locale }: CTASectionProps) {
  const t = await getTranslations({ locale });

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-6xl space-y-8 px-4">
        <CallToAction
          title={t("home.quoteCtaTitle")}
          description={t("home.quoteCtaText")}
          primaryLabel={t("nav.requestQuote")}
          primaryHref={routes.requestQuote()}
          secondaryLabel={t("home.heroCtaCatalog")}
          secondaryHref={routes.catalog()}
        />
        <ContactSection locale={locale} />
      </div>
    </section>
  );
}
