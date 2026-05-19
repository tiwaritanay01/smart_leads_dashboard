import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "@/utils/jwt";
import { AppError } from "@/utils/appError";

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = header.slice(7).trim();

  try {
    const payload = verifyToken(token);
    req.user = payload;
    return next();
  } catch (error) {
    return next(new AppError("Unauthorized", 401));
  }
};
