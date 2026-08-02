interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-surface-muted py-12 md:py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-3xl text-muted-foreground">{subtitle}</p> : null}
      </div>
    </section>
  );
}
