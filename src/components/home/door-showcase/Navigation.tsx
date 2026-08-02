"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { navigationStyles } from "./styles";

interface NavigationProps {
  direction: "previous" | "next";
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Navigation({ direction, label, onClick, disabled = false }: NavigationProps) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      className={navigationStyles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <Icon className={navigationStyles.icon} aria-hidden="true" />
    </button>
  );
}
