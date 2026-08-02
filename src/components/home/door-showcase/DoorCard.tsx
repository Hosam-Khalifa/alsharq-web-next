"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { doorCardStyles } from "./styles";

interface DoorCardProps {
  doorSrc: string;
  code: string;
  reducedMotion: boolean;
  priority?: boolean;
}

export function DoorCard({ doorSrc, code, reducedMotion, priority = false }: DoorCardProps) {
  return (
    <motion.div
      className={doorCardStyles.root}
      animate={reducedMotion ? undefined : { y: [0, -4, 0] }}
      transition={
        reducedMotion
          ? undefined
          : {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <Image
        src={doorSrc}
        alt={code}
        width={320}
        height={620}
        priority={priority}
        className={doorCardStyles.image}
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 32vw, 280px"
      />
    </motion.div>
  );
}
