import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { company } from "@/config/company";
import {
  footerNavigation,
  getProductFooterLabel,
  legalNavigation,
  productFooterLinks,
} from "@/config/navigation";
import { routes } from "@/config/routes";
import { buildMailtoUrl, buildTelUrl, buildWhatsAppUrl } from "@/lib/i18n/locale-utils";
import { BrandLogo } from "@/components/shared/brand-logo/brand-logo";
import type { Locale } from "@/types";

interface FooterProps {
  locale: Locale;
}

/** Keeps phone/WhatsApp/email visually LTR inside RTL Arabic layout. */
function LtrContact({ children }: { children: ReactNode }) {
  return (
    <span dir="ltr" className="ltr-isolate">
      {children}
    </span>
  );
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--footer-border)] bg-footer-background text-footer-foreground">
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="min-w-0">
          <Link
            href={routes.home()}
            className="inline-block transition-opacity hover:opacity-90"
            aria-label={t("nav.home")}
          >
            <BrandLogo locale={locale} variant="onDark" className="h-11 w-[10rem]" />
          </Link>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-footer-muted">
            {t("footer.description")}
          </p>
        </div>

        <nav className="min-w-0" aria-label={t("footer.quickLinks")}>
          <h3 className="font-medium text-brand-amber">{t("footer.quickLinks")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNavigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href()}
                  className="text-footer-foreground transition-colors hover:text-brand-amber"
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="min-w-0" aria-label={t("footer.products")}>
          <h3 className="font-medium text-brand-amber">{t("footer.products")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {productFooterLinks.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href()}
                  className="text-footer-foreground transition-colors hover:text-brand-amber"
                >
                  {getProductFooterLabel(item, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0">
          <h3 className="font-medium text-brand-amber">{t("footer.contact")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex flex-wrap items-baseline gap-x-1">
              <span className="text-footer-muted">{t("common.phone")}:</span>
              <a
                href={buildTelUrl(company.phone)}
                className="transition-colors hover:text-brand-amber"
              >
                <LtrContact>{company.phoneDisplay}</LtrContact>
              </a>
            </li>
            <li className="flex flex-wrap items-baseline gap-x-1">
              <span className="text-footer-muted">{t("common.whatsapp")}:</span>
              <a
                href={buildWhatsAppUrl(company.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-amber"
              >
                <LtrContact>{company.phoneDisplay}</LtrContact>
              </a>
            </li>
            <li className="flex flex-wrap items-baseline gap-x-1">
              <span className="text-footer-muted">{t("common.email")}:</span>
              <a
                href={buildMailtoUrl(company.email)}
                className="break-all transition-colors hover:text-brand-amber"
              >
                <LtrContact>{company.email}</LtrContact>
              </a>
            </li>
            <li>
              <span className="text-footer-muted">{t("common.address")}: </span>
              <span>{company.address[locale]}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--footer-border)]">
        <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-footer-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>{t("footer.copyright", { year, companyName: company.name[locale] })}</p>
          <nav className="flex flex-wrap gap-4" aria-label={t("footer.legal")}>
            {legalNavigation.map((item) => (
              <Link
                key={item.id}
                href={item.href()}
                className="transition-colors hover:text-brand-amber"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
