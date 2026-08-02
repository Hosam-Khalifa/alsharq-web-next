import { Clock3 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { contactConfig } from "@/config/contact";
import type { Locale } from "@/types";

interface ContactHoursProps {
  locale: Locale;
}

export async function ContactHours({ locale }: ContactHoursProps) {
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-[var(--shadow-soft)] sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-primary">
          <Clock3 className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <h2 className="text-lg font-semibold text-foreground">{t("businessHoursTitle")}</h2>
      </div>
      <ul className="mt-5 space-y-3">
        {contactConfig.businessHours.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0"
          >
            <span className="text-sm text-muted-foreground">{t(row.daysKey)}</span>
            <span className="text-sm font-semibold text-foreground">{t(row.timeKey)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
