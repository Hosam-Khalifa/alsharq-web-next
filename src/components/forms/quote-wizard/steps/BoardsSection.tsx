"use client";

import { useEffect } from "react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Check, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BOARD_THICKNESS_OPTIONS,
  resolveBoardSpec,
  type BoardThicknessMm,
} from "@/data/board-specs";
import {
  createEmptyBoardItem,
  type QuoteWizardValues,
} from "@/lib/validation/quote-wizard-schema";
import { cn } from "@/lib/utils/cn";
import { FieldError } from "../FieldError";

const APPLICATIONS = [
  "kitchens",
  "bathrooms",
  "cabinets",
  "stores",
  "interior_decor",
  "furniture",
  "fitouts",
  "other",
] as const;

const FABRICATION = ["supply_only", "cutting", "fabrication", "consultation"] as const;

interface BoardsSectionProps {
  control: Control<QuoteWizardValues>;
  register: UseFormRegister<QuoteWizardValues>;
  watch: UseFormWatch<QuoteWizardValues>;
  setValue: UseFormSetValue<QuoteWizardValues>;
  errors: FieldErrors<QuoteWizardValues>;
}

export function BoardsSection({
  control,
  register,
  watch,
  setValue,
  errors,
}: BoardsSectionProps) {
  const t = useTranslations("quote");
  const tForms = useTranslations("forms");
  const { fields, append, remove } = useFieldArray({ control, name: "boards" });

  const infoItems = [
    t("boardInfoWater"),
    t("boardInfoMoisture"),
    t("boardInfoInsects"),
    t("boardInfoCutting"),
    t("boardInfoDurable"),
    t("boardInfoFlexible"),
    t("boardInfoSaudi"),
  ];

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-foreground">{t("boardsSectionTitle")}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t("boardsSectionSubtitle")}</p>

      <ul className="mt-4 grid gap-2 rounded-xl border border-primary/20 bg-accent-soft/40 p-4 text-sm text-foreground sm:grid-cols-2">
        {infoItems.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-5">
        {fields.map((field, index) => (
          <BoardItemCard
            key={field.id}
            index={index}
            canRemove={fields.length > 1}
            onRemove={() => remove(index)}
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
            t={t}
            tForms={tForms}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-5 gap-2"
        onClick={() => append(createEmptyBoardItem())}
      >
        <Plus className="h-4 w-4" />
        {t("addBoardProduct")}
      </Button>
    </section>
  );
}

function BoardItemCard({
  index,
  canRemove,
  onRemove,
  register,
  watch,
  setValue,
  errors,
  t,
  tForms,
}: {
  index: number;
  canRemove: boolean;
  onRemove: () => void;
  register: UseFormRegister<QuoteWizardValues>;
  watch: UseFormWatch<QuoteWizardValues>;
  setValue: UseFormSetValue<QuoteWizardValues>;
  errors: FieldErrors<QuoteWizardValues>;
  t: ReturnType<typeof useTranslations<"quote">>;
  tForms: ReturnType<typeof useTranslations<"forms">>;
}) {
  const thickness = watch(`boards.${index}.thicknessMm`) as BoardThicknessMm;
  const density = watch(`boards.${index}.density`);
  const fabrication = watch(`boards.${index}.fabricationService`);
  const resolved = resolveBoardSpec(thickness, density);
  const itemErrors = errors.boards?.[index];
  const showFabricationNotes =
    fabrication === "cutting" || fabrication === "fabrication" || fabrication === "consultation";

  useEffect(() => {
    setValue(`boards.${index}.sizeMm`, resolved.sizeMm);
    setValue(`boards.${index}.density`, resolved.density);
    setValue(`boards.${index}.classification`, resolved.classification);
  }, [index, resolved.classification, resolved.density, resolved.sizeMm, setValue]);

  return (
    <article className="rounded-xl border border-border bg-background/40 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="font-medium text-foreground">
          {t("productNumber", { number: index + 1 })}
        </h4>
        {canRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
            {t("removeProduct")}
          </Button>
        ) : null}
      </div>

      <div className="space-y-4">
        <div>
          <Label>{t("boardThickness")} *</Label>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {BOARD_THICKNESS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setValue(`boards.${index}.thicknessMm`, option, { shouldValidate: true })
                }
                className={cn(
                  "rounded-xl border px-3 py-3 text-sm font-medium transition",
                  thickness === option
                    ? "border-primary bg-accent-soft text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40",
                )}
                aria-pressed={thickness === option}
              >
                {option} {t("mm")}
              </button>
            ))}
          </div>
          <input type="hidden" {...register(`boards.${index}.thicknessMm`)} />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <Label>{t("boardSize")}</Label>
            <Input className="mt-1.5" value={resolved.sizeMm} readOnly />
            <input type="hidden" {...register(`boards.${index}.sizeMm`)} />
          </div>

          <div>
            <Label>{t("boardDensity")} *</Label>
            {resolved.densityChoices.length === 1 ? (
              <>
                <Input className="mt-1.5" value={resolved.density} readOnly />
                <input type="hidden" {...register(`boards.${index}.density`)} />
              </>
            ) : (
              <Select className="mt-1.5" {...register(`boards.${index}.density`)}>
                {resolved.densityChoices.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice} — {t(`densityLabels.${choice === "0.55" ? "low" : "high"}`)}
                  </option>
                ))}
              </Select>
            )}
          </div>

          <div>
            <Label>{t("boardClassification")}</Label>
            <Input
              className="mt-1.5"
              value={t(`classification.${resolved.classification}`)}
              readOnly
            />
            <input type="hidden" {...register(`boards.${index}.classification`)} />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>{t("quantityType")} *</Label>
            <Select className="mt-1.5" {...register(`boards.${index}.quantityType`)}>
              <option value="sheets">{t("quantitySheets")}</option>
              <option value="pallets">{t("quantityPallets")}</option>
              <option value="unspecified">{t("unspecified")}</option>
            </Select>
          </div>
          <div>
            <Label>{tForms("quantity")} *</Label>
            <Input
              type="number"
              min={1}
              className="mt-1.5"
              {...register(`boards.${index}.quantity`, { valueAsNumber: true })}
            />
            <FieldError message={itemErrors?.quantity?.message} />
          </div>
          <div>
            <Label>{t("boardApplication")} *</Label>
            <Select className="mt-1.5" {...register(`boards.${index}.application`)}>
              {APPLICATIONS.map((app) => (
                <option key={app} value={app}>
                  {t(`applications.${app}`)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>{t("fabricationService")} *</Label>
            <Select className="mt-1.5" {...register(`boards.${index}.fabricationService`)}>
              {FABRICATION.map((service) => (
                <option key={service} value={service}>
                  {t(`fabrication.${service}`)}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {showFabricationNotes ? (
          <div>
            <Label>{t("fabricationNotes")} *</Label>
            <Textarea
              className="mt-1.5"
              rows={3}
              {...register(`boards.${index}.fabricationNotes`)}
            />
            <FieldError message={itemErrors?.fabricationNotes?.message} />
          </div>
        ) : null}

        <div>
          <Label>{tForms("notes")}</Label>
          <Textarea className="mt-1.5" rows={3} {...register(`boards.${index}.notes`)} />
        </div>
      </div>
    </article>
  );
}
