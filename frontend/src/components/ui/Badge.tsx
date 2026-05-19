import { cn } from "@/utils/cn";

interface BadgeProps {
  label: string;
  tone?: "neutral" | "mint" | "ember" | "ink";
  className?: string;
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border-ink/10 bg-white/70 text-ink dark:border-white/10 dark:bg-white/5 dark:text-white/80",
  mint: "border-mint/40 bg-mint/15 text-ink dark:border-mint/30 dark:bg-mint/10 dark:text-mint",
  ember: "border-ember/40 bg-ember/15 text-ink dark:border-ember/30 dark:bg-ember/10 dark:text-ember",
  ink: "border-ink/20 bg-ink/10 text-ink dark:border-white/20 dark:bg-white/10 dark:text-white/80"
};

const Badge = ({ label, tone = "neutral", className }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
        toneStyles[tone],
        className
      )}
    >
      {label}
    </span>
  );
};

export default Badge;
