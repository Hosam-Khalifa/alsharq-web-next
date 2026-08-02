"use client";

import Image from "next/image";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { catalogFinishes } from "@/data/catalog";
import {
  createEmptyDoorItem,
  type QuoteWizardValues,
} from "@/lib/validation/quote-wizard-schema";
import { cn } from "@/lib/utils/cn";
import { FieldError } from "../FieldError";

interface DoorsSectionProps {
  control: Control<QuoteWizardValues>;
  register: UseFormRegister<QuoteWizardValues>;
  watch: UseFormWatch<QuoteWizardValues>;
  setValue: UseFormSetValue<QuoteWizardValues>;
  errors: FieldErrors<QuoteWizardValues>;
}

export function DoorsSection({
  control,
  register,
  watch,
  setValue,
  errors,
}: DoorsSectionProps) {
  const t = useTranslations("quote");
  const tForms = useTranslations("forms");
  const { fields, append, remove } = useFieldArray({ control, name: "doors" });

  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-foreground">{t("doorsSectionTitle")}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{t("doorsSectionSubtitle")}</p>

      <div className="mt-6 space-y-5">
        {fields.map((field, index) => {
          const measurementType = watch(`doors.${index}.measurementType`);
          const finish = watch(`doors.${index}.finish`);
          const itemErrors = errors.doors?.[index];

          return (
            <article
              key={field.id}
              className="rounded-xl border border-border bg-background/40 p-4 sm:p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="font-medium text-foreground">
                  {t("productNumber", { number: index + 1 })}
                </h4>
                {fields.length > 1 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-muted-foreground hover:text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                    {t("removeProduct")}
                  </Button>
                ) : null}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>{tForms("productOrCode")} *</Label>
                  <Select className="mt-1.5" {...register(`doors.${index}.productCode`)}>
                    <option value="unspecified">{t("unspecifiedHelp")}</option>
                    {catalogFinishes.map((finishItem) => (
                      <option key={finishItem.code} value={finishItem.code}>
                        {finishItem.code}
                      </option>
                    ))}
                  </Select>
                  <FieldError message={itemErrors?.productCode?.message} />
                </div>

                <div>
                  <Label>{tForms("quantity")} *</Label>
                  <Input
                    type="number"
                    min={1}
                    className="mt-1.5"
                    {...register(`doors.${index}.quantity`, { valueAsNumber: true })}
                  />
                  <FieldError message={itemErrors?.quantity?.message} />
                </div>

                <div>
                  <Label>{tForms("sizeType")} *</Label>
                  <Select className="mt-1.5" {...register(`doors.${index}.measurementType`)}>
                    <option value="standard">{tForms("standard")}</option>
                    <option value="custom">{tForms("custom")}</option>
                  </Select>
                </div>

                {measurementType === "standard" ? (
                  <div>
                    <Label>{tForms("standardWidth")} *</Label>
                    <Select className="mt-1.5" {...register(`doors.${index}.standardWidth`)}>
                      <option value="85">85 cm</option>
                      <option value="90">90 cm</option>
                      <option value="100">100 cm</option>
                    </Select>
                    <FieldError message={itemErrors?.standardWidth?.message} />
                  </div>
                ) : (
                  <div>
                    <Label>{tForms("customWidthCm")} *</Label>
                    <Input
                      type="number"
                      min={1}
                      className="mt-1.5"
                      {...register(`doors.${index}.customWidthCm`, { valueAsNumber: true })}
                    />
                    <FieldError message={itemErrors?.customWidthCm?.message} />
                  </div>
                )}

                <div>
                  <Label>{tForms("doorHeightCm")} *</Label>
                  <Input
                    type="number"
                    min={1}
                    className="mt-1.5"
                    {...register(`doors.${index}.heightCm`, { valueAsNumber: true })}
                  />
                  <FieldError message={itemErrors?.heightCm?.message} />
                </div>

                <div>
                  <Label>{tForms("frameSize")} *</Label>
                  <Select className="mt-1.5" {...register(`doors.${index}.frameSize`)}>
                    <option value="17">17 cm</option>
                    <option value="22">22 cm</option>
                  </Select>
                </div>

                <div>
                  <Label>{t("includeFrame")} *</Label>
                  <Select className="mt-1.5" {...register(`doors.${index}.includeFrame`)}>
                    <option value="yes">{t("yes")}</option>
                    <option value="no">{t("no")}</option>
                    <option value="unspecified">{t("unspecified")}</option>
                  </Select>
                </div>

                <div>
                  <Label>{t("accessories")} *</Label>
                  <Select className="mt-1.5" {...register(`doors.${index}.accessories`)}>
                    <option value="required">{t("accessoriesRequired")}</option>
                    <option value="not_required">{t("accessoriesNotRequired")}</option>
                    <option value="need_help">{t("accessoriesNeedHelp")}</option>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label>{tForms("colorOrFinish")} *</Label>
                  <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                    <button
                      type="button"
                      onClick={() => setValue(`doors.${index}.finish`, "unspecified", { shouldValidate: true })}
                      className={cn(
                        "shrink-0 rounded-xl border px-3 py-2 text-xs",
                        finish === "unspecified"
                          ? "border-primary bg-accent-soft text-foreground"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {t("finishUnspecified")}
                    </button>
                    {catalogFinishes.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setValue(`doors.${index}.finish`, item.code, { shouldValidate: true });
                          if (watch(`doors.${index}.productCode`) === "unspecified") {
                            setValue(`doors.${index}.productCode`, item.code);
                          }
                        }}
                        className={cn(
                          "w-16 shrink-0 overflow-hidden rounded-xl border",
                          finish === item.code
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border opacity-85 hover:opacity-100",
                        )}
                        aria-label={item.code}
                        aria-pressed={finish === item.code}
                      >
                        <span className="relative block aspect-square">
                          <Image src={item.swatchImage} alt="" fill sizes="64px" className="object-cover" />
                        </span>
                        <span className="block truncate px-1 py-1 text-[10px]">{item.code}</span>
                      </button>
                    ))}
                  </div>
                  <input type="hidden" {...register(`doors.${index}.finish`)} />
                  <FieldError message={itemErrors?.finish?.message} />
                </div>

                <div className="md:col-span-2">
                  <Label>{tForms("notes")}</Label>
                  <Textarea className="mt-1.5" rows={3} {...register(`doors.${index}.notes`)} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-5 gap-2"
        onClick={() => append(createEmptyDoorItem())}
      >
        <Plus className="h-4 w-4" />
        {t("addDoorProduct")}
      </Button>
    </section>
  );
}
