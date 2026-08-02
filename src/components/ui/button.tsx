import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active":
            variant === "primary",
          "bg-secondary text-secondary-foreground hover:bg-surface-muted": variant === "secondary",
          "border border-border-strong bg-transparent hover:border-accent hover:bg-accent-soft":
            variant === "outline",
          "hover:bg-accent-soft hover:text-foreground": variant === "ghost",
          "bg-destructive text-destructive-foreground hover:opacity-90": variant === "destructive",
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4 text-sm": size === "md",
          "h-11 px-6 text-base": size === "lg",
        },
        className,
      )}
      {...props}
    />
  );
});
