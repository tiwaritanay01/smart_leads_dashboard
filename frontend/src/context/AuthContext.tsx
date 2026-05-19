import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import type { User } from "@/types/user";
import {
  clearStoredAuth,
  getAuthToken,
  getStoredUser,
  setStoredAuth
} from "@/utils/storage";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getAuthToken());
  // isLoading is false immediately since we read synchronously from localStorage
  const [isLoading] = useState(false);

  const login = useCallback((newToken: string, newUser: User): void => {
    setStoredAuth(newToken, newUser);
    setUser(newUser);
    setToken(newToken);
  }, []);

  const logout = useCallback((): void => {
    clearStoredAuth();
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, isLoading, login, logout }),
    [user, token, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
