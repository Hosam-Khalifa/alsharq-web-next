"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import { DoorCard } from "./DoorCard";
import { TextureCard } from "./TextureCard";
import { Navigation } from "./Navigation";
import { Platform } from "./Platform";
import {
  AUTOPLAY_INTERVAL_MS,
  AUTOPLAY_RESUME_MS,
  DOOR_PRODUCTS,
  DOOR_SHOWCASE_ASSETS,
  SLIDE_TRANSITION_MS,
  SWIPE_THRESHOLD_PX,
} from "./data";
import { doorShowcaseStyles } from "./styles";
import type { DoorShowcaseProps, SlideDirection } from "./types";

export function DoorShowcase({
  sectionAriaLabel,
  previousLabel,
  nextLabel,
  catalogPreviewLabel,
  catalogHref,
  productNames,
}: DoorShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<SlideDirection>(1);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const resumeAutoplayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeProduct = DOOR_PRODUCTS[activeIndex];
  const displayName = productNames[activeProduct.code] ?? activeProduct.name;

  const pauseAutoplay = useCallback(() => {
    setAutoplayEnabled(false);
    if (resumeAutoplayTimeout.current) {
      clearTimeout(resumeAutoplayTimeout.current);
    }
    resumeAutoplayTimeout.current = setTimeout(() => {
      setAutoplayEnabled(true);
    }, AUTOPLAY_RESUME_MS);
  }, []);

  const goToIndex = useCallback(
    (index: number, slideDirection: SlideDirection, fromAutoplay = false) => {
      if (index === activeIndex) return;
      setDirection(slideDirection);
      setActiveIndex(index);
      if (!fromAutoplay) {
        pauseAutoplay();
      }
    },
    [activeIndex, pauseAutoplay],
  );

  const goNext = useCallback(
    (fromAutoplay = false) => {
      goToIndex((activeIndex + 1) % DOOR_PRODUCTS.length, 1, fromAutoplay);
    },
    [activeIndex, goToIndex],
  );

  const goPrevious = useCallback(() => {
    goToIndex((activeIndex - 1 + DOOR_PRODUCTS.length) % DOOR_PRODUCTS.length, -1);
  }, [activeIndex, goToIndex]);

  useEffect(() => {
    DOOR_PRODUCTS.forEach((product) => {
      const doorImage = new window.Image();
      doorImage.src = product.door;
      const textureImage = new window.Image();
      textureImage.src = product.texture;
    });

    const lightBg = new window.Image();
    lightBg.src = DOOR_SHOWCASE_ASSETS.backgroundLight;
    const darkBg = new window.Image();
    darkBg.src = DOOR_SHOWCASE_ASSETS.backgroundDark;
    const platformImage = new window.Image();
    platformImage.src = DOOR_SHOWCASE_ASSETS.platform;
  }, []);

  useEffect(() => {
    if (!autoplayEnabled || reducedMotion) return;

    const interval = window.setInterval(() => goNext(true), AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [autoplayEnabled, goNext, reducedMotion]);

  useEffect(
    () => () => {
      if (resumeAutoplayTimeout.current) {
        clearTimeout(resumeAutoplayTimeout.current);
      }
    },
    [],
  );

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

    if (delta > 0) {
      goPrevious();
      return;
    }
    goNext();
  };

  const slideVariants = {
    enter: (slideDirection: SlideDirection) => ({
      opacity: 0,
      x: slideDirection * 80,
      scale: 0.9,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (slideDirection: SlideDirection) => ({
      opacity: 0,
      x: slideDirection * -80,
      scale: 0.96,
    }),
  };

  const slideTransition = reducedMotion
    ? { duration: 0 }
    : {
        duration: SLIDE_TRANSITION_MS / 1000,
        type: "spring" as const,
        bounce: 0.28,
      };

  return (
    <section
      ref={sectionRef}
      className={doorShowcaseStyles.root}
      aria-roledescription="carousel"
      aria-label={sectionAriaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={doorShowcaseStyles.background} aria-hidden="true">
        {mounted ? (
          <>
            <Image
              src={DOOR_SHOWCASE_ASSETS.backgroundLight}
              alt=""
              fill
              className={cn(
                doorShowcaseStyles.backgroundImage,
                isDark ? "opacity-0" : "opacity-100",
              )}
              sizes="100vw"
            />
            <Image
              src={DOOR_SHOWCASE_ASSETS.backgroundDark}
              alt=""
              fill
              className={cn(
                doorShowcaseStyles.backgroundImage,
                isDark ? "opacity-100" : "opacity-0",
              )}
              sizes="100vw"
            />
          </>
        ) : (
          <div className="h-full w-full bg-surface-muted" />
        )}
      </div>

      <div className={doorShowcaseStyles.overlay} aria-hidden="true" />

      <div className={doorShowcaseStyles.content}>
        <div
          className={doorShowcaseStyles.stage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Navigation direction="previous" label={previousLabel} onClick={goPrevious} />

          <div className={doorShowcaseStyles.doorArea}>
            <div className={doorShowcaseStyles.doorSlot}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeProduct.code}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={slideTransition}
                  className="absolute inset-0"
                >
                  <DoorCard
                    doorSrc={activeProduct.door}
                    code={activeProduct.code}
                    reducedMotion={reducedMotion}
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <Platform />
          </div>

          <Navigation direction="next" label={nextLabel} onClick={() => goNext()} />
        </div>

        <div className={doorShowcaseStyles.info} aria-live="polite" aria-atomic="true">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeProduct.code}-code`}
              className={doorShowcaseStyles.code}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : SLIDE_TRANSITION_MS / 1000 }}
            >
              {activeProduct.code}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeProduct.code}-name`}
              className={doorShowcaseStyles.name}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : SLIDE_TRANSITION_MS / 1000, delay: reducedMotion ? 0 : 0.04 }}
            >
              {displayName}
            </motion.p>
          </AnimatePresence>

          <TextureCard
            textureSrc={activeProduct.texture}
            code={activeProduct.code}
            catalogPreviewLabel={catalogPreviewLabel}
            catalogHref={catalogHref}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="mt-5 flex items-center gap-2" role="tablist" aria-label={sectionAriaLabel}>
          {DOOR_PRODUCTS.map((product, index) => (
            <button
              key={product.code}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={productNames[product.code] ?? product.name}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index === activeIndex ? "w-8 bg-accent" : "w-2.5 bg-border-strong hover:bg-accent/60",
              )}
              onClick={() => goToIndex(index, index > activeIndex ? 1 : -1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
