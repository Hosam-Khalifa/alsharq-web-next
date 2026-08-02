import type { ContactRequestPayload } from "@/types";

export interface ContactSubmissionResult {
  success: boolean;
  error?: string;
}

export interface ContactSubmissionService {
  submitContact(data: ContactRequestPayload): Promise<ContactSubmissionResult>;
}

function generateReference(prefix: string): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${date}-${random}`;
}

export class MockContactService implements ContactSubmissionService {
  async submitContact(data: ContactRequestPayload): Promise<ContactSubmissionResult> {
    if (data.honeypot) {
      return { success: false, error: "Invalid submission" };
    }

    // TODO: Integrate email provider when credentials are available
    console.info("[MockContactService] Contact submission received", {
      reference: generateReference("NE-CONTACT"),
      name: data.name,
      email: data.email,
    });

    return { success: true };
  }
}

export const contactService: ContactSubmissionService = new MockContactService();
