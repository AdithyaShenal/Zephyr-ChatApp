import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { InternalError, UnauthorizedError } from "../errors/errors.js";

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.authToken;

  if (!token) throw new UnauthorizedError("No token provided");

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not configured");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    req.user = decoded;
    next();
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
}

export default auth;
