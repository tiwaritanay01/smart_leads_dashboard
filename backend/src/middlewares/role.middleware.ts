import type { NextFunction, Request, Response } from "express";
import { UserRole } from "@/types/user";
import { AppError } from "@/utils/appError";

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const role = req.user?.role;

    if (!role) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!roles.includes(role)) {
      return next(new AppError("Forbidden", 403));
    }

    return next();
  };
};
