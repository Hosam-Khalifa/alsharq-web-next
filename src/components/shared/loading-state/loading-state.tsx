interface LoadingStateProps {
  message: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-12" role="status" aria-live="polite">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
