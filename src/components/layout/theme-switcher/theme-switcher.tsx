"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const mounted = useIsMounted();

  useEffect(() => {
    if (!mounted) return;
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "dark" : "light");
    }
  }, [mounted, resolvedTheme, setTheme, theme]);

  if (!mounted) {
    return <div className="h-10 w-20 rounded-md border border-border bg-muted/40" aria-hidden="true" />;
  }

  const activeTheme = theme === "dark" || theme === "light" ? theme : resolvedTheme === "dark" ? "dark" : "light";

  const options = [
    { value: "light" as const, label: t("light"), icon: Sun },
    { value: "dark" as const, label: t("dark"), icon: Moon },
  ];

  return (
    <div className="flex items-center gap-1 rounded-md border border-border p-1" role="group" aria-label={t("label")}>
      {options.map(({ value, label, icon: Icon }) => (
        <Button
          key={value}
          variant={activeTheme === value ? "primary" : "ghost"}
          size="sm"
          onClick={() => setTheme(value)}
          aria-pressed={activeTheme === value}
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}
