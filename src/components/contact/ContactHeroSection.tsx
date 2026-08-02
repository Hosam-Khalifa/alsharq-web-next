import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/types";
import { contactConfig } from "@/config/contact";

interface ContactHeroSectionProps {
  locale: Locale;
}

export async function ContactHeroSection({ locale }: ContactHeroSectionProps) {
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <section className="relative min-h-[58vh] overflow-hidden md:min-h-[64vh]">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={contactConfig.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgb(10_12_16/0.9)_0%,rgb(10_12_16/0.68)_52%,rgb(10_12_16/0.42)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_80%,rgb(230_126_34/0.22),transparent_60%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[58vh] max-w-6xl flex-col justify-end px-4 pb-12 pt-28 md:min-h-[64vh] md:pb-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t("heroEyebrow")}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
            {t.rich("heroTitle", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
