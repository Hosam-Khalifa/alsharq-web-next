import { Droplet, ShieldCheck, TreePalm, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type HeroFeatureIconKey = "saudi" | "quality" | "moisture";

export interface HeroFeatureItem {
  id: string;
  icon: HeroFeatureIconKey;
  title: string;
  description: string;
}

const featureIcons: Record<HeroFeatureIconKey, LucideIcon> = {
  saudi: TreePalm,
  quality: ShieldCheck,
  moisture: Droplet,
};

interface HeroFeatureBarProps {
  items: HeroFeatureItem[];
  ariaLabel: string;
}

export function HeroFeatureBar({ items, ariaLabel }: HeroFeatureBarProps) {
  return (
    <div className="factory-hero__feature-bar pointer-events-none absolute inset-x-0 bottom-0 z-[2] px-4 pb-5 sm:px-6 sm:pb-6 md:pb-7">
      <ul
        aria-label={ariaLabel}
        className="pointer-events-auto mx-auto grid max-w-5xl grid-cols-1 gap-1 rounded-[24px] border border-white/10 bg-[rgba(20,20,20,0.55)] p-3 shadow-[0_18px_50px_rgb(0_0_0/0.28)] backdrop-blur-[18px] sm:grid-cols-2 sm:p-4 md:grid-cols-3 md:gap-0 md:p-5"
      >
        {items.map((item, index) => {
          const Icon = featureIcons[item.icon];

          return (
            <li
              key={item.id}
              className={cn(
                "group flex items-start gap-3 rounded-2xl px-3 py-3 transition duration-300 hover:-translate-y-1 sm:px-4",
                index > 0 && "md:border-s md:border-white/10",
              )}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/70 text-primary transition duration-300 group-hover:border-primary group-hover:shadow-[0_0_18px_rgb(230_126_34/0.35)]">
                <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </div>
              <div className="min-w-0 text-start">
                <p className="text-sm font-semibold text-white sm:text-[0.95rem]">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/70 sm:text-sm">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
