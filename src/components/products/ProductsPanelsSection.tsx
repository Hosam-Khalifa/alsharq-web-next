import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { PRODUCTS_PANEL_BULLETS, PRODUCTS_PANEL_SPECS } from "./data";
import { PRODUCTS_ASSETS } from "./products-assets";

interface ProductsPanelsSectionProps {
  locale: Locale;
}

export async function ProductsPanelsSection({ locale }: ProductsPanelsSectionProps) {
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <section className="pb-14 md:pb-16 lg:pb-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7 lg:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.9fr_1fr] lg:gap-8">
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-xl lg:max-w-none">
                <Image
                  src={PRODUCTS_ASSETS.panels}
                  alt={t("panelsImageAlt")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain object-center"
                />
              </div>
            </div>

            <ul className="order-3 space-y-4 lg:order-2">
              {PRODUCTS_PANEL_SPECS.map((spec) => {
                const Icon = spec.icon;

                return (
                  <li key={spec.id} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-primary">
                      <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <p className="pt-2 text-sm leading-relaxed text-foreground sm:text-[0.95rem]">
                      {t(spec.textKey)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="order-1 lg:order-3">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {t("panelsTitle")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("panelsText")}
              </p>

              <ul className="mt-6 space-y-3">
                {PRODUCTS_PANEL_BULLETS.map((bullet) => (
                  <li key={bullet.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground sm:text-[0.95rem]">
                      {t(bullet.textKey)}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={routes.catalogBoards()}
                className="mt-8 inline-flex"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-primary/50 text-primary hover:border-primary hover:bg-accent-soft hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />
                  {t("panelsCta")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
