"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/config/routes";
import { catalogFinishes, type CatalogFinish } from "@/data/catalog";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import type { Locale } from "@/types";

export function CatalogDoorExplorer() {
  const t = useTranslations("catalog");
  const tCommon = useTranslations("common");
  const locale = useLocale() as Locale;
  const reducedMotion = useReducedMotion();
  const stripRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [activeCode, setActiveCode] = useState(catalogFinishes[0]?.code ?? "");
  const [copied, setCopied] = useState(false);

  const filteredFinishes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalogFinishes;
    return catalogFinishes.filter(
      (finish) =>
        finish.code.toLowerCase().includes(q) ||
        finish.name[locale].toLowerCase().includes(q),
    );
  }, [query, locale]);

  useEffect(() => {
    if (!filteredFinishes.some((finish) => finish.code === activeCode)) {
      setActiveCode(filteredFinishes[0]?.code ?? "");
    }
  }, [filteredFinishes, activeCode]);

  const activeFinish: CatalogFinish | undefined =
    catalogFinishes.find((finish) => finish.code === activeCode) ??
    filteredFinishes[0] ??
    catalogFinishes[0];

  const activeIndex = filteredFinishes.findIndex(
    (finish) => finish.code === activeFinish?.code,
  );

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || activeIndex < 0) return;
    const item = strip.children[activeIndex] as HTMLElement | undefined;
    item?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex, reducedMotion]);

  const selectByOffset = (offset: number) => {
    if (!filteredFinishes.length) return;
    const next =
      (Math.max(activeIndex, 0) + offset + filteredFinishes.length) %
      filteredFinishes.length;
    setActiveCode(filteredFinishes[next].code);
  };

  const copyCode = async () => {
    if (!activeFinish) return;
    await navigator.clipboard.writeText(activeFinish.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="catalog-studio" className="catalog-studio scroll-mt-20 py-14 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {t("explorerEyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("explorerTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("explorerSubtitle")}
          </p>
        </div>

        <div className="catalog-studio__stage relative mt-10 overflow-hidden rounded-[1.75rem] border border-border shadow-[var(--shadow-elevated)] md:mt-12">
          <div className="relative flex min-h-[58vh] items-end justify-center px-4 pb-6 pt-10 sm:min-h-[64vh] sm:px-8 sm:pb-8 md:min-h-[70vh] lg:px-12">
            <AnimatePresence mode="wait">
              {activeFinish ? (
                <motion.div
                  key={activeFinish.code}
                  initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -12, scale: 0.99 }}
                  transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="catalog-studio__door relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] md:max-w-[28rem]"
                >
                  <div className="pointer-events-none absolute -inset-x-10 bottom-0 h-24 rounded-[100%] bg-black/25 blur-2xl dark:bg-black/45" />
                  <Image
                    src={activeFinish.doorImage}
                    alt={activeFinish.name[locale]}
                    width={600}
                    height={800}
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="relative z-10 mx-auto h-auto w-full object-contain drop-shadow-[0_30px_60px_rgb(0_0_0/0.45)]"
                    priority
                    unoptimized
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="absolute inset-x-4 top-4 z-20 flex flex-wrap items-start justify-between gap-3 sm:inset-x-6 sm:top-6">
              <div className="rounded-2xl border border-white/10 bg-[rgb(12_14_18/0.72)] px-4 py-3 text-white shadow-[var(--shadow-soft)] backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                  {t("selectedCode")}
                </p>
                <p className="mt-1 text-xl font-semibold tracking-wide">
                  {activeFinish?.code ?? "—"}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 border-white/20 bg-[rgb(12_14_18/0.55)] text-white backdrop-blur-md hover:border-primary hover:bg-accent-soft hover:text-foreground"
                  onClick={copyCode}
                  disabled={!activeFinish}
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  {copied ? tCommon("copied") : tCommon("copyCode")}
                </Button>
                {activeFinish ? (
                  <Link
                    href={routes.requestQuote({
                      category: "doors",
                      product: activeFinish.code,
                    })}
                  >
                    <Button size="sm">{t("requestQuoteForItem")}</Button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="border-t border-border/80 bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] px-4 py-4 backdrop-blur-xl sm:px-6 sm:py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label htmlFor="catalog-finish-search" className="relative block w-full max-w-sm">
                <span className="sr-only">{t("searchPlaceholder")}</span>
                <Search
                  className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="catalog-finish-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("searchPlaceholder")}
                  className="border-border/80 bg-background/50 ps-9"
                />
              </label>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <p className="text-sm text-muted-foreground">
                  {tCommon("resultsCount", { count: filteredFinishes.length })}
                </p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0"
                    onClick={() => selectByOffset(-1)}
                    aria-label={t("previousFinish")}
                  >
                    <ChevronLeft className="h-4 w-4 rtl:hidden" aria-hidden="true" />
                    <ChevronRight className="hidden h-4 w-4 rtl:block" aria-hidden="true" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0"
                    onClick={() => selectByOffset(1)}
                    aria-label={t("nextFinish")}
                  >
                    <ChevronRight className="h-4 w-4 rtl:hidden" aria-hidden="true" />
                    <ChevronLeft className="hidden h-4 w-4 rtl:block" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            {filteredFinishes.length === 0 ? (
              <p className="mt-5 text-sm text-muted-foreground">{tCommon("noResults")}</p>
            ) : (
              <ul
                ref={stripRef}
                aria-label={t("explorerTitle")}
                className="catalog-filmstrip mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
              >
                {filteredFinishes.map((finish) => {
                  const isActive = finish.code === activeFinish?.code;

                  return (
                    <li key={finish.id} className="w-[4.75rem] shrink-0 snap-center sm:w-[5.5rem]">
                      <button
                        type="button"
                        onClick={() => setActiveCode(finish.code)}
                        className={cn(
                          "group relative w-full overflow-hidden rounded-xl border text-start transition duration-300",
                          isActive
                            ? "border-primary shadow-[0_0_0_3px_rgb(230_126_34/0.25)]"
                            : "border-border/80 opacity-80 hover:border-primary/50 hover:opacity-100",
                        )}
                        aria-pressed={isActive}
                        aria-label={finish.code}
                      >
                        <div className="relative aspect-[4/5]">
                          <Image
                            src={finish.swatchImage}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                          {isActive ? (
                            <span className="absolute end-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                              <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" />
                            </span>
                          ) : null}
                        </div>
                        <p className="truncate bg-surface/95 px-1.5 py-1.5 text-center text-[10px] font-medium tracking-wide text-foreground sm:text-[11px]">
                          {finish.code}
                        </p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
