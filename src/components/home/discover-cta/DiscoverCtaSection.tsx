import Image from "next/image";
import { Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { FileDownloadLink } from "@/components/shared/file-download-link/file-download-link";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

const DISCOVER_BG = "/images/Homehero/discover-bg.webp";

interface DiscoverCtaSectionProps {
  locale: Locale;
}

export async function DiscoverCtaSection({ locale }: DiscoverCtaSectionProps) {
  const t = await getTranslations({ locale, namespace: "home" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <section className="px-4 py-10 md:py-14">
      <div className="container mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[var(--shadow-elevated)]">
          <div className="absolute inset-0" aria-hidden="true">
            <Image
              src={DISCOVER_BG}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(10_12_16/0.88)_0%,rgb(10_12_16/0.72)_45%,rgb(10_12_16/0.55)_100%)] dark:bg-[linear-gradient(90deg,rgb(8_10_14/0.92)_0%,rgb(8_10_14/0.78)_50%,rgb(8_10_14/0.62)_100%)]" />
          </div>

          <div className="relative z-10 px-6 py-10 text-center sm:px-8 sm:py-12 md:px-12 md:py-14">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
              {t("discoverCatalogTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
              {t.rich("discoverCatalogSubtitle", {
                highlight: (chunks) => (
                  <span className="font-medium text-primary">{chunks}</span>
                ),
              })}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <FileDownloadLink file="catalog">
                <Button size="lg" className="gap-2">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t("discoverCatalogDownload")}
                </Button>
              </FileDownloadLink>
              <Link href={routes.requestQuote()}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/45 bg-transparent text-white hover:border-primary hover:bg-accent-soft hover:text-white"
                >
                  {tNav("requestQuote")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
