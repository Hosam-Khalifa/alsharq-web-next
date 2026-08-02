import Image from "next/image";
import { Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { FileDownloadLink } from "@/components/shared/file-download-link/file-download-link";
import { CATALOG_ASSETS } from "./catalog-assets";

interface CatalogCtaSectionProps {
  locale: Locale;
  quoteCategory?: "doors" | "boards";
}

export async function CatalogCtaSection({ locale, quoteCategory }: CatalogCtaSectionProps) {
  const t = await getTranslations({ locale, namespace: "catalog" });

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={CATALOG_ASSETS.finale}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgb(8_10_14/0.82)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgb(230_126_34/0.2),transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {t("ctaEyebrow")}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
          {t("ctaSubtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <FileDownloadLink file="catalog">
            <Button size="lg" className="gap-2">
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("downloadCatalog")}
            </Button>
          </FileDownloadLink>
          <Link href={routes.requestQuote(quoteCategory ? { category: quoteCategory } : undefined)}>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/5 text-white backdrop-blur-sm hover:border-primary hover:bg-accent-soft hover:text-foreground"
            >
              {t("ctaQuote")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
