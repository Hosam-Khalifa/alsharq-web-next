"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { SLIDE_TRANSITION_MS } from "./data";
import type { BoardInfoProps } from "./types";

export const BoardInfo = memo(function BoardInfo({
  thicknessLabel,
  thicknessValue,
  catalogLabel,
  catalogHref,
  reducedMotion,
  boardId,
}: BoardInfoProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={boardId}
        id={`wpc-board-panel-${boardId}`}
        role="tabpanel"
        aria-labelledby={`wpc-board-tab-${boardId}`}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: reducedMotion ? 0 : SLIDE_TRANSITION_MS / 1000 }}
        className="wpc-showcase__info-card mx-auto mt-8 w-full max-w-md rounded-2xl px-6 py-5 sm:px-7 sm:py-6"
      >
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {thicknessLabel}
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
          {thicknessValue}
        </p>

        <Link href={catalogHref} className="mt-5 inline-block">
          <Button variant="outline" size="sm" className="h-9 px-4 text-xs sm:text-sm">
            {catalogLabel}
          </Button>
        </Link>

        <div className="mt-5 h-px w-full bg-border" aria-hidden="true" />
        <p className="mt-4 min-h-5 text-sm text-muted-foreground/80">
          {/* Reserved for future specifications */}
        </p>
      </motion.div>
    </AnimatePresence>
  );
});

BoardInfo.displayName = "BoardInfo";
