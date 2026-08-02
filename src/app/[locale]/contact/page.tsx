import { getTranslations, setRequestLocale } from "next-intl/server";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { ContactForm } from "@/components/forms/contact-form/contact-form";
import {
  ContactCtaSection,
  ContactHeroSection,
  ContactHours,
  ContactInfoCards,
  ContactMap,
} from "@/components/contact";
import type { Locale } from "@/types";

interface ContactPageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return generatePageMetadata({
    locale,
    title: t("title"),
    description: t("subtitle"),
    pathname: "/contact",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <ContactHeroSection locale={locale} />

      <section className="py-12 md:py-16">
        <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {t("infoTitle")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t("infoSubtitle")}
              </p>
            </div>
            <ContactInfoCards locale={locale} />
            <ContactHours locale={locale} />
            <ContactMap locale={locale} />
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactCtaSection locale={locale} />
    </>
  );
}
