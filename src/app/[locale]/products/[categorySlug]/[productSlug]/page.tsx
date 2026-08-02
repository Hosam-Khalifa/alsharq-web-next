import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getCategoryBySlug, getProductBySlug } from "@/data/products";
import { generatePageMetadata } from "@/lib/metadata/generate-page-metadata";
import { PageHero } from "@/components/shared/page-hero/page-hero";
import type { Locale } from "@/types";

interface ProductDetailPageProps {
  params: Promise<{ locale: Locale; categorySlug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { locale, categorySlug, productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  if (!product) return {};
  return generatePageMetadata({
    locale,
    title: product.name[locale],
    description: product.summary[locale],
    pathname: `/products/${categorySlug}/${productSlug}`,
  });
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, categorySlug, productSlug } = await params;
  setRequestLocale(locale);
  const product = getProductBySlug(categorySlug, productSlug);
  const category = getCategoryBySlug(categorySlug);
  if (!product || !category) notFound();

  return (
    <>
      <PageHero title={product.name[locale]} subtitle={product.summary[locale]} />
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <p className="text-muted-foreground">{product.description?.[locale] ?? product.summary[locale]}</p>
        <p className="mt-4 text-sm text-muted-foreground">TODO: Product detail architecture stub — specifications, finishes, downloads.</p>
      </div>
    </>
  );
}
