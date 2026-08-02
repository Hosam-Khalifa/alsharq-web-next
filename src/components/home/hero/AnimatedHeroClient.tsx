"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { HERO_ASSETS } from "./hero-assets";
import { HeroFeatureBar, type HeroFeatureItem } from "./HeroFeatureBar";
import { useReducedMotion } from "./use-reduced-motion";
import "./factory-hero.css";
import "./hero-motion.css";

interface AnimatedHeroClientProps {
  title: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  featureItems?: HeroFeatureItem[];
  featureAriaLabel?: string;
}

export function AnimatedHeroClient({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  featureItems = [],
  featureAriaLabel,
}: AnimatedHeroClientProps) {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  const updateParallax = useCallback(() => {
    const element = heroRef.current;
    if (!element || reducedMotion) return;

    const rect = element.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
    const layer = element.querySelector<HTMLElement>(".factory-hero__parallax");
    if (!layer) return;

    layer.style.transform = `translate3d(0, ${progress * 28}px, 0) scale(1.02)`;
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    window.addEventListener("scroll", updateParallax, { passive: true });
    updateParallax();

    return () => window.removeEventListener("scroll", updateParallax);
  }, [reducedMotion, updateParallax]);

  return (
    <section
      ref={heroRef}
      className="factory-hero border-b border-border bg-brand-charcoal"
      aria-label={title}
    >
      <div className="factory-hero__media" aria-hidden="true">
        <div
          className={cn(
            "factory-hero__ken-burns factory-hero__parallax",
            !reducedMotion && "factory-hero__ken-burns--animate",
          )}
        >
          {mounted ? (
            <>
              <Image
                src={HERO_ASSETS.factoryLight}
                alt=""
                fill
                priority
                sizes="100vw"
                className={cn(
                  "factory-hero__image",
                  isDark ? "opacity-0" : "opacity-100",
                )}
              />
              <Image
                src={HERO_ASSETS.factoryDark}
                alt=""
                fill
                priority
                sizes="100vw"
                className={cn(
                  "factory-hero__image",
                  isDark ? "opacity-100" : "opacity-0",
                )}
              />
            </>
          ) : (
            <div className="h-full w-full bg-brand-charcoal" />
          )}
        </div>
      </div>

      <div className="factory-hero__overlay-horizontal" aria-hidden="true" />
      <div className="factory-hero__overlay-vertical" aria-hidden="true" />

      <div
        className={cn(
          "factory-hero__content",
          !reducedMotion && "factory-hero__content--animate",
        )}
      >
        <h1 className="sr-only">{title}</h1>
        <p className="factory-hero__subtitle max-w-[36ch] text-sm leading-relaxed sm:text-base lg:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {primaryHref.startsWith("#") ? (
            <a
              href={primaryHref}
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-primary-hover active:bg-primary-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {primaryLabel}
            </a>
          ) : (
            <Link href={primaryHref}>
              <Button size="lg">{primaryLabel}</Button>
            </Link>
          )}
          {secondaryLabel && secondaryHref ? (
            secondaryHref.startsWith("#") ? (
              <a
                href={secondaryHref}
                className="inline-flex h-11 items-center justify-center rounded-md border border-[rgb(245_245_244/0.55)] bg-transparent px-6 text-base font-medium text-[#f5f5f4] transition-colors hover:border-primary hover:bg-accent-soft hover:text-[#f5f5f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link href={secondaryHref}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[rgb(245_245_244/0.55)] text-[#f5f5f4] hover:border-primary hover:bg-accent-soft hover:text-[#f5f5f4]"
                >
                  {secondaryLabel}
                </Button>
              </Link>
            )
          ) : null}
        </div>
      </div>

      {featureItems.length > 0 && featureAriaLabel ? (
        <HeroFeatureBar items={featureItems} ariaLabel={featureAriaLabel} />
      ) : null}
    </section>
  );
}
