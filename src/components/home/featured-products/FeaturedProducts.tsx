import { getTranslations } from "next-intl/server";
import { products } from "@/data/products";
import { SectionHeading } from "@/components/shared/section-heading/section-heading";
import type { Locale } from "@/types";

interface FeaturedProductsProps {
  locale: Locale;
}

export async function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const t = await getTranslations({ locale });

  return (
    <section className="border-y border-border bg-surface-muted py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading title={t("home.featuredProductsTitle")} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products
            .filter((product) => product.isFeatured)
            .map((product) => (
              <div key={product.id} className="brand-interactive-card rounded-lg p-4">
                <h3 className="font-medium">{product.name[locale]}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{product.summary[locale]}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
