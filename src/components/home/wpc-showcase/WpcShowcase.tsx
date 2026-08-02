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
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import { BoardInfo } from "./BoardInfo";
import { BoardSelector } from "./BoardSelector";
import { BoardSlider } from "./BoardSlider";
import { SWIPE_THRESHOLD_PX, WPC_BOARDS, WPC_SHOWCASE_ASSETS } from "./data";
import type { SlideDirection, WpcShowcaseLabels } from "./types";
import "./wpc-showcase.css";

export function WpcShowcase({
  sectionAriaLabel,
  title,
  subtitle,
  previousLabel,
  nextLabel,
  thicknessLabel,
  selectorAriaLabel,
  catalogLabel,
  catalogHref,
  selectorLabels,
  thicknessValues,
}: WpcShowcaseLabels) {
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const wheelLock = useRef(false);
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

  const activeBoard = WPC_BOARDS[activeIndex];

  const goToIndex = useCallback((index: number, slideDirection: SlideDirection) => {
    if (index === activeIndex) {
      return;
    }

    setDirection(slideDirection);
    setActiveIndex(index);
  }, [activeIndex]);

  const goNext = useCallback(() => {
    goToIndex((activeIndex + 1) % WPC_BOARDS.length, 1);
  }, [activeIndex, goToIndex]);

  const goPrevious = useCallback(() => {
    goToIndex((activeIndex - 1 + WPC_BOARDS.length) % WPC_BOARDS.length, -1);
  }, [activeIndex, goToIndex]);

  useEffect(() => {
    WPC_BOARDS.forEach((board) => {
      const image = new window.Image();
      image.src = board.image;
    });

    const lightBg = new window.Image();
    lightBg.src = WPC_SHOWCASE_ASSETS.backgroundLight;
    const darkBg = new window.Image();
    darkBg.src = WPC_SHOWCASE_ASSETS.backgroundDark;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8) {
        return;
      }

      event.preventDefault();

      if (wheelLock.current) {
        return;
      }

      wheelLock.current = true;
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 450);

      if (event.deltaY > 0) {
        goNext();
        return;
      }

      goPrevious();
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => section.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrevious]);

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

    if (startX == null || endX == null) {
      return;
    }

    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) {
      return;
    }

    if (delta > 0) {
      goPrevious();
      return;
    }

    goNext();
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-border py-14 md:py-16 lg:py-20"
      aria-roledescription="carousel"
      aria-label={sectionAriaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {mounted ? (
          <>
            <Image
              src={WPC_SHOWCASE_ASSETS.backgroundLight}
              alt=""
              fill
              className={cn(
                "wpc-showcase__background-image",
                isDark ? "opacity-0" : "opacity-100",
              )}
              sizes="100vw"
            />
            <Image
              src={WPC_SHOWCASE_ASSETS.backgroundDark}
              alt=""
              fill
              className={cn(
                "wpc-showcase__background-image",
                isDark ? "opacity-100" : "opacity-0",
              )}
              sizes="100vw"
            />
          </>
        ) : (
          <div className="h-full w-full bg-surface-muted" />
        )}
      </div>

      <div
        className="absolute inset-0 -z-10 bg-background/20 dark:bg-background/35"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">{subtitle}</p>
        </div>

        <div
          className="mx-auto mt-10 max-w-5xl md:mt-12"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <BoardSlider
            boards={WPC_BOARDS}
            activeIndex={activeIndex}
            direction={direction}
            reducedMotion={reducedMotion}
            previousLabel={previousLabel}
            nextLabel={nextLabel}
            onPrevious={goPrevious}
            onNext={goNext}
          />

          <BoardSelector
            boards={WPC_BOARDS}
            activeIndex={activeIndex}
            selectorAriaLabel={selectorAriaLabel}
            selectorLabels={selectorLabels}
            onSelect={(index) => goToIndex(index, index > activeIndex ? 1 : -1)}
          />

          <BoardInfo
            thicknessLabel={thicknessLabel}
            thicknessValue={thicknessValues[activeBoard.id]}
            catalogLabel={catalogLabel}
            catalogHref={catalogHref}
            reducedMotion={reducedMotion}
            boardId={activeBoard.id}
          />
        </div>
      </div>
    </section>
  );
}
