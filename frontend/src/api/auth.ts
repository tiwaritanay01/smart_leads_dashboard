import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { User, UserRole } from "@/types/user";

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role?: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

const unwrap = (response: ApiResponse<AuthResponse>): AuthResponse => {
  if (!response.data) {
    throw new Error(response.message);
  }
  return response.data;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    payload
  );

  return unwrap(data);
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    payload
  );

  return unwrap(data);
};
