"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { getAlternateLocale } from "@/lib/i18n/locale-utils";
import type { Locale } from "@/types";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");
  const alternateLocale = getAlternateLocale(locale);

  return (
    <div
      className="flex items-center gap-0.5 rounded-md border border-border p-0.5 sm:gap-1 sm:p-1"
      role="group"
      aria-label={t("label")}
    >
      {(["ar", "en"] as const).map((value) => (
        <Button
          key={value}
          variant={locale === value ? "primary" : "ghost"}
          size="sm"
          className="min-h-9 min-w-9 px-2 text-xs sm:min-h-8 sm:px-3 sm:text-sm"
          onClick={() => router.replace(pathname, { locale: value })}
          aria-pressed={locale === value}
          aria-label={t(value)}
        >
          <span className="md:hidden" aria-hidden="true">
            {value === "ar" ? "ع" : "EN"}
          </span>
          <span className="hidden md:inline">{t(value)}</span>
        </Button>
      ))}
      <span className="sr-only">{alternateLocale}</span>
    </div>
  );
}
