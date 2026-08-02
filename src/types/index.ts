import type { locales } from "@/config/site";
import type { QuoteWizardValues } from "@/lib/validation/quote-wizard-schema";

export type Locale = (typeof locales)[number];

export interface LocalizedString {
  ar: string;
  en: string;
}

export type CustomerType =
  | "individual"
  | "company"
  | "contractor"
  | "engineering_office"
  | "developer"
  | "government"
  | "other";

export type ContactMethod = "phone" | "email" | "whatsapp";
export type SizeType = "standard" | "custom";
export type StandardWidth = "85" | "90" | "100";
export type FrameSize = "17" | "22";
export type QuoteCategory = "doors" | "boards";
export type QuoteRequestType = "doors" | "boards" | "both";

/** @deprecated Prefer door/board product arrays on QuoteRequestPayload */
export interface QuoteOrderItem {
  productOrCode: string;
  quantity: number;
  sizeType: SizeType;
  standardWidth?: StandardWidth;
  customWidthCm?: number;
  doorHeightCm?: number;
  frameSize?: FrameSize;
  colorOrFinish?: string;
  notes?: string;
}

export interface QuoteRequestPayload extends QuoteWizardValues {
  requestType: QuoteRequestType;
  submittedAt: string;
}

export interface ContactRequestPayload {
  name: string;
  email: string;
  mobile: string;
  inquiryType: string;
  message: string;
  privacyConsent: boolean;
  honeypot?: string;
}
