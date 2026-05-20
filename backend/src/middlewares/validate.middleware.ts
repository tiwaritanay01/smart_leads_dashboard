import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

type ValidateTarget = "body" | "query" | "params";

export const validate = (schema: ZodTypeAny, target: ValidateTarget = "body") => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const data = target === "body" ? req.body : target === "query" ? req.query : req.params;
      const parsed = schema.parse(data);

      if (target === "body") {
        req.body = parsed;
      } else if (target === "query") {
        (req as any).validatedQuery = parsed;
      } else {
        req.params = parsed as Request["params"];
      }

      next();
    } catch (error) {
      console.error("Validation error in target:", target, error);
      next(error);
    }
  };
};
