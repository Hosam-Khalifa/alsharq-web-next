import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Factory, ShieldCheck, Wrench } from "lucide-react";
import type { Locale } from "@/types";

const HERO_BG = "/images/Products/Products-bg-1.webp";

interface QuoteHeroProps {
  locale: Locale;
}

export async function QuoteHero({ locale }: QuoteHeroProps) {
  const t = await getTranslations({ locale, namespace: "quote" });

  const trust = [
    { id: "saudi", icon: Factory, label: t("heroTrustSaudi") },
    { id: "quality", icon: ShieldCheck, label: t("heroTrustQuality") },
    { id: "support", icon: Wrench, label: t("heroTrustSupport") },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={HERO_BG}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgb(10_12_16/0.78)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_20%,rgb(230_126_34/0.18),transparent_60%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4 py-12 md:py-16 lg:py-[4.5rem]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {t("heroEyebrow")}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
          {t("heroTitle")}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/78 sm:text-base">
          {t("heroSubtitle")}
        </p>

        <ul className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          {trust.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/90 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
