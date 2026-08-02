// TODO: Integrate email provider (Resend, SMTP, etc.) when credentials are available

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface EmailService {
  sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }>;
}

export class MockEmailService implements EmailService {
  async sendEmail(payload: EmailPayload): Promise<{ success: boolean; error?: string }> {
    console.info("[MockEmailService] Email queued", { to: payload.to, subject: payload.subject });
    return { success: true };
  }
}

export const emailService: EmailService = new MockEmailService();
