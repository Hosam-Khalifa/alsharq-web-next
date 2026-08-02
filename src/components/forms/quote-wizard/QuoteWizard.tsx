"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  createDefaultQuoteWizardValues,
  createEmptyBoardItem,
  createEmptyDoorItem,
  quoteWizardSchema,
  STEP_FIELDS,
  type QuoteWizardValues,
} from "@/lib/validation/quote-wizard-schema";
import type { Locale, QuoteCategory } from "@/types";
import type { QuoteWhatsAppSummary } from "@/lib/whatsapp/build-quote-followup";
import { clearQuoteDraft, loadQuoteDraft, saveQuoteDraft } from "./quote-draft";
import { StepProgress } from "./StepProgress";
import { StepCategories } from "./steps/StepCategories";
import { StepCustomer } from "./steps/StepCustomer";
import { DoorsSection } from "./steps/DoorsSection";
import { BoardsSection } from "./steps/BoardsSection";
import { FileDropzone } from "./FileDropzone";
import { StepReview } from "./steps/StepReview";
import { SuccessState } from "./SuccessState";

const TOTAL_STEPS = 5;
const CUSTOMER_STEP = 1;

function parseCategoryParam(value: string | null): QuoteCategory | null {
  if (value === "doors" || value === "boards") return value;
  return null;
}

