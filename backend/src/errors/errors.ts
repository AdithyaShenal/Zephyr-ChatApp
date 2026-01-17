export class AppError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(
    status: number,
    message: string,
    code: string = "ERROR",
    details?: unknown
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype); // We have to put these when extending "Error" class

    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad Request", details?: unknown) {
    super(400, message, "BAD_REQUEST", details);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Not Found") {
    super(404, message, "NOT_FOUND");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(401, message, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden") {
    super(403, message, "FORBIDDEN");
  }
}

export class InternalError extends AppError {
  constructor(message: string = "Internal Server Error") {
    super(500, message, "INTERNAL_ERROR");
  }
}

export class ConflictError extends AppError {
  constructor(message: string = "Resources Conflict Error") {
    super(409, message, "CONFLICT_ERROR");
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Request Validation Error", details?: unknown) {
    super(400, message, "VALIDATION_ERROR", details);
  }
}
