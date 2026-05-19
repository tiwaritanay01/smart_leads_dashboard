import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface AppShellProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const AppShell = ({ title, subtitle, actions, children }: AppShellProps) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-8 flex flex-col gap-6 rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-soft dark:border-white/10 dark:bg-white/5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate dark:text-white/40">Smart Leads</p>
          <h1 className="font-display text-3xl font-semibold text-ink dark:text-white/90 md:text-4xl">
            {title}
          </h1>
          {subtitle ? <p className="mt-2 text-sm text-slate dark:text-white/50">{subtitle}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {actions}
          {/* Moon / Sun toggle */}
          <button
            id="theme-toggle"
            type="button"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink transition hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20"
          >
            {theme === "dark" ? (
              /* Sun icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              /* Moon icon */
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          {user ? (
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                label={user.role}
                tone={user.role === "Admin" ? "ink" : "mint"}
              />
              <span className="text-sm text-slate dark:text-white/50">{user.email}</span>
              <Button variant="ghost" onClick={logout}>
                Sign out
              </Button>
            </div>
          ) : null}
        </div>
      </header>
      {children}
    </div>
  );
};

export default AppShell;

