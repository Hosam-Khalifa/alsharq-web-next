"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import type { QuoteCategory } from "@/types";
import { FieldError } from "../FieldError";

const CATEGORIES: Array<{
  id: QuoteCategory;
  titleKey: string;
  textKey: string;
  image: string;
}> = [
  {
    id: "doors",
    titleKey: "categoryDoorsTitle",
    textKey: "categoryDoorsText",
    image: "/images/Catalog/door/SHD-601.jpg",
  },
  {
    id: "boards",
    titleKey: "categoryBoardsTitle",
    textKey: "categoryBoardsText",
    image: "/images/Products/Products-bg-3.webp",
  },
];

interface StepCategoriesProps {
  value: QuoteCategory[];
  onChange: (value: QuoteCategory[]) => void;
  error?: string;
}

export function StepCategories({ value, onChange, error }: StepCategoriesProps) {
  const t = useTranslations("quote");

  const toggle = (id: QuoteCategory) => {
    if (value.includes(id)) {
      onChange(value.filter((item) => item !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <fieldset>
      <legend className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {t("stepCategoriesTitle")}
      </legend>
      <p className="mt-2 text-sm text-muted-foreground">{t("stepCategoriesSubtitle")}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {CATEGORIES.map((category) => {
          const selected = value.includes(category.id);

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggle(category.id)}
              aria-pressed={selected}
              className={cn(
                "group overflow-hidden rounded-2xl border text-start transition duration-300",
                selected
                  ? "border-primary shadow-[0_0_0_3px_rgb(230_126_34/0.22)]"
                  : "border-border hover:border-primary/40",
              )}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                {selected ? (
                  <span className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    {t("selectedLabel")}
                  </span>
                ) : null}
              </div>
              <div className="bg-surface px-5 py-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {t(category.titleKey)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {t(category.textKey)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <FieldError message={error} />
    </fieldset>
  );
}
