"use client";

import { useEffect, useCallback, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { GalleryImage } from "@/data/gallery";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import { cn } from "@/lib/utils/cn";

interface GalleryLightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function GalleryLightbox({ images, index, onClose, onChange }: GalleryLightboxProps) {
  const t = useTranslations("gallery");
  const reducedMotion = useReducedMotion();
  const open = index != null;
  const image = index != null ? images[index] : null;

  const goPrevious = useCallback(() => {
    if (index == null || images.length === 0) return;
    onChange((index - 1 + images.length) % images.length);
  }, [images.length, index, onChange]);

  const goNext = useCallback(() => {
    if (index == null || images.length === 0) return;
    onChange((index + 1) % images.length);
  }, [images.length, index, onChange]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrevious();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrevious, onClose, open]);

  useEffect(() => {
    if (index == null) return;
    const neighbors = [images[index - 1], images[index + 1]].filter(Boolean) as GalleryImage[];
    neighbors.forEach((item) => {
      const preload = new window.Image();
      preload.src = item.src;
    });
  }, [images, index]);

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && image ? (
        <motion.div
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-[rgb(8_10_14/0.94)] p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t("imageOf", { current: (index ?? 0) + 1, total: images.length })}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          onKeyDown={handleDialogKeyDown}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute end-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-primary hover:bg-accent-soft sm:end-6 sm:top-6"
            aria-label={t("closeLightbox")}
          >
            <X className="h-5 w-5" />
          </button>

          <p className="absolute start-3 top-4 z-20 text-sm text-white/70 sm:start-6 sm:top-7">
            {t("imageOf", { current: (index ?? 0) + 1, total: images.length })}
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goPrevious();
            }}
            className="absolute start-2 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-primary hover:bg-accent-soft sm:start-5"
            aria-label={t("previousImage")}
          >
            <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            className="absolute end-2 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:border-primary hover:bg-accent-soft sm:end-5"
            aria-label={t("nextImage")}
          >
            <ChevronRight className="h-5 w-5 rtl:rotate-180" />
          </button>

          <motion.div
            key={image.id}
            className="relative h-[72vh] w-full max-w-6xl sm:h-[80vh]"
            onClick={(event) => event.stopPropagation()}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="100vw"
              priority
              className={cn("object-contain")}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
