"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  buildQuoteWhatsAppMessage,
  buildWhatsAppQuoteUrl,
  type QuoteWhatsAppSummary,
} from "@/lib/whatsapp/build-quote-followup";
import type { Locale } from "@/types";

interface WhatsAppFollowUpButtonProps {
  summary: QuoteWhatsAppSummary;
}

export function WhatsAppFollowUpButton({ summary }: WhatsAppFollowUpButtonProps) {
  const t = useTranslations("quote");
  const tForms = useTranslations("forms");
  const locale = useLocale() as Locale;
  const [error, setError] = useState<string | null>(null);

  const labels = useMemo(
    () => ({
      greeting: t("waGreeting"),
      intro: t("waIntro"),
      requestReference: t("waRequestReference"),
      name: tForms("fullName"),
      customerType: tForms("customerType"),
      city: tForms("city"),
      projectType: tForms("projectType"),
      requestType: t("waRequestType"),
      preferredContact: tForms("preferredContactMethod"),
      doorsHeading: t("waDoorsHeading"),
      boardsHeading: t("waBoardsHeading"),
      quantity: tForms("quantity"),
      size: t("waSize"),
      frameSize: tForms("frameSize"),
      finish: tForms("colorOrFinish"),
      includeFrame: t("includeFrame"),
      accessories: t("accessories"),
      sizeUnitCm: t("waCm"),
      density: t("boardDensity"),
      classification: t("boardClassification"),
      application: t("boardApplication"),
      fabricationService: t("fabricationService"),
      attachmentsCount: (count: number) => t("waAttachmentsCount", { count }),
      boardItemTitle: (thickness: string) => t("waBoardItemTitle", { thickness }),
      closing: t("waClosing"),
      thankYou: t("waThankYou"),
      unspecifiedHelp: t("unspecifiedHelp"),
      finishUnspecified: t("finishUnspecified"),
      requestTypeDoors: t("categoryDoorsTitle"),
      requestTypeBoards: t("categoryBoardsTitle"),
      requestTypeBoth: t("waRequestTypeBoth"),
      customerTypeLabels: {
        individual: t("customerTypes.individual"),
        company: t("customerTypes.company"),
        contractor: t("customerTypes.contractor"),
        engineering_office: t("customerTypes.engineering_office"),
        developer: t("customerTypes.developer"),
        government: t("customerTypes.government"),
        other: t("customerTypes.other"),
      },
      projectTypeLabels: {
        villa: t("projectTypes.villa"),
        apartment: t("projectTypes.apartment"),
        residential_complex: t("projectTypes.residential_complex"),
        hotel: t("projectTypes.hotel"),
        hospital: t("projectTypes.hospital"),
        office: t("projectTypes.office"),
        store: t("projectTypes.store"),
        government_project: t("projectTypes.government_project"),
        other: t("projectTypes.other"),
      },
      preferredContactLabels: {
        whatsapp: tForms("whatsapp"),
        phone: t("contactPhone"),
        email: tForms("email"),
      },
      includeFrameLabels: {
        yes: t("yes"),
        no: t("no"),
        unspecified: t("unspecified"),
      },
      accessoriesLabels: {
        required: t("accessoriesRequired"),
        not_required: t("accessoriesNotRequired"),
        need_help: t("accessoriesNeedHelp"),
      },
      quantityTypeLabels: {
        sheets: t("quantitySheets"),
        pallets: t("quantityPallets"),
        unspecified: t("unspecified"),
      },
      applicationLabels: {
        kitchens: t("applications.kitchens"),
        bathrooms: t("applications.bathrooms"),
        cabinets: t("applications.cabinets"),
        stores: t("applications.stores"),
        interior_decor: t("applications.interior_decor"),
        furniture: t("applications.furniture"),
        fitouts: t("applications.fitouts"),
        other: t("applications.other"),
      },
      fabricationLabels: {
        supply_only: t("fabrication.supply_only"),
        cutting: t("fabrication.cutting"),
        fabrication: t("fabrication.fabrication"),
        consultation: t("fabrication.consultation"),
      },
      classificationLabels: {
        standard: t("classification.standard"),
        low: t("classification.low"),
        high: t("classification.high"),
      },
    }),
    [t, tForms],
  );

  const message = useMemo(
    () => buildQuoteWhatsAppMessage({ ...summary, locale }, labels),
    [labels, locale, summary],
  );

  const url = useMemo(() => buildWhatsAppQuoteUrl(message), [message]);

  const openWhatsApp = () => {
    setError(null);
    if (!url) {
      setError(t("waMissingNumber"));
      return;
    }

    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      // Fallback: navigate current tab if popup blocked
      window.location.href = url;
    }
  };

  return (
    <div className="w-full space-y-2">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
          onClick={(event) => {
            event.preventDefault();
            openWhatsApp();
          }}
          aria-label={t("waButtonAria", { reference: summary.requestReference })}
        >
          <Button size="lg" className="w-full gap-2">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {t("waFollowUpButton")}
          </Button>
        </a>
      ) : (
        <Button
          type="button"
          size="lg"
          className="w-full gap-2"
          onClick={openWhatsApp}
          aria-label={t("waFollowUpButton")}
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          {t("waFollowUpButton")}
        </Button>
      )}

      <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {t("waFollowUpHint")}
      </p>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
