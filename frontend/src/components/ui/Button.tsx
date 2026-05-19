import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import Spinner from "@/components/ui/Spinner";

type ButtonVariant = "primary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const Button = ({
  variant = "primary",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-70";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-ink text-white shadow-soft hover:bg-ink/90",
    ghost: "border border-ink/10 bg-white/70 text-ink hover:bg-white",
    danger: "bg-ember text-white shadow-soft hover:bg-ember/90"
  };

  return (
    <button
      className={cn(base, variants[variant], className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : null}
      {children}
    </button>
  );
};

export default Button;
