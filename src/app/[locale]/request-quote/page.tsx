import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { QuoteHero } from "@/components/forms/quote-wizard/QuoteHero";
import { QuoteWizard } from "@/components/forms/quote-wizard/QuoteWizard";
import type { Locale } from "@/types";

interface RequestQuotePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: RequestQuotePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quote" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("heroSubtitle"),
    pathname: "/request-quote",
  });
}

export default async function RequestQuotePage({ params }: RequestQuotePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <QuoteHero locale={locale} />
      <div className="border-b border-border bg-background">
        <div className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
          <Suspense
            fallback={
              <div className="rounded-2xl border border-border bg-surface p-8 text-sm text-muted-foreground">
                …
              </div>
            }
          >
            <QuoteWizard />
          </Suspense>
        </div>
      </div>
    </>
  );
}
