import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { routes } from "@/config/routes";
import { productCategories } from "@/data/products";
import { SectionHeading } from "@/components/shared/section-heading/section-heading";
import type { Locale } from "@/types";

interface ProductCategoriesProps {
  locale: Locale;
}

export async function ProductCategories({ locale }: ProductCategoriesProps) {
  const t = await getTranslations({ locale });

  return (
    <section className="border-y border-border bg-surface-muted py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading title={t("home.productsTitle")} subtitle={t("home.productsSubtitle")} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category) => (
            <Link
              key={category.slug}
              href={routes.productCategory(category.slug)}
              className="brand-interactive-card rounded-lg p-5"
            >
              <h3 className="font-medium">{locale === "ar" ? category.nameAr : category.nameEn}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {locale === "ar" ? category.descriptionAr : category.descriptionEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
