import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface CallToActionProps {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CallToAction({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CallToActionProps) {
  return (
    <section className="rounded-lg border border-border bg-accent-soft p-8 shadow-[var(--shadow-soft)] md:p-10">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p> : null}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={primaryHref}>
          <Button>{primaryLabel}</Button>
        </Link>
        {secondaryLabel && secondaryHref ? (
          <Link href={secondaryHref}>
            <Button variant="outline">{secondaryLabel}</Button>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
