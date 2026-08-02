import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { mainNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/brand-logo/brand-logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher/language-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-switcher/theme-switcher";
import { MobileNavigation } from "@/components/layout/mobile-navigation/mobile-navigation";

interface HeaderProps {
  locale: Locale;
}

export async function Header({ locale }: HeaderProps) {
  const t = await getTranslations({ locale });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--header-background)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_srgb,var(--header-background)_92%,transparent)]">
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        <Link
          href={routes.home()}
          className="min-w-0 shrink transition-opacity hover:opacity-90"
          aria-label={t("nav.home")}
        >
          <BrandLogo locale={locale} priority className="h-8 w-[7.5rem] sm:h-9 sm:w-[8.75rem] lg:h-10 lg:w-[9.25rem]" />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label={t("nav.mainNavigation")}>
          {mainNavigation.map((item) => (
            <Link key={item.id} href={item.href()} className="brand-nav-link text-sm">
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 md:gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Link href={routes.requestQuote()} className="hidden sm:block">
            <Button size="sm">{t("nav.requestQuote")}</Button>
          </Link>
          <MobileNavigation locale={locale} />
        </div>
      </div>
    </header>
  );
}
