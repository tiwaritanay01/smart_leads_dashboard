import Button from "@/components/ui/Button";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-ember/30 bg-ember/10 px-6 py-10 text-center dark:border-ember/20 dark:bg-ember/5">
      <div className="text-sm uppercase tracking-[0.3em] text-ember">Error</div>
      <p className="max-w-sm text-sm text-ink dark:text-white/70">{message}</p>
      {onRetry ? (
        <Button variant="ghost" onClick={onRetry}>
          Retry
        </Button>
      ) : null}
    </div>
  );
};

export default ErrorState;
