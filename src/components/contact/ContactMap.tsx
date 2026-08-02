import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { contactConfig } from "@/config/contact";
import type { Locale } from "@/types";

interface ContactMapProps {
  locale: Locale;
}

export async function ContactMap({ locale }: ContactMapProps) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-soft)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <h2 className="text-lg font-semibold text-foreground">{t("mapTitle")}</h2>
        <a
          href={contactConfig.mapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          {tCommon("directions")}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
      <div className="relative aspect-[16/10] w-full bg-surface-muted">
        <iframe
          title={t("mapTitle")}
          src={contactConfig.mapsEmbedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
