interface ErrorStateProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({ title, actionLabel, onAction }: ErrorStateProps) {
  return (
    <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-8 text-center" role="alert">
      <p className="font-medium text-destructive">{title}</p>
      {actionLabel && onAction ? (
        <button type="button" onClick={onAction} className="mt-4 text-sm underline">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
