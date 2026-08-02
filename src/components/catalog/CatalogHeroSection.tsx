import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { catalogFinishes } from "@/data/catalog";
import type { Locale } from "@/types";
import { FileDownloadLink } from "@/components/shared/file-download-link/file-download-link";
import { CATALOG_ASSETS } from "./catalog-assets";

interface CatalogHeroSectionProps {
  locale: Locale;
}

export async function CatalogHeroSection({ locale }: CatalogHeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "catalog" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <section className="catalog-hero relative min-h-[88vh] overflow-hidden md:min-h-[92vh]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={CATALOG_ASSETS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="catalog-hero__bg-image object-cover object-center"
        />
        <div className="catalog-hero__veil absolute inset-0" />
        <div className="catalog-hero__grain absolute inset-0" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 md:min-h-[92vh] md:pb-16 lg:pb-20">
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
            <span className="text-white/90">{t("doorsBreadcrumb")}</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t("heroEyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
            {t.rich("heroTitle", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
            {t("heroSubtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#catalog-studio">
              <Button size="lg" className="gap-2">
                {t("heroExploreCta")}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
            <FileDownloadLink file="catalog">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-primary hover:bg-accent-soft hover:text-foreground"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("downloadCatalog")}
              </Button>
            </FileDownloadLink>
            <Link href={routes.catalog()}>
              <Button
                variant="ghost"
                size="lg"
                className="text-white/80 hover:bg-white/10 hover:text-white"
              >
                {t("backToCatalogChoice")}
              </Button>
            </Link>
          </div>
        </div>

        <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-6 sm:mt-14 sm:gap-8">
          <div>
            <dt className="text-xs text-white/55">{t("heroStatFinishes")}</dt>
            <dd className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
              {catalogFinishes.length}+
            </dd>
          </div>
          <div>
            <dt className="text-xs text-white/55">{t("heroStatQuality")}</dt>
            <dd className="mt-1 text-2xl font-semibold text-white sm:text-3xl">4K</dd>
          </div>
          <div>
            <dt className="text-xs text-white/55">{t("heroStatReady")}</dt>
            <dd className="mt-1 text-2xl font-semibold text-primary sm:text-3xl">
              {t("heroStatReadyValue")}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
