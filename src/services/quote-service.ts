import type { QuoteRequestPayload, QuoteRequestType } from "@/types";

export interface QuoteSubmissionResult {
  success: boolean;
  referenceNumber?: string;
  error?: string;
}

export interface QuoteSubmissionService {
  submitQuote(data: QuoteRequestPayload): Promise<QuoteSubmissionResult>;
}

function generateReferenceNumber(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NE-WPC-${date}-${random}`;
}

function resolveRequestType(categories: Array<"doors" | "boards">): QuoteRequestType {
  const hasDoors = categories.includes("doors");
  const hasBoards = categories.includes("boards");
  if (hasDoors && hasBoards) return "both";
  if (hasBoards) return "boards";
  return "doors";
}

function buildEmailSubject(requestType: QuoteRequestType): string {
  if (requestType === "both") return "طلب عرض سعر جديد — أبواب وألواح WPC";
  if (requestType === "boards") return "طلب عرض سعر جديد — ألواح فوم WPC";
  return "طلب عرض سعر جديد — أبواب WPC";
}

export class MockQuoteService implements QuoteSubmissionService {
  async submitQuote(data: QuoteRequestPayload): Promise<QuoteSubmissionResult> {
    if (data.honeypot) {
      return { success: false, error: "Invalid submission" };
    }

    const referenceNumber = generateReferenceNumber();
    const requestType = data.requestType || resolveRequestType(data.selectedCategories);

    // Integration point for factory email / CRM — payload is structured for delivery.
    console.info("[MockQuoteService] Quote submission received", {
      subject: buildEmailSubject(requestType),
      referenceNumber,
      requestType,
      locale: data.locale,
      submittedAt: data.submittedAt,
      customer: {
        name: data.customer.fullName,
        phone: data.customer.primaryPhone,
        email: data.customer.email,
        city: data.customer.city,
        type: data.customer.customerType,
        preferredContact: data.customer.preferredContact,
      },
      doorProducts: data.selectedCategories.includes("doors") ? data.doors : [],
      boardProducts: data.selectedCategories.includes("boards") ? data.boards : [],
      attachments: data.attachments.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    });

    return { success: true, referenceNumber };
  }
}

export const quoteService: QuoteSubmissionService = new MockQuoteService();
