import { useState } from "react";
import { loginUser, registerUser } from "@/api/auth";
import type { LoginPayload, RegisterPayload } from "@/api/auth";
import type { User } from "@/types/user";
import { getErrorMessage } from "@/utils/errors";

interface AuthResult {
  token: string;
  user: User;
}

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginUser(payload);
      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    }
  };

  const register = async (payload: RegisterPayload): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await registerUser(payload);
      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    }
  };

  return { login, register, isLoading, error };
};
