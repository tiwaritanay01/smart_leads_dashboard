import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <label className="flex w-full flex-col gap-2 text-sm font-medium text-ink dark:text-white/50">
        <span className="text-xs uppercase tracking-[0.2em] text-ink/80 dark:text-white/30">
          {label}
        </span>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 rounded-2xl border border-ink/10 bg-white/80 px-4 text-sm text-ink shadow-sm outline-none transition focus:border-ink/30 focus:ring-2 focus:ring-[color:var(--ring)] placeholder:text-ink/60 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-white/20 dark:focus:border-white/20",
            error && "border-ember/60 focus:border-ember/60",
            className
          )}
          {...props}
        />
        {error ? <span className="text-xs text-ember">{error}</span> : null}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