export function QuoteWizard() {
  const t = useTranslations("quote");
  const locale = useLocale() as Locale;
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product") ?? undefined;
  const categoryParam = parseCategoryParam(searchParams.get("category"));
  /** Only doors/boards catalog deep-links skip category selection. */
  const skipToCustomer = Boolean(categoryParam);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successSummary, setSuccessSummary] = useState<QuoteWhatsAppSummary | null>(null);
  const [draftReady, setDraftReady] = useState(false);

  const defaults = useMemo(() => {
    const categories: QuoteCategory[] = categoryParam ? [categoryParam] : [];

    return createDefaultQuoteWizardValues(locale, {
      productCode: productParam,
      categories,
    });
  }, [categoryParam, locale, productParam]);

  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm<QuoteWizardValues>({
    resolver: zodResolver(quoteWizardSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });

  useEffect(() => {
    const draft = loadQuoteDraft();

    if (skipToCustomer && categoryParam) {
      const nextValues: QuoteWizardValues = {
        ...defaults,
        selectedCategories: [categoryParam],
        customer: draft?.customer ?? defaults.customer,
        doors:
          categoryParam === "doors"
            ? defaults.doors
            : draft?.doors?.length
              ? draft.doors
              : defaults.doors,
        boards:
          categoryParam === "boards"
            ? defaults.boards
            : draft?.boards?.length
              ? draft.boards
              : defaults.boards,
        attachments: [],
        privacyAccepted: false,
        locale,
      };

      if (productParam && categoryParam === "doors") {
        const [firstDoor, ...restDoors] = nextValues.doors.length
          ? nextValues.doors
          : [createEmptyDoorItem()];
        nextValues.doors = [
          {
            ...firstDoor,
            productCode: productParam,
            finish: productParam,
          },
          ...restDoors,
        ];
      }

      reset(nextValues);
      setStep(CUSTOMER_STEP);
    } else {
      // All other "Request quote" entry points open on product selection.
      reset({
        ...defaults,
        ...(draft
          ? {
              customer: draft.customer ?? defaults.customer,
              doors: draft.doors?.length ? draft.doors : defaults.doors,
              boards: draft.boards?.length ? draft.boards : defaults.boards,
            }
          : null),
        selectedCategories: [],
        attachments: [],
        privacyAccepted: false,
        locale,
      });
      setStep(0);
    }

    setDraftReady(true);
  }, [categoryParam, defaults, locale, productParam, reset, skipToCustomer]);

  const values = watch();
  const selectedCategories = watch("selectedCategories");

  useEffect(() => {
    if (!draftReady || successSummary) return;
    const handle = window.setTimeout(() => {
      saveQuoteDraft(getValues(), step);
    }, 400);
    return () => window.clearTimeout(handle);
  }, [draftReady, getValues, successSummary, step, values]);

  useEffect(() => {
    if (!draftReady) return;
    if (selectedCategories.includes("doors") && values.doors.length === 0) {
      setValue("doors", [createEmptyDoorItem()]);
    }
    if (selectedCategories.includes("boards") && values.boards.length === 0) {
      setValue("boards", [createEmptyBoardItem()]);
    }
  }, [draftReady, selectedCategories, setValue, values.boards.length, values.doors.length]);

  const steps = [
    { id: "categories", title: t("steps.categories") },
    { id: "customer", title: t("steps.customer") },
    { id: "products", title: t("steps.products") },
    { id: "attachments", title: t("steps.attachments") },
    { id: "review", title: t("steps.review") },
  ];

  const goNext = async () => {
    setSubmitError(null);
    const fields = STEP_FIELDS[step] ?? [];

    if (step === 2) {
      const cats = getValues("selectedCategories");
      const productFields: Array<"doors" | "boards"> = [];
      if (cats.includes("doors")) productFields.push("doors");
      if (cats.includes("boards")) productFields.push("boards");
      const valid = await trigger(productFields);
      if (!valid) return;
    } else if (step === 3) {
      // Attachments optional
    } else if (step === 4) {
      const valid = await trigger("privacyAccepted");
      if (!valid) return;
    } else {
      const valid = await trigger(fields as Parameters<typeof trigger>[0]);
      if (!valid) {
        const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
        firstInvalid?.focus();
        return;
      }
    }

    setStep((current) => Math.min(current + 1, TOTAL_STEPS - 1));
  };

  const goBack = () => {
    setSubmitError(null);
    setStep((current) => Math.max(current - 1, 0));
  };

  const onSubmit = async () => {
    setSubmitError(null);
    const valid = await trigger();
    if (!valid) {
      setSubmitError(t("errorMessage"));
      return;
    }

    setSubmitting(true);
    try {
      const payload = getValues();
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          doors: payload.selectedCategories.includes("doors") ? payload.doors : [],
          boards: payload.selectedCategories.includes("boards") ? payload.boards : [],
          locale,
        }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        referenceNumber?: string;
        error?: string;
      };

      if (!response.ok || !result.success || !result.referenceNumber) {
        setSubmitError(result.error || t("errorMessage"));
        return;
      }

      const submitted = getValues();
      clearQuoteDraft();
      setSuccessSummary({
        locale,
        requestReference: result.referenceNumber,
        customerName: submitted.customer.fullName,
        customerType: submitted.customer.customerType,
        city: submitted.customer.city,
        projectType: submitted.customer.projectType,
        preferredContact: submitted.customer.preferredContact,
        selectedCategories: submitted.selectedCategories,
        doors: submitted.selectedCategories.includes("doors") ? submitted.doors : [],
        boards: submitted.selectedCategories.includes("boards") ? submitted.boards : [],
        attachmentCount: submitted.attachments.length,
      });
    } catch {
      setSubmitError(t("errorMessage"));
    } finally {
      setSubmitting(false);
    }
  };

  const startNewRequest = () => {
    clearQuoteDraft();
    reset(createDefaultQuoteWizardValues(locale));
    setSuccessSummary(null);
    setStep(0);
    setSubmitError(null);
  };

  if (successSummary) {
    return <SuccessState summary={successSummary} onNewRequest={startNewRequest} />;
  }

  return (
    <div className="space-y-8">
      <StepProgress steps={steps} currentStep={step} ariaLabel={t("progressAria")} />

      <form
        className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-7 md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          if (step === TOTAL_STEPS - 1) {
            void onSubmit();
          } else {
            void goNext();
          }
        }}
        noValidate
      >
        {/* Anti-bot honeypot — not shown to users */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          {...register("honeypot")}
        />

        {step === 0 ? (
          <StepCategories
            value={selectedCategories}
            onChange={(next: QuoteCategory[]) =>
              setValue("selectedCategories", next, { shouldValidate: true })
            }
            error={errors.selectedCategories?.message}
          />
        ) : null}

        {step === 1 ? (
          <StepCustomer register={register} watch={watch} errors={errors} />
        ) : null}

        {step === 2 ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {t("stepProductsTitle")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("stepProductsSubtitle")}</p>
            </div>
            {selectedCategories.includes("doors") ? (
              <DoorsSection
                control={control}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
              />
            ) : null}
            {selectedCategories.includes("boards") ? (
              <BoardsSection
                control={control}
                register={register}
                watch={watch}
                setValue={setValue}
                errors={errors}
              />
            ) : null}
          </div>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {t("stepAttachmentsTitle")}
            </legend>
            <p className="mt-2 text-sm text-muted-foreground">{t("stepAttachmentsSubtitle")}</p>
            <div className="mt-8">
              <FileDropzone
                files={values.attachments}
                onChange={(files) => setValue("attachments", files, { shouldDirty: true })}
              />
            </div>
          </fieldset>
        ) : null}

        {step === 4 ? (
          <StepReview
            values={values}
            privacyAccepted={values.privacyAccepted}
            onPrivacyChange={(checked) =>
              setValue("privacyAccepted", checked, { shouldValidate: true })
            }
            privacyError={errors.privacyAccepted?.message}
            onEditStep={setStep}
          />
        ) : null}

        {submitError ? (
          <p className="mt-6 text-sm text-destructive" role="alert">
            {submitError}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={step === 0 || submitting}
            className="w-full sm:w-auto"
          >
            {t("back")}
          </Button>

          {step < TOTAL_STEPS - 1 ? (
            <Button type="submit" className="w-full sm:w-auto">
              {t("next")}
            </Button>
          ) : (
            <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
              {submitting ? t("submitting") : t("submit")}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
