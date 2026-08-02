import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "validation.required"),
  email: z.string().email("validation.email"),
  mobile: z.string().min(8, "validation.phone"),
  inquiryType: z.string().min(1, "validation.required"),
  message: z.string().min(10, "validation.required"),
  privacyConsent: z.coerce.boolean().refine((value) => value === true, { message: "validation.privacyConsent" }),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export {
  quoteWizardSchema as quoteFormSchema,
  quoteWizardSchema,
  type QuoteWizardValues,
  type QuoteWizardValues as QuoteFormValues,
} from "./quote-wizard-schema";
