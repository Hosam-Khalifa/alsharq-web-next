import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { CERTIFICATE_STACK_IMAGES } from "./data";

const CERTIFICATES_BG = "/images/Homehero/certificates-bg.webp";

interface CertificatesTrustSectionProps {
  locale: Locale;
}

export async function CertificatesTrustSection({ locale }: CertificatesTrustSectionProps) {
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section className="relative z-[1] overflow-visible border-y border-border py-14 md:py-16 lg:py-20">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src={CERTIFICATES_BG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/55 dark:bg-background/70" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 text-center sm:gap-4">
          <span aria-hidden="true" className="hidden items-center gap-2 sm:flex">
            <span className="h-px w-10 bg-border-strong md:w-16" />
            <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
          </span>
          <h2 className="shrink-0 text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-[1.7rem]">
            {t("certificatesTrustTitle")}
          </h2>
          <span aria-hidden="true" className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
            <span className="h-px w-10 bg-border-strong md:w-16" />
          </span>
        </div>

        <div className="relative mt-10 min-h-[200px] sm:min-h-[220px] lg:mt-12 lg:min-h-[240px]">
          <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
            <Link href={routes.certificates()}>
              <Button
                variant="outline"
                size="lg"
                className="min-w-[12rem] border-primary/40 bg-surface/80 px-6 text-foreground backdrop-blur-sm hover:border-primary hover:bg-accent-soft"
              >
                {t("certificatesTrustCta")}
              </Button>
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 right-0 h-[280px] w-[260px] sm:-bottom-24 sm:h-[320px] sm:w-[300px] md:-bottom-28 md:right-2 md:h-[360px] md:w-[340px] lg:-bottom-32 lg:right-4"
          >
            {CERTIFICATE_STACK_IMAGES.map((src, index) => (
              <div
                key={src}
                className="absolute overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-elevated)]"
                style={{
                  width: "68%",
                  aspectRatio: "3 / 4",
                  right: `${index * 14}%`,
                  top: `${index * 6}%`,
                  zIndex: CERTIFICATE_STACK_IMAGES.length - index,
                  transform: `rotate(${index === 0 ? -2 : index === 1 ? 2 : 5}deg)`,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
