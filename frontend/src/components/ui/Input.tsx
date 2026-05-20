import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    const isPassword = props.type === "password";
    const inputType = isPassword ? (show ? "text" : "password") : (props.type as any) ?? "text";

    return (
      <label className="flex w-full flex-col gap-2 text-sm font-medium text-ink dark:text-white/50">
        <span className="text-xs uppercase tracking-[0.2em] text-ink/80 dark:text-white/30">
          {label}
        </span>
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={cn(
              "h-11 w-full rounded-2xl border border-ink/10 bg-white/80 px-4 pr-11 text-sm text-ink shadow-sm outline-none transition focus:border-ink/30 focus:ring-2 focus:ring-[color:var(--ring)] placeholder:text-ink/60 dark:border-white/10 dark:bg-white/5 dark:text-white/90 dark:placeholder:text-white/20 dark:focus:border-white/20",
              error && "border-ember/60 focus:border-ember/60",
              className
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              aria-label={show ? "Hide password" : "Show password"}
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/60 hover:text-ink dark:text-white/50 outline-none"
            >
              {show ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.97 10.97 0 0 1 12 19c-4.478 0-8.268-2.943-9.542-7a10.97 10.97 0 0 1 1.67-3.042" />
                  <path d="M1 1l22 22" />
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              )}
            </button>
          ) : null}
        </div>

        {error ? <span className="text-xs text-ember">{error}</span> : null}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
