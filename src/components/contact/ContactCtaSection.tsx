import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

interface ContactCtaSectionProps {
  locale: Locale;
}

export async function ContactCtaSection({ locale }: ContactCtaSectionProps) {
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <section className="border-t border-border bg-[linear-gradient(180deg,transparent,rgb(230_126_34/0.06))] py-14 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t("ctaSubtitle")}
        </p>
        <div className="mt-8">
          <Link href={routes.requestQuote()}>
            <Button size="lg">{t("ctaQuote")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
