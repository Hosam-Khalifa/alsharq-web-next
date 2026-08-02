"use client";

import { Suspense } from "react";
import { QuoteWizard } from "@/components/forms/quote-wizard/QuoteWizard";

/** @deprecated Prefer importing QuoteWizard directly. Kept for route compatibility. */
export function QuoteForm() {
  return (
    <Suspense fallback={<div className="py-12 text-sm text-muted-foreground">…</div>}>
      <QuoteWizard />
    </Suspense>
  );
}
