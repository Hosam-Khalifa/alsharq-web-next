import Image from "next/image";
import { brandAssets } from "@/config/brand-assets";
import { company } from "@/config/company";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils/cn";

const LOGO_WIDTH = 2000;
const LOGO_HEIGHT = 541;

interface BrandLogoProps {
  locale: Locale;
  className?: string;
  priority?: boolean;
  /** theme: follows light/dark. onDark/onLight: force a version for fixed backgrounds. */
  variant?: "theme" | "onDark" | "onLight";
}

export function BrandLogo({
  locale,
  className,
  priority = false,
  variant = "theme",
}: BrandLogoProps) {
  const alt = company.name[locale];
  const sharedClassName = "h-full w-full object-contain object-start";

  return (
    <span
      className={cn(
        "relative inline-flex h-9 w-[8.25rem] shrink-0 overflow-hidden sm:h-10 sm:w-[9.25rem]",
        className,
      )}
    >
      {variant === "theme" ? (
        <>
          <Image
            src={brandAssets.logoLight}
            alt={alt}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority={priority}
            sizes="160px"
            className={cn(sharedClassName, "dark:hidden")}
          />
          <Image
            src={brandAssets.logoDark}
            alt=""
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority={priority}
            sizes="160px"
            aria-hidden="true"
            className={cn(sharedClassName, "hidden dark:block")}
          />
        </>
      ) : (
        <Image
          src={variant === "onDark" ? brandAssets.logoDark : brandAssets.logoLight}
          alt={alt}
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority={priority}
          sizes="160px"
          className={sharedClassName}
        />
      )}
    </span>
  );
}
