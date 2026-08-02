import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import { routes } from "@/config/routes";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import { Breadcrumb } from "@/components/shared/breadcrumb/breadcrumb";
import { EmptyState } from "@/components/shared/empty-state/empty-state";
import type { Locale } from "@/types";

interface CategoryPageProps {
  params: Promise<{ locale: Locale; categorySlug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { locale, categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return {};
  return generatePageMetadata({
    locale,
    title: locale === "ar" ? category.nameAr : category.nameEn,
    description: locale === "ar" ? category.descriptionAr : category.descriptionEn,
    pathname: `/products/${categorySlug}`,
  });
}

export default async function ProductCategoryPage({ params }: CategoryPageProps) {
  const { locale, categorySlug } = await params;
  setRequestLocale(locale);
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const t = await getTranslations({ locale, namespace: "products" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const products = getProductsByCategory(categorySlug);

  return (
    <>
      <PageHero
        title={locale === "ar" ? category.nameAr : category.nameEn}
        subtitle={locale === "ar" ? category.descriptionAr : category.descriptionEn}
      />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <Breadcrumb
          locale={locale}
          items={[
            { label: tNav("home"), href: routes.home() },
            { label: t("title"), href: routes.products() },
            { label: locale === "ar" ? category.nameAr : category.nameEn },
          ]}
        />
        <h2 className="text-xl font-semibold">{t("categoryProducts")}</h2>
        {products.length === 0 ? (
          <div className="mt-6">
            <EmptyState title={t("noProducts")} />
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.id}
                href={routes.productDetail(categorySlug, product.slug)}
                className="brand-interactive-card rounded-lg p-4"
              >
                <h3 className="font-medium">{product.name[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.summary[locale]}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
