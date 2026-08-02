import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routes } from "@/config/routes";
import { SectionHeading } from "@/components/shared/section-heading/section-heading";
import type { Locale } from "@/types";

interface AboutPreviewProps {
  locale: Locale;
}

export async function AboutPreview({ locale }: AboutPreviewProps) {
  const t = await getTranslations({ locale });

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading title={t("home.aboutPreviewTitle")} subtitle={t("home.aboutPreviewText")} />
        <Link href={routes.about()} className="mt-4 inline-block text-sm underline">
          {t("common.learnMore")}
        </Link>
      </div>
    </section>
  );
}
