import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { PRODUCTS_DOOR_BULLETS } from "./data";
import { PRODUCTS_DOOR_PREVIEWS } from "./products-assets";

interface ProductsDoorsSectionProps {
  locale: Locale;
}

export async function ProductsDoorsSection({ locale }: ProductsDoorsSectionProps) {
  const t = await getTranslations({ locale, namespace: "products" });

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7 lg:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {t("doorsTitle")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t("doorsText")}
              </p>

              <ul className="mt-6 space-y-3">
                {PRODUCTS_DOOR_BULLETS.map((bullet) => (
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

              <Link href={routes.catalogDoors()} className="mt-8 inline-flex">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 border-primary/50 text-primary hover:border-primary hover:bg-accent-soft hover:text-primary"
                >
                  <ArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />
                  {t("doorsCta")}
                </Button>
              </Link>
            </div>

            <ul className="grid grid-cols-3 gap-3 sm:gap-4">
              {PRODUCTS_DOOR_PREVIEWS.map((door) => (
                <li key={door.id} className="text-center">
                  <div className="relative mx-auto aspect-[3/5] overflow-hidden rounded-lg border border-border bg-surface-muted">
                    <Image
                      src={door.src}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-contain object-bottom p-1.5"
                    />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    {t(door.labelKey)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
