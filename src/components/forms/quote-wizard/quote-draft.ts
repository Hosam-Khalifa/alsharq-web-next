import type { QuoteWizardValues } from "@/lib/validation/quote-wizard-schema";

const DRAFT_KEY = "alsharq-quote-wizard-draft-v1";

type QuoteDraft = Omit<QuoteWizardValues, "attachments" | "privacyAccepted"> & {
  step: number;
  savedAt: string;
};

export function saveQuoteDraft(values: QuoteWizardValues, step: number) {
  if (typeof window === "undefined") return;

  const draft: QuoteDraft = {
    selectedCategories: values.selectedCategories,
    customer: values.customer,
    doors: values.doors,
    boards: values.boards,
    honeypot: "",
    locale: values.locale,
    step,
    savedAt: new Date().toISOString(),
  };

  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Ignore quota / private mode failures.
  }
}

export function loadQuoteDraft(): (Partial<QuoteWizardValues> & { step?: number }) | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuoteDraft;
    return {
      selectedCategories: parsed.selectedCategories,
      customer: parsed.customer,
      doors: parsed.doors,
      boards: parsed.boards,
      locale: parsed.locale,
      step: parsed.step,
      attachments: [],
      privacyAccepted: false,
    };
  } catch {
    return null;
  }
}

export function clearQuoteDraft() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(DRAFT_KEY);
}
