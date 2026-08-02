import { MessageCircle } from "lucide-react";
import { company } from "@/config/company";
import { buildWhatsAppUrl } from "@/lib/i18n/locale-utils";

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl(company.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] end-[max(1rem,env(safe-area-inset-inline-end))] z-[var(--z-floating)] inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-elevated)] hover:bg-primary-hover"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
