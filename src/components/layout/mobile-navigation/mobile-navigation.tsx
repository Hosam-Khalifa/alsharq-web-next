"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { mainNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/brand-logo/brand-logo";

interface MobileNavigationProps {
  locale: Locale;
}

export function MobileNavigation({ locale }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  return (
    <div className="lg:hidden">
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-nav" aria-label={t("nav.openMenu")}>
        <Menu className="h-4 w-4" />
      </Button>

      {open ? (
        <div id="mobile-nav" className="fixed inset-0 z-50 bg-background/95 backdrop-blur">
          <div className="flex items-center justify-between border-b border-border p-4">
            <Link href={routes.home()} onClick={() => setOpen(false)} aria-label={t("nav.home")}>
              <BrandLogo locale={locale} />
            </Link>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label={t("nav.closeMenu")}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-4" aria-label={t("nav.mainNavigation")}>
            {mainNavigation.map((item) => (
              <Link
                key={item.id}
                href={item.href()}
                className="rounded-md px-3 py-2 transition-colors hover:bg-accent-soft hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <Link href={routes.requestQuote()} className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-primary-foreground hover:bg-primary-hover" onClick={() => setOpen(false)}>
              {t("nav.requestQuote")}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
