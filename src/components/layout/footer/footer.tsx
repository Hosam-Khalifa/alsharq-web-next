import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { company } from "@/config/company";
import { footerNavigation, legalNavigation, productFooterLinks } from "@/config/navigation";
import { routes } from "@/config/routes";
import { buildMailtoUrl, buildTelUrl, buildWhatsAppUrl } from "@/lib/i18n/locale-utils";
import { BrandLogo } from "@/components/shared/brand-logo/brand-logo";
import type { Locale } from "@/types";

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale });
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--footer-border)] bg-footer-background text-footer-foreground">
      <div className="container mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href={routes.home()} className="inline-block transition-opacity hover:opacity-90" aria-label={t("nav.home")}>
            <BrandLogo locale={locale} variant="onDark" className="h-11 w-[10rem]" />
          </Link>
          <p className="mt-3 text-sm text-footer-muted">{t("footer.description")}</p>
          <p className="mt-2 text-xs text-footer-muted">{t("footer.socialTodo")}</p>
        </div>

        <div>
          <h3 className="font-medium text-brand-amber">{t("footer.quickLinks")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNavigation.map((item) => (
              <li key={item.id}>
                <Link href={item.href()} className="text-footer-foreground transition-colors hover:text-brand-amber">
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-brand-amber">{t("footer.products")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {productFooterLinks.map((item) => (
              <li key={item.id}>
                <Link href={item.href()} className="text-footer-foreground transition-colors hover:text-brand-amber">
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-brand-amber">{t("footer.contact")}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <span className="text-footer-muted">{t("common.phone")}: </span>
              <a href={buildTelUrl(company.phone)} className="transition-colors hover:text-brand-amber">
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="text-footer-muted">{t("common.whatsapp")}: </span>
              <a
                href={buildWhatsAppUrl(company.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand-amber"
              >
                {company.phoneDisplay}
              </a>
            </li>
            <li>
              <span className="text-footer-muted">{t("common.email")}: </span>
              <a href={buildMailtoUrl(company.email)} className="transition-colors hover:text-brand-amber">
                {company.email}
              </a>
            </li>
            <li>
              <span className="text-footer-muted">{t("common.address")}: </span>
              {company.address[locale]}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--footer-border)]">
        <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm text-footer-muted md:flex-row md:items-center md:justify-between">
          <p>{t("footer.copyright", { year, companyName: company.name[locale] })}</p>
          <div className="flex gap-4">
            {legalNavigation.map((item) => (
              <Link key={item.id} href={item.href()} className="transition-colors hover:text-brand-amber">
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
