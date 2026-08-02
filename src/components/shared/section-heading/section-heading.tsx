interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={className}>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      {subtitle ? <p className="mt-2 text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
