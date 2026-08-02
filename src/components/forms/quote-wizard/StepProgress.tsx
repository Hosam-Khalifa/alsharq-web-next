"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface WizardStepMeta {
  id: string;
  title: string;
}

interface StepProgressProps {
  steps: WizardStepMeta[];
  currentStep: number;
  ariaLabel: string;
}

export function StepProgress({ steps, currentStep, ariaLabel }: StepProgressProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <nav aria-label={ariaLabel} className="space-y-4">
      <div className="h-1.5 overflow-hidden rounded-full bg-border md:hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm font-medium text-foreground md:hidden">
        {steps[currentStep]?.title}
      </p>

      <ol className="hidden gap-2 md:grid md:grid-cols-5">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <li key={step.id} className="min-w-0">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2.5 transition",
                  active && "border-primary bg-accent-soft shadow-[0_0_0_1px_rgb(230_126_34/0.25)]",
                  completed && "border-primary/40 bg-surface",
                  !active && !completed && "border-border bg-surface/60",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    active || completed
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-muted text-muted-foreground",
                  )}
                >
                  {completed ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : index + 1}
                </span>
                <span
                  className={cn(
                    "truncate text-xs font-medium sm:text-sm",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
