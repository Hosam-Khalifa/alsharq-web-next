import { Award, Building2, Factory, type LucideIcon } from "lucide-react";

export type HeroStatIconKey = "manufacturing" | "projects" | "experience";

export interface HeroStatItem {
  id: string;
  icon: HeroStatIconKey;
  title: string;
  value: string;
}

const statIcons: Record<HeroStatIconKey, LucideIcon> = {
  manufacturing: Factory,
  projects: Building2,
  experience: Award,
};

interface HeroStatsStripProps {
  items: HeroStatItem[];
  ariaLabel: string;
}

export function HeroStatsStrip({ items, ariaLabel }: HeroStatsStripProps) {
  return (
    <section
      aria-label={ariaLabel}
      className="relative z-30 -mt-5 rounded-t-[1.75rem] bg-white px-4 pb-8 pt-8 shadow-[0_-8px_40px_rgb(15_17_21/0.08)] dark:bg-surface sm:-mt-6 sm:rounded-t-[2rem] sm:px-6 sm:pb-10 sm:pt-9 md:-mt-7"
    >
      <ul className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-border">
        {items.map((item) => {
          const Icon = statIcons[item.icon];

          return (
            <li
              key={item.id}
              className="group flex flex-col items-center gap-3 px-4 py-5 text-center transition duration-300 hover:-translate-y-1 sm:py-2"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft text-muted-foreground transition duration-300 group-hover:text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
              <p className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
                {item.value}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
