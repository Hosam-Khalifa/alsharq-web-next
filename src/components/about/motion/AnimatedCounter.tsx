"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/components/home/hero/use-reduced-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) {
      return;
    }

    hasStarted.current = true;

    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => setDisplayValue(value));
      return () => window.cancelAnimationFrame(frame);
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, reducedMotion, value]);

  return (
    <motion.div
      ref={ref}
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-white/75 sm:text-base">{label}</p>
    </motion.div>
  );
}
