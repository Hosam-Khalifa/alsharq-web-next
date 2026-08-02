"use client";

import { useTranslations } from "next-intl";

interface FieldErrorProps {
  message?: string;
  id?: string;
}

export function FieldError({ message, id }: FieldErrorProps) {
  const t = useTranslations();
  if (!message) return null;

  const label = message.startsWith("validation.") ? t(message) : message;

  return (
    <p id={id} className="mt-1.5 text-xs text-destructive" role="alert">
      {label}
    </p>
  );
}
