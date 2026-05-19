import { cn } from "@/utils/cn";

interface BadgeProps {
  label: string;
  tone?: "neutral" | "mint" | "ember" | "ink";
  className?: string;
}

const toneStyles: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border-ink/10 bg-white/70 text-ink",
  mint: "border-mint/40 bg-mint/15 text-ink",
  ember: "border-ember/40 bg-ember/15 text-ink",
  ink: "border-ink/20 bg-ink/10 text-ink"
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
