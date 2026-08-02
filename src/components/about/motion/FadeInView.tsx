"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";
import type { AboutMotionDirection } from "../types";

const directionOffset: Record<AboutMotionDirection, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  scale: { scale: 0.94 },
};

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  direction?: AboutMotionDirection;
  delay?: number;
}

export function FadeInView({
  children,
  className,
  direction = "up",
  delay = 0,
}: FadeInViewProps) {
  const reducedMotion = useReducedMotion();
  const offset = directionOffset[direction];

  return (
    <motion.div
      className={cn(className)}
      initial={reducedMotion ? false : { opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2, margin: "-60px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
