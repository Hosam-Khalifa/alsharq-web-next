import Image from "next/image";
import { Download, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { PRODUCTS_HERO_FEATURES } from "./data";
import { FileDownloadLink } from "@/components/shared/file-download-link/file-download-link";
import { PRODUCTS_ASSETS } from "./products-assets";

interface ProductsHeroSectionProps {
  locale: Locale;
}

export async function ProductsHeroSection({ locale }: ProductsHeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "products" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={PRODUCTS_ASSETS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_12_16/0.92)_0%,rgb(10_12_16/0.78)_38%,rgb(10_12_16/0.45)_68%,rgb(10_12_16/0.28)_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-between px-4 py-14 md:min-h-[82vh] md:py-16 lg:py-20">
        <div className="mr-auto max-w-xl pt-2 md:pt-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/70">
            <span className="h-4 w-0.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href={routes.home()} className="transition-colors hover:text-white">
                  {tNav("home")}
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                /
              </li>
              <li className="text-white/90">{t("heroBreadcrumb")}</li>
            </ol>
          </nav>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {t.rich("heroTitle", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            {t("heroSubtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <FileDownloadLink file="catalog">
              <Button size="lg" className="gap-2">
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("heroDownloadCta")}
              </Button>
            </FileDownloadLink>
            <Link href={routes.contact()}>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 border-white/35 bg-transparent text-white hover:border-primary hover:bg-accent-soft hover:text-foreground"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t("heroPrintCta")}
              </Button>
            </Link>
          </div>
        </div>

        <ul
          aria-label={t("heroFeaturesAriaLabel")}
          className="mt-12 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {PRODUCTS_HERO_FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <li key={feature.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-primary">
                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <p className="text-sm leading-snug text-white/90 sm:text-[0.95rem]">
                  {t(feature.labelKey)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
