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
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--header-background)] backdrop-blur">
      <div className="container mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={routes.home()} className="shrink-0 transition-opacity hover:opacity-90" aria-label={t("nav.home")}>
          <BrandLogo locale={locale} priority />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label={t("nav.mainNavigation")}>
          {mainNavigation.map((item) => (
            <Link key={item.id} href={item.href()} className="brand-nav-link text-sm">
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <Link href={routes.requestQuote()} className="hidden sm:block">
            <Button size="sm">{t("nav.requestQuote")}</Button>
          </Link>
          <MobileNavigation locale={locale} />
        </div>
      </div>
    </header>
  );
}
