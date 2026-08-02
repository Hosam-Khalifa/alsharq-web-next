import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types";
import { PRODUCTS_HIGHLIGHTS } from "./data";

interface ProductsHighlightsBarProps {
  locale: Locale;
}

export async function ProductsHighlightsBar({ locale }: ProductsHighlightsBarProps) {
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <section className="border-b border-border bg-surface py-8 md:py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <ul
          aria-label={t("highlightsAriaLabel")}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
        >
          {PRODUCTS_HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;

            return (
              <li
                key={item.id}
                className={`flex items-start gap-3 px-2 py-2 lg:px-5 ${
                  index > 0 ? "lg:border-s lg:border-border" : ""
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/50 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground sm:text-[0.95rem]">
                    {t(item.titleKey)}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {t(item.textKey)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
