import Button from "@/components/ui/Button";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-ink/20 bg-white/70 px-6 py-10 text-center dark:border-white/10 dark:bg-white/5">
      <div className="text-sm uppercase tracking-[0.3em] text-slate dark:text-white/30">Empty</div>
      <h3 className="font-display text-2xl font-semibold text-ink dark:text-white/80">{title}</h3>
      <p className="max-w-sm text-sm text-slate dark:text-white/40">{description}</p>
      {actionLabel && onAction ? (
        <Button variant="ghost" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
};

export default EmptyState;
