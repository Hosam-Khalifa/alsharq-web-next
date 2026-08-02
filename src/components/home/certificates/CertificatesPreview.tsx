import { getTranslations } from "next-intl/server";
import { certificates } from "@/data/certificates";
import { SectionHeading } from "@/components/shared/section-heading/section-heading";
import type { Locale } from "@/types";

interface CertificatesPreviewProps {
  locale: Locale;
}

export async function CertificatesPreview({ locale }: CertificatesPreviewProps) {
  const t = await getTranslations({ locale });

  return (
    <section className="border-y border-border bg-surface-muted py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <SectionHeading title={t("home.certificatesTitle")} subtitle={t("home.certificatesSubtitle")} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {certificates.slice(0, 2).map((cert) => (
            <div key={cert.id} className="brand-interactive-card rounded-lg p-4">
              <h3 className="font-medium">{cert.title[locale]}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
