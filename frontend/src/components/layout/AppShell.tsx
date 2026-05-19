import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-8 flex flex-col gap-6 rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-soft md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate">Smart Leads</p>
          <h1 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            {title}
          </h1>
          {subtitle ? <p className="mt-2 text-sm text-slate">{subtitle}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {actions}
          {user ? (
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                label={user.role}
                tone={user.role === "Admin" ? "ink" : "mint"}
              />
              <span className="text-sm text-slate">{user.email}</span>
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
