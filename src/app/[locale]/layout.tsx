import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getDirection } from "@/lib/i18n/locale-utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp/floating-whatsapp";
import { getOrganizationSchema, getLocalBusinessSchema } from "@/lib/metadata/generate-page-metadata";
import { JsonLd } from "@/components/shared/json-ld/json-ld";
import type { Locale } from "@/types";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html lang={locale} dir={getDirection(locale as Locale)} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <JsonLd data={getOrganizationSchema(locale as Locale)} />
        <JsonLd data={getLocalBusinessSchema(locale as Locale)} />
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              {t("skipToContent")}
            </a>
            <Header locale={locale as Locale} />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer locale={locale as Locale} />
            <FloatingWhatsApp />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
