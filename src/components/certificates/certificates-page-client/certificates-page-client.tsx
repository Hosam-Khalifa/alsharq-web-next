"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { certificates } from "@/data/certificates";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/types";

const SWIPE_THRESHOLD_PX = 48;
const AUTOPLAY_MS = 5500;

type SlideDirection = 1 | -1;

export function CertificatesPageClient() {
  const t = useTranslations("certificates");
  const locale = useLocale() as Locale;
  const reducedMotion = useReducedMotion();
  const items = useMemo(
    () => certificates.slice().sort((a, b) => a.order - b.order),
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const active = items[activeIndex];
  const prevIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  const pauseAutoplay = useCallback(() => {
    setAutoplayEnabled(false);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setAutoplayEnabled(true), 9000);
  }, []);

  const goToIndex = useCallback(
    (index: number, slideDirection: SlideDirection, fromAutoplay = false) => {
      if (index === activeIndex) return;
      setDirection(slideDirection);
      setActiveIndex(index);
      if (!fromAutoplay) pauseAutoplay();
    },
    [activeIndex, pauseAutoplay],
  );

  const goNext = useCallback(
    (fromAutoplay = false) => {
      goToIndex((activeIndex + 1) % items.length, 1, fromAutoplay);
    },
    [activeIndex, goToIndex, items.length],
  );

  const goPrevious = useCallback(() => {
    goToIndex((activeIndex - 1 + items.length) % items.length, -1);
  }, [activeIndex, goToIndex, items.length]);

  useEffect(() => {
    items.forEach((item) => {
      const image = new window.Image();
      image.src = item.image;
    });
  }, [items]);

  useEffect(() => {
    if (!autoplayEnabled || reducedMotion) return;
    const id = window.setInterval(() => goNext(true), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplayEnabled, goNext, reducedMotion]);

  useEffect(
    () => () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    },
    [],
  );

  useEffect(() => {
    const thumb = thumbsRef.current?.querySelector<HTMLElement>(`[data-thumb="${active.id}"]`);
    thumb?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [active.id, reducedMotion]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    }
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;
    if (startX == null || endX == null) return;

    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta > 0) goPrevious();
    else goNext();
  };

  const spring = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 240, damping: 28, mass: 0.85 };

  const variants = {
    enter: (slideDirection: SlideDirection) => ({
      opacity: 0,
      x: slideDirection * 90,
      scale: 0.92,
    }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (slideDirection: SlideDirection) => ({
      opacity: 0,
      x: slideDirection * -90,
      scale: 0.92,
    }),
  };

  return (
    <section
      className="relative outline-none"
      aria-roledescription="carousel"
      aria-label={t("sliderAriaLabel")}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="relative flex items-center justify-center gap-2 sm:gap-4 md:gap-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={goPrevious}
          aria-label={t("previousCertificate")}
          className="brand-interactive-card z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface/90 text-foreground backdrop-blur-sm transition hover:-translate-y-0.5"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="relative flex min-h-[320px] w-full max-w-3xl items-center justify-center sm:min-h-[380px] md:min-h-[440px]">
          {/* Side previews */}
          {[
            { index: prevIndex, side: "start" as const },
            { index: nextIndex, side: "end" as const },
          ].map(({ index, side }) => {
            const cert = items[index];
            return (
              <button
                key={`${side}-${cert.id}`}
                type="button"
                aria-label={cert.title[locale]}
                onClick={() => goToIndex(index, side === "end" ? 1 : -1)}
                className={cn(
                  "pointer-events-auto absolute top-1/2 z-0 hidden w-[18%] -translate-y-1/2 opacity-25 transition hover:opacity-45 md:block",
                  side === "start" ? "start-0" : "end-0",
                )}
              >
                <div
                  className={cn(
                    "relative mx-auto overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--shadow-soft)]",
                    cert.orientation === "portrait" ? "aspect-[3/4] w-full" : "aspect-[4/3] w-full",
                  )}
                >
                  <Image
                    src={cert.image}
                    alt=""
                    fill
                    sizes="140px"
                    className="object-contain bg-surface-muted"
                    aria-hidden="true"
                  />
                </div>
              </button>
            );
          })}

          {/* Active slide */}
          <div className="relative z-10 w-full max-w-[min(100%,18rem)] sm:max-w-[20rem] md:max-w-[22rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={spring}
                className="relative"
              >
                <div
                  className={cn(
                    "relative mx-auto max-h-[55vh] overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-elevated)] sm:max-h-[58vh] md:max-h-[60vh]",
                    active.orientation === "portrait"
                      ? "aspect-[3/4] w-full"
                      : "aspect-[4/3] w-full",
                  )}
                >
                  <Image
                    src={active.image}
                    alt={active.title[locale]}
                    fill
                    priority={activeIndex === 0}
                    sizes="(max-width: 768px) 70vw, 360px"
                    className="object-contain bg-surface-muted p-2 sm:p-3"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          onClick={() => goNext()}
          aria-label={t("nextCertificate")}
          className="brand-interactive-card z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface/90 text-foreground backdrop-blur-sm transition hover:-translate-y-0.5"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-3xl flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center gap-2" aria-live="polite">
          <p className="text-base font-semibold text-foreground sm:text-lg">{active.title[locale]}</p>
          <p className="text-sm text-muted-foreground" dir="ltr">
            {activeIndex + 1} / {items.length}
          </p>
        </div>

        <div className="mt-8 flex w-full justify-center overflow-x-auto px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            ref={thumbsRef}
            className="mx-auto flex w-max max-w-none justify-center gap-3"
            role="tablist"
            aria-label={t("thumbnailsAriaLabel")}
          >
            {items.map((cert, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={cert.id}
                  type="button"
                  role="tab"
                  data-thumb={cert.id}
                  aria-selected={isActive}
                  aria-label={cert.title[locale]}
                  onClick={() => goToIndex(index, index > activeIndex ? 1 : -1)}
                  className={cn(
                    "relative h-16 w-12 shrink-0 overflow-hidden rounded-lg border transition sm:h-20 sm:w-14",
                    isActive
                      ? "border-primary shadow-[0_0_0_2px_rgb(230_126_34/0.25)]"
                      : "border-border opacity-70 hover:opacity-100",
                  )}
                >
                  <Image
                    src={cert.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
