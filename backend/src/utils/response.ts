import type { Response } from "express";

interface SuccessResponse<T> {
  success: true;
  status: number;
  message: string;
  result: T;
}

export function success<T>(
  res: Response,
  result: T,
  message = "success",
  status = 200
) {
  const payload: SuccessResponse<T> = {
    success: true,
    status,
    message,
    result,
  };

  return res.status(status).json(payload);
}

// example
// return success(res, users, "Users fetched successfully");
// return success(res, newUser, "User created", 201);
// return success(res, null, "Logged out successfully");
