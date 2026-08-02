import type { Locale, LocalizedString } from "@/types";

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getLocalizedValue<T extends LocalizedString>(
  value: T,
  locale: Locale,
): string {
  return value[locale];
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

export function buildWhatsAppUrl(phone: string, message?: string): string {
  const normalized = phone.replace(/\D/g, "");
  const base = `https://wa.me/${normalized}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildTelUrl(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function buildMailtoUrl(email: string, subject?: string): string {
  return subject ? `mailto:${email}?subject=${encodeURIComponent(subject)}` : `mailto:${email}`;
}
