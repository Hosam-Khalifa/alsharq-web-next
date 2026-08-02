"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { galleryImages } from "@/data/gallery";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import { GalleryLightbox } from "./GalleryLightbox";

export function GalleryGrid() {
  const t = useTranslations("gallery");
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div
        id="gallery-grid"
        className="gallery-masonry"
        role="list"
        aria-label={t("gridAriaLabel")}
      >
        {galleryImages.map((image, index) => (
          <motion.button
            key={image.id}
            type="button"
            role="listitem"
            className="gallery-masonry__item group relative mb-3 w-full break-inside-avoid overflow-hidden rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary sm:mb-4"
            onClick={() => setActiveIndex(index)}
            aria-label={`${t("openImage")} ${index + 1}`}
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: "-40px" }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.55, delay: Math.min(index % 6, 5) * 0.05, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <span className="relative block w-full" style={{ aspectRatio: `${image.width} / ${image.height}` }}>
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              />
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(10_12_16/0.45)_100%)] opacity-0 transition duration-500 group-hover:opacity-100"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-start scale-x-0 bg-primary transition duration-500 group-hover:scale-x-100"
            />
          </motion.button>
        ))}
      </div>

      <GalleryLightbox
        images={galleryImages}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </>
  );
}
