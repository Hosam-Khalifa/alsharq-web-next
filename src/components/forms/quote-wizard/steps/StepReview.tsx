"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { routes } from "@/config/routes";
import type { QuoteWizardValues } from "@/lib/validation/quote-wizard-schema";
import { FieldError } from "../FieldError";

interface StepReviewProps {
  values: QuoteWizardValues;
  privacyAccepted: boolean;
  onPrivacyChange: (value: boolean) => void;
  privacyError?: string;
  onEditStep: (step: number) => void;
}

export function StepReview({
  values,
  privacyAccepted,
  onPrivacyChange,
  privacyError,
  onEditStep,
}: StepReviewProps) {
  const t = useTranslations("quote");
  const tForms = useTranslations("forms");
  const showDoors = values.selectedCategories.includes("doors");
  const showBoards = values.selectedCategories.includes("boards");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {t("stepReviewTitle")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("stepReviewSubtitle")}</p>
      </div>

      <ReviewCard title={t("reviewCustomer")} onEdit={() => onEditStep(1)} editLabel={t("editSection")}>
        <Row label={tForms("fullName")} value={values.customer.fullName} />
        <Row label={tForms("mobile")} value={values.customer.primaryPhone} />
        <Row label={tForms("email")} value={values.customer.email} />
        <Row label={tForms("city")} value={values.customer.city} />
        <Row label={tForms("customerType")} value={t(`customerTypes.${values.customer.customerType}`)} />
        {values.customer.customerType !== "individual" ? (
          <Row label={t("companyOrOrg")} value={values.customer.companyName || "—"} />
        ) : null}
        <Row label={tForms("projectType")} value={t(`projectTypes.${values.customer.projectType}`)} />
        <Row
          label={tForms("preferredContactMethod")}
          value={
            values.customer.preferredContact === "phone"
              ? t("contactPhone")
              : values.customer.preferredContact === "email"
                ? tForms("email")
                : tForms("whatsapp")
          }
        />
      </ReviewCard>

      {showDoors ? (
        <ReviewCard title={t("doorsSectionTitle")} onEdit={() => onEditStep(2)} editLabel={t("editSection")}>
          {values.doors.map((door, index) => (
            <div key={`door-${index}`} className="rounded-lg border border-border/70 p-3">
              <p className="mb-2 text-sm font-medium text-primary">
                {t("productNumber", { number: index + 1 })}
              </p>
              <Row label={tForms("productOrCode")} value={door.productCode === "unspecified" ? t("unspecifiedHelp") : door.productCode} />
              <Row label={tForms("quantity")} value={String(door.quantity)} />
              <Row
                label={tForms("sizeType")}
                value={door.measurementType === "standard" ? tForms("standard") : tForms("custom")}
              />
              <Row
                label={tForms("standardWidth")}
                value={
                  door.measurementType === "standard"
                    ? `${door.standardWidth ?? "—"} cm`
                    : `${door.customWidthCm ?? "—"} cm`
                }
              />
              <Row label={tForms("doorHeightCm")} value={`${door.heightCm} cm`} />
              <Row label={tForms("frameSize")} value={`${door.frameSize} cm`} />
              <Row
                label={tForms("colorOrFinish")}
                value={door.finish === "unspecified" ? t("finishUnspecified") : door.finish}
              />
              {door.notes ? <Row label={tForms("notes")} value={door.notes} /> : null}
            </div>
          ))}
        </ReviewCard>
      ) : null}

      {showBoards ? (
        <ReviewCard title={t("boardsSectionTitle")} onEdit={() => onEditStep(2)} editLabel={t("editSection")}>
          {values.boards.map((board, index) => (
            <div key={`board-${index}`} className="rounded-lg border border-border/70 p-3">
              <p className="mb-2 text-sm font-medium text-primary">
                {t("productNumber", { number: index + 1 })}
              </p>
              <Row label={t("boardThickness")} value={`${board.thicknessMm} ${t("mm")}`} />
              <Row label={t("boardSize")} value={board.sizeMm} />
              <Row label={t("boardDensity")} value={board.density} />
              <Row label={t("boardClassification")} value={t(`classification.${board.classification}`)} />
              <Row label={tForms("quantity")} value={String(board.quantity)} />
              <Row label={t("boardApplication")} value={t(`applications.${board.application}`)} />
              <Row label={t("fabricationService")} value={t(`fabrication.${board.fabricationService}`)} />
              {board.notes ? <Row label={tForms("notes")} value={board.notes} /> : null}
            </div>
          ))}
        </ReviewCard>
      ) : null}

      <ReviewCard title={t("stepAttachmentsTitle")} onEdit={() => onEditStep(3)} editLabel={t("editSection")}>
        {values.attachments.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("noAttachments")}</p>
        ) : (
          values.attachments.map((file) => (
            <Row key={file.id} label={file.name} value={`${(file.size / 1024).toFixed(0)} KB`} />
          ))
        )}
      </ReviewCard>

      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="privacyAccepted"
            checked={privacyAccepted}
            onChange={(event) => onPrivacyChange(event.target.checked)}
            aria-invalid={!!privacyError}
          />
          <Label htmlFor="privacyAccepted" className="text-sm leading-relaxed">
            {t.rich("privacyConsentRich", {
              link: (chunks) => (
                <Link href={routes.privacyPolicy()} className="text-primary underline-offset-2 hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </Label>
        </div>
        <FieldError message={privacyError} />
      </div>
    </div>
  );
}

function ReviewCard({
  title,
  children,
  onEdit,
  editLabel,
}: {
  title: string;
  children: React.ReactNode;
  onEdit: () => void;
  editLabel: string;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <Button type="button" variant="outline" size="sm" onClick={onEdit}>
          {editLabel}
        </Button>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 text-sm sm:grid-cols-[12rem_1fr] sm:gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}
