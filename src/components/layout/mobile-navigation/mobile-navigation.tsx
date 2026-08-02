"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { mainNavigation } from "@/config/navigation";
import { routes } from "@/config/routes";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/i18n/locale-utils";
import type { Locale } from "@/types";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/shared/brand-logo/brand-logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher/language-switcher";
import { ThemeSwitcher } from "@/components/layout/theme-switcher/theme-switcher";
import { cn } from "@/lib/utils/cn";

interface MobileNavigationProps {
  locale: Locale;
}

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function MobileNavigation({ locale }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const mounted = useIsClient();
  const t = useTranslations();
  const pathname = usePathname();
  const activeLocale = useLocale();
  const routeKey = `${pathname}::${activeLocale}`;
  const [seenRouteKey, setSeenRouteKey] = useState(routeKey);
  const titleId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollYRef = useRef(0);

  if (seenRouteKey !== routeKey) {
    setSeenRouteKey(routeKey);
    if (open) setOpen(false);
  }

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    scrollYRef.current = window.scrollY;
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.classList.add("mobile-nav-open");
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    if (scrollbarWidth > 0) {
      body.style.paddingInlineEnd = `${scrollbarWidth}px`;
    }

    return () => {
      body.classList.remove("mobile-nav-open");
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingInlineEnd = "";
      window.scrollTo(0, scrollYRef.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const menuButton = menuButtonRef.current;
    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [closeMenu, open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const panel =
    open && mounted ? (
      <div
        id="mobile-nav"
        className="mobile-nav-root"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          className="mobile-nav-scrim"
          aria-label={t("nav.closeMenu")}
          onClick={closeMenu}
          tabIndex={-1}
        />

        <div
          ref={panelRef}
          className="mobile-nav-panel"
          onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
            if (event.key === "Escape") closeMenu();
          }}
        >
          <div className="mobile-nav-panel__top">
            <Link
              href={routes.home()}
              onClick={closeMenu}
              aria-label={t("nav.home")}
              className="min-w-0 shrink"
            >
              <BrandLogo locale={locale} className="h-8 w-[7.75rem]" />
            </Link>
            <Button
              ref={closeButtonRef}
              variant="outline"
              size="sm"
              onClick={closeMenu}
              aria-label={t("nav.closeMenu")}
              className="mobile-nav-panel__close"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mobile-nav-panel__body">
            <p id={titleId} className="mobile-nav-section-label">
              {t("nav.mainNavigation")}
            </p>

            <nav className="mobile-nav-links" aria-label={t("nav.mainNavigation")}>
              {mainNavigation.map((item) => {
                const href = item.href();
                const active = isActive(href);
                return (
                  <Link
                    key={item.id}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn("mobile-nav-link", active && "mobile-nav-link--active")}
                    onClick={closeMenu}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </nav>

            <div className="mobile-nav-controls">
              <div>
                <p className="mobile-nav-section-label">{t("language.label")}</p>
                <LanguageSwitcher />
              </div>
              <div>
                <p className="mobile-nav-section-label">{t("theme.label")}</p>
                <ThemeSwitcher />
              </div>
            </div>
          </div>

          <div className="mobile-nav-panel__footer">
            <Link href={routes.requestQuote()} className="mobile-nav-cta" onClick={closeMenu}>
              {t("nav.requestQuote")}
            </Link>
            <a
              href={buildWhatsAppUrl(company.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-nav-secondary"
              onClick={closeMenu}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {t("common.whatsapp")}
            </a>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className="lg:hidden">
      <Button
        ref={menuButtonRef}
        variant="outline"
        size="sm"
        onClick={openMenu}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-haspopup="dialog"
        aria-label={t("nav.openMenu")}
        className="h-10 w-10 shrink-0 p-0"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Button>

      {mounted ? createPortal(panel, document.documentElement) : null}
    </div>
  );
}
