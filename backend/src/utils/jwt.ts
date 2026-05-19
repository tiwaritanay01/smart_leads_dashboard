import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "@/config/env";
import { UserRole } from "@/types/user";

const TokenSchema = z.object({
  userId: z.string(),
  role: z.nativeEnum(UserRole)
});

export type AuthTokenPayload = z.infer<typeof TokenSchema>;

export const generateToken = (payload: AuthTokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN
  });
};

export const verifyToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  return TokenSchema.parse(decoded);
};
