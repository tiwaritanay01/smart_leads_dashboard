import jwt, { type SignOptions } from "jsonwebtoken";
import { z } from "zod";
import { env } from "@/config/env";
import { UserRole } from "@/types/user";

const TokenSchema = z.object({
  userId: z.string(),
  role: z.nativeEnum(UserRole)
});

export type AuthTokenPayload = z.infer<typeof TokenSchema>;

export const generateToken = (payload: AuthTokenPayload): string => {
  const options: SignOptions = {
    // env.JWT_EXPIRES_IN is validated as non-empty string — cast satisfies SignOptions
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
  };
  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const verifyToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  return TokenSchema.parse(decoded);
};
