"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { textureCardStyles } from "./styles";
import { SLIDE_TRANSITION_MS } from "./data";

interface TextureCardProps {
  textureSrc: string;
  code: string;
  catalogPreviewLabel: string;
  catalogHref: string;
  reducedMotion: boolean;
}

export function TextureCard({
  textureSrc,
  code,
  catalogPreviewLabel,
  catalogHref,
  reducedMotion,
}: TextureCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={textureCardStyles.root}
        whileHover={reducedMotion ? undefined : { y: -3 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={textureSrc}
            className="absolute inset-0"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
            transition={{ duration: reducedMotion ? 0 : SLIDE_TRANSITION_MS / 1000, ease: "easeOut" }}
          >
            <Image src={textureSrc} alt="" fill className={textureCardStyles.image} sizes="148px" />
          </motion.div>
        </AnimatePresence>
        <span className="sr-only">{code}</span>
      </motion.div>

      <Link href={catalogHref}>
        <Button variant="outline" size="sm" className="h-9 px-4 text-xs sm:text-sm">
          {catalogPreviewLabel}
        </Button>
      </Link>
    </div>
  );
}
