import type { ErrorRequestHandler } from "express";
import { Error as MongooseError } from "mongoose";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { AppError } from "@/utils/appError";
import type { ApiResponse } from "@/types/api";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = 500;
  let message = "Internal server error";
  let errors: string[] | undefined;

  // Log the actual error for debugging
  if (!(err instanceof AppError)) {
    console.error("Unhandled error:", err);
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation error";
    errors = err.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
  } else if (err instanceof MongooseError.CastError) {
    statusCode = 400;
    message = "Invalid identifier";
  } else if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = "Validation error";
    errors = Object.values(err.errors).map((item) => item.message);
  } else if (err instanceof JsonWebTokenError) {
    statusCode = 401;
    message = "Invalid token";
  } else if (err instanceof TokenExpiredError) {
    statusCode = 401;
    message = "Token expired";
  } else if (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: number }).code === 11000
  ) {
    statusCode = 409;
    message = "Duplicate key";
  }

  const payload: ApiResponse<null> & { errors?: string[] } = {
    success: false,
    message,
    data: null
  };

  if (errors) {
    payload.errors = errors;
  }

  res.status(statusCode).json(payload);
};
