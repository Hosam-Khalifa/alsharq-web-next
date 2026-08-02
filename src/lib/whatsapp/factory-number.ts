import { company } from "@/config/company";

/** Digits-only international WhatsApp number for wa.me links. */
export function getFactoryWhatsAppNumber(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  if (fromEnv.length >= 8) {
    return fromEnv;
  }

  const fromCompany = company.whatsapp.replace(/\D/g, "");
  if (fromCompany.length >= 8) {
    return fromCompany;
  }

  return null;
}
