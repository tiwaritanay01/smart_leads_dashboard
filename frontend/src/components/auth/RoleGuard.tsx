import type { PropsWithChildren, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types/user";

interface RoleGuardProps extends PropsWithChildren {
  role: UserRole;
  fallback?: ReactNode;
}

const RoleGuard = ({ role, fallback = null, children }: RoleGuardProps) => {
  const { user } = useAuth();

  if (!user || user.role !== role) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleGuard;
