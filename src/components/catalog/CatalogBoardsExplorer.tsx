"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Ruler, Layers, Weight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { catalogFinishes } from "@/data/catalog";
import {
  catalogBoards,
  CATALOG_BOARD_SERVICES,
  CATALOG_BOARD_SURFACES,
} from "@/data/catalog-boards";
import type { BoardThicknessMm } from "@/data/board-specs";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import { cn } from "@/lib/utils/cn";

export function CatalogBoardsExplorer() {
  const t = useTranslations("catalog");
  const reducedMotion = useReducedMotion();
  const [activeThickness, setActiveThickness] = useState<BoardThicknessMm>("12");

  const activeBoard = useMemo(
    () => catalogBoards.find((board) => board.thicknessMm === activeThickness) ?? catalogBoards[0],
    [activeThickness],
  );

  const textureSamples = catalogFinishes.slice(0, 8);

  return (
    <section id="boards-catalog" className="catalog-studio scroll-mt-20 py-14 md:py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {t("boardsExplorerEyebrow")}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("boardsExplorerTitle")}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("boardsExplorerSubtitle")}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {catalogBoards.map((board) => {
            const selected = board.thicknessMm === activeThickness;
            return (
              <button
                key={board.thicknessMm}
                type="button"
                onClick={() => setActiveThickness(board.thicknessMm)}
                aria-pressed={selected}
                className={cn(
                  "min-w-[4.5rem] rounded-full border px-4 py-2 text-sm font-semibold transition",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-foreground hover:border-primary/50",
                )}
              >
                {board.thicknessMm} {t("boardsMm")}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="catalog-studio__stage relative mx-auto flex aspect-[4/5] w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-border lg:max-w-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBoard.thicknessMm}
                className="relative h-[88%] w-[58%]"
                initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={activeBoard.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 60vw, 30vw"
                  className="object-contain object-center drop-shadow-[0_25px_45px_rgb(0_0_0/0.35)]"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div>
            <p className="text-sm font-semibold text-primary">
              {t("boardsActiveThickness", { thickness: activeBoard.thicknessMm })}
            </p>
            <dl className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-primary">
                  <Ruler className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">{t("boardsSizeLabel")}</dt>
                  <dd className="mt-0.5 text-base font-semibold text-foreground">
                    {activeBoard.sizeMm}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-primary">
                  <Layers className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">{t("boardsThicknessLabel")}</dt>
                  <dd className="mt-0.5 text-base font-semibold text-foreground">
                    {activeBoard.thicknessMm} {t("boardsMm")}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-primary">
                  <Weight className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">{t("boardsDensityLabel")}</dt>
                  <dd className="mt-0.5 text-base font-semibold text-foreground">
                    {activeBoard.density}
                  </dd>
                </div>
              </div>
            </dl>

            <Link href={routes.requestQuote({ category: "boards" })} className="mt-7 inline-flex">
              <Button size="lg">{t("requestQuoteForItem")}</Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {CATALOG_BOARD_SERVICES.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border border-border bg-surface px-5 py-5 shadow-[var(--shadow-soft)]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {t(service.titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(service.textKey)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              {t("boardsSurfacesTitle")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t("boardsSurfacesSubtitle")}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CATALOG_BOARD_SURFACES.map((surface) => (
              <div
                key={surface.id}
                className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
              >
                <h4 className="text-lg font-semibold text-foreground">{t(surface.titleKey)}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(surface.textKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-surface p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">{t("boardsTextureSamples")}</p>
              <Link href={routes.catalogDoors()} className="text-sm font-medium text-primary hover:underline">
                {t("boardsBrowseDoorTextures")}
              </Link>
            </div>
            <ul className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {textureSamples.map((finish) => (
                <li key={finish.id} className="shrink-0">
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border sm:h-24 sm:w-24">
                    <Image
                      src={finish.swatchImage}
                      alt={finish.code}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-1.5 text-center text-xs text-muted-foreground">{finish.code}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
