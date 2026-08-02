"use client";

import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import type { QuoteWhatsAppSummary } from "@/lib/whatsapp/build-quote-followup";
import { WhatsAppFollowUpButton } from "./WhatsAppFollowUpButton";

interface SuccessStateProps {
  summary: QuoteWhatsAppSummary;
  onNewRequest: () => void;
}

export function SuccessState({ summary, onNewRequest }: SuccessStateProps) {
  const t = useTranslations("quote");
  const tForms = useTranslations("forms");
  const maskedName = maskName(summary.customerName);

  const categoryLabel =
    summary.selectedCategories.includes("doors") &&
    summary.selectedCategories.includes("boards")
      ? t("waRequestTypeBoth")
      : summary.selectedCategories.includes("boards")
        ? t("categoryBoardsTitle")
        : t("categoryDoorsTitle");

  const contactLabel =
    summary.preferredContact === "phone"
      ? t("contactPhone")
      : summary.preferredContact === "email"
        ? tForms("email")
        : tForms("whatsapp");

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface px-6 py-10 text-center shadow-[var(--shadow-elevated)] sm:px-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-primary">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {t("successTitle")}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {t("successDescription")}
      </p>

      <dl className="mx-auto mt-8 grid max-w-md gap-3 rounded-xl border border-border bg-background/40 p-4 text-start text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">{t("referenceLabel")}</dt>
          <dd className="font-semibold text-foreground">{summary.requestReference}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">{t("reviewCategories")}</dt>
          <dd className="font-medium text-foreground">{categoryLabel}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">{tForms("fullName")}</dt>
          <dd className="font-medium text-foreground">{maskedName}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">{tForms("preferredContactMethod")}</dt>
          <dd className="font-medium text-foreground">{contactLabel}</dd>
        </div>
      </dl>

      <div className="mx-auto mt-8 max-w-md space-y-3">
        <WhatsAppFollowUpButton summary={summary} />

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link href={routes.home()} className="sm:flex-1">
            <Button variant="outline" className="w-full">
              {t("backHome")}
            </Button>
          </Link>
          <Link href={routes.products()} className="sm:flex-1">
            <Button variant="outline" className="w-full">
              {t("browseProducts")}
            </Button>
          </Link>
          <Button onClick={onNewRequest} variant="secondary" className="w-full sm:flex-1">
            {t("newRequest")}
          </Button>
        </div>
      </div>
    </div>
  );
}

function maskName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "—";
  if (parts.length === 1) return `${parts[0].slice(0, 1)}***`;
  return `${parts[0]} ${parts[parts.length - 1].slice(0, 1)}.`;
}
