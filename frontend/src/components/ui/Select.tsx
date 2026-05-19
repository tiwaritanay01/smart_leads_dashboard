import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, id, ...props }, ref) => {
    const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate dark:text-white/50">
        <span className="text-xs uppercase tracking-[0.2em] text-slate/80 dark:text-white/30">
          {label}
        </span>
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "h-11 rounded-2xl border border-ink/10 bg-white/80 px-4 text-sm text-ink shadow-sm outline-none transition focus:border-ink/30 focus:ring-2 focus:ring-[color:var(--ring)] dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:focus:border-white/20",
            error && "border-ember/60 focus:border-ember/60",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? <span className="text-xs text-ember">{error}</span> : null}
      </label>
    );
  }
);

Select.displayName = "Select";

export default Select;
