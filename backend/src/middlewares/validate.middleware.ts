import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";

type ValidateTarget = "body" | "query" | "params";

export const validate = (schema: ZodTypeAny, target: ValidateTarget = "body") => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const data = target === "body" ? req.body : target === "query" ? req.query : req.params;
    const parsed = schema.parse(data);

    if (target === "body") {
      req.body = parsed;
    } else if (target === "query") {
      req.query = parsed as Request["query"];
    } else {
      req.params = parsed as Request["params"];
    }

    next();
  };
};
