"use client";

import { memo } from "react";
import { cn } from "@/lib/utils/cn";
import type { BoardSelectorProps } from "./types";

export const BoardSelector = memo(function BoardSelector({
  boards,
  activeIndex,
  selectorAriaLabel,
  selectorLabels,
  onSelect,
}: BoardSelectorProps) {
  return (
    <div
      className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:gap-x-8 md:gap-x-10"
      role="tablist"
      aria-label={selectorAriaLabel}
    >
      {boards.map((board, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={board.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`wpc-board-panel-${board.id}`}
            id={`wpc-board-tab-${board.id}`}
            onClick={() => onSelect(index)}
            className={cn(
              "relative px-1 pb-2 text-sm tracking-wide transition duration-200 sm:text-base",
              "hover:text-brand-copper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "wpc-showcase__selector-active font-semibold text-foreground"
                : "font-medium text-muted-foreground hover:-translate-y-0.5",
            )}
          >
            {selectorLabels[board.id]}
          </button>
        );
      })}
    </div>
  );
});

BoardSelector.displayName = "BoardSelector";
