import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { company } from "@/config/company";
import { contactConfig } from "@/config/contact";
import { buildMailtoUrl, buildTelUrl, buildWhatsAppUrl } from "@/lib/i18n/locale-utils";
import type { Locale } from "@/types";

interface ContactInfoCardsProps {
  locale: Locale;
}

export async function ContactInfoCards({ locale }: ContactInfoCardsProps) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const items = [
    {
      id: "phone",
      icon: Phone,
      label: tCommon("phone"),
      value: company.phoneDisplay,
      href: buildTelUrl(company.phone),
      external: false,
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: tCommon("whatsapp"),
      value: company.phoneDisplay,
      href: buildWhatsAppUrl(company.whatsapp, t("whatsappPrefill")),
      external: true,
    },
    {
      id: "email",
      icon: Mail,
      label: tCommon("email"),
      value: company.email,
      href: buildMailtoUrl(company.email, t("emailSubject")),
      external: false,
    },
    {
      id: "address",
      icon: MapPin,
      label: tCommon("address"),
      value: `${company.address[locale]} (${company.locationCode})`,
      href: contactConfig.mapsDirectionsUrl,
      external: true,
    },
  ] as const;

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id}>
            <a
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="group flex h-full items-start gap-3 rounded-2xl border border-border bg-surface p-4 shadow-[var(--shadow-soft)] transition hover:border-primary/45 hover:shadow-[var(--shadow-elevated)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-medium text-muted-foreground">{item.label}</span>
                <span className="mt-1 block text-sm font-semibold leading-relaxed text-foreground break-words">
                  {item.value}
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
