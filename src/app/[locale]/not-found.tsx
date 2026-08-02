import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { defaultLocale } from "@/config/site";
import { routes } from "@/config/routes";
import type { Locale } from "@/types";

interface LocaleNotFoundProps {
  params?: Promise<{ locale: string }>;
}

export default async function LocaleNotFound({ params }: LocaleNotFoundProps) {
  const resolvedParams = params ? await params : { locale: defaultLocale };
  const locale = (resolvedParams.locale ?? defaultLocale) as Locale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <div className="container mx-auto flex min-h-[50vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("description")}</p>
      <Link href={routes.home()} className="mt-6 underline">
        {t("homeLink")}
      </Link>
    </div>
  );
}
