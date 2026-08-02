import { MessageCircle } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/i18n/locale-utils";

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl(company.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 end-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-elevated)] hover:bg-primary-hover"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
