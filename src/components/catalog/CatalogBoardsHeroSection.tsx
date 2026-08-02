import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { PRODUCTS_ASSETS } from "@/components/products/products-assets";

interface CatalogBoardsHeroSectionProps {
  locale: Locale;
}

export async function CatalogBoardsHeroSection({ locale }: CatalogBoardsHeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "catalog" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <section className="catalog-hero relative min-h-[72vh] overflow-hidden md:min-h-[78vh]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={PRODUCTS_ASSETS.panels}
          alt=""
          fill
          priority
          sizes="100vw"
          className="catalog-hero__bg-image object-cover object-center"
        />
        <div className="catalog-hero__veil absolute inset-0" />
        <div className="catalog-hero__grain absolute inset-0" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 md:min-h-[78vh] md:pb-16">
        <div className="mr-auto max-w-2xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/65">
            <span className="h-4 w-0.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <Link href={routes.home()} className="transition-colors hover:text-white">
              {tNav("home")}
            </Link>
            <span className="text-white/35">/</span>
            <Link href={routes.catalog()} className="transition-colors hover:text-white">
              {t("title")}
            </Link>
            <span className="text-white/35">/</span>
            <span className="text-white/90">{t("boardsBreadcrumb")}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t("boardsHeroEyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            {t.rich("boardsHeroTitle", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
            {t("boardsHeroSubtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#boards-catalog">
              <Button size="lg" className="gap-2">
                {t("boardsHeroCta")}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <Link href={routes.catalog()}>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-primary hover:bg-accent-soft hover:text-foreground"
              >
                {t("backToCatalogChoice")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
