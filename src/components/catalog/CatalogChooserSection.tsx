import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { CATALOG_ASSETS } from "./catalog-assets";

interface CatalogChooserSectionProps {
  locale: Locale;
}

const CHOICES = [
  {
    id: "doors",
    href: routes.catalogDoors,
    titleKey: "chooseDoorsTitle",
    textKey: "chooseDoorsText",
    image: "/images/Catalog/doors-bg.jpg",
    imageClassName: "object-cover object-center",
  },
  {
    id: "boards",
    href: routes.catalogBoards,
    titleKey: "chooseBoardsTitle",
    textKey: "chooseBoardsText",
    image: "/images/Catalog/board-bg.png",
    imageClassName: "object-cover object-center",
  },
] as const;

export async function CatalogChooserSection({ locale }: CatalogChooserSectionProps) {
  const t = await getTranslations({ locale, namespace: "catalog" });

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={CATALOG_ASSETS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[rgb(8_10_14/0.82)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_20%,rgb(230_126_34/0.22),transparent_65%)]" />
      </div>

      <div className="container relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {t("chooseEyebrow")}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t.rich("chooseTitle", {
              highlight: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            {t("chooseSubtitle")}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {CHOICES.map((choice) => (
            <Link
              key={choice.id}
              href={choice.href()}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-[rgb(15_17_21/0.55)] shadow-[0_20px_60px_rgb(0_0_0/0.35)] backdrop-blur-md transition duration-300 hover:border-primary/55 hover:shadow-[0_0_0_3px_rgb(230_126_34/0.18)]"
            >
              <div className="relative aspect-[16/11] bg-[rgb(10_12_16/0.85)]">
                <Image
                  src={choice.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className={`transition duration-500 group-hover:scale-[1.03] ${choice.imageClassName}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="flex items-end justify-between gap-4 px-5 py-5 sm:px-6">
                <div>
                  <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    {t(choice.titleKey)}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {t(choice.textKey)}
                  </p>
                </div>
                <span className="mb-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition group-hover:border-primary group-hover:bg-accent-soft group-hover:text-primary">
                  <ArrowLeft className="h-4 w-4 rotate-180 rtl:rotate-0" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
