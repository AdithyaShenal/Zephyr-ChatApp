import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/errors.js";

function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log full error (good for debugging)
  console.error(err);

  // Default values
  let status = 500;
  let message = "Something went wrong. Please try again later";
  let code = "INTERNAL_ERROR";
  let details: unknown = null;

  // Handle known AppError
  if (err instanceof AppError) {
    status = err.status;
    message = err.message;
    code = err.code;
    details = err.details ?? null;
  }

  return res.status(status).json({
    status,
    message,
    code,
    details,
  });
}

export default errorHandler;
