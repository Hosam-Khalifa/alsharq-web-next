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
    <div className="flex items-center gap-1 rounded-md border border-border p-1" role="group" aria-label={t("label")}>
      {(["ar", "en"] as const).map((value) => (
        <Button
          key={value}
          variant={locale === value ? "primary" : "ghost"}
          size="sm"
          onClick={() => router.replace(pathname, { locale: value })}
          aria-pressed={locale === value}
        >
          {t(value)}
        </Button>
      ))}
      <span className="sr-only">{alternateLocale}</span>
    </div>
  );
}
