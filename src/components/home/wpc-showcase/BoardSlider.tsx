"use client";

import { memo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { BoardSliderProps } from "./types";

function getRelativeOffset(index: number, activeIndex: number, total: number): number {
  let offset = index - activeIndex;

  if (offset > total / 2) {
    offset -= total;
  }

  if (offset < -total / 2) {
    offset += total;
  }

  return offset;
}

export const BoardSlider = memo(function BoardSlider({
  boards,
  activeIndex,
  direction,
  reducedMotion,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
}: BoardSliderProps) {
  const activeBoard = boards[activeIndex];

  const springTransition = reducedMotion
    ? { duration: 0 }
    : {
        type: "spring" as const,
        stiffness: 240,
        damping: 28,
        mass: 0.85,
      };

  const slideVariants = {
    enter: (slideDirection: number) => ({
      opacity: 0,
      x: slideDirection * 120,
      scale: 0.88,
      rotateY: slideDirection * -12,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
    },
    exit: (slideDirection: number) => ({
      opacity: 0,
      x: slideDirection * -120,
      scale: 0.82,
      rotateY: slideDirection * 12,
    }),
  };

  return (
    <div className="relative flex w-full items-center justify-center gap-3 sm:gap-4 md:gap-6">
      <button
        type="button"
        onClick={onPrevious}
        aria-label={previousLabel}
        className="brand-interactive-card z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface/80 text-foreground backdrop-blur-sm transition hover:-translate-y-0.5 sm:h-11 sm:w-11"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className="relative flex h-[340px] w-full max-w-[min(100%,22rem)] items-center justify-center sm:h-[420px] sm:max-w-[26rem] md:h-[500px] md:max-w-[32rem] lg:h-[min(72vh,720px)] lg:max-w-[38rem]"
        style={{ perspective: "1200px" }}
      >
        {boards.map((board, index) => {
          const offset = getRelativeOffset(index, activeIndex, boards.length);

          if (Math.abs(offset) !== 1) {
            return null;
          }

          const sideOffset = offset > 0 ? 1 : -1;

          return (
            <motion.div
              key={`preview-${board.id}`}
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-y-[12%] z-0 w-[42%]",
                offset > 0 ? "right-0" : "left-0",
              )}
              initial={false}
              animate={{
                opacity: 0.25,
                scale: 0.82,
                x: sideOffset * 24,
                filter: reducedMotion ? "blur(0px)" : "blur(3px)",
              }}
              transition={springTransition}
            >
              <div className="relative h-full w-full">
                <Image
                  src={board.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 40vw, 240px"
                  className="object-contain"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeBoard.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={springTransition}
            className="absolute inset-0 z-10 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative h-full w-full">
              <Image
                src={activeBoard.image}
                alt=""
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 560px"
                className="wpc-showcase__board-shadow object-contain"
                draggable={false}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className="brand-interactive-card z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface/80 text-foreground backdrop-blur-sm transition hover:-translate-y-0.5 sm:h-11 sm:w-11"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
});

BoardSlider.displayName = "BoardSlider";
