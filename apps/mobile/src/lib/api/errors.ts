type SupportedErrorCode =
  | "auth_required"
  | "forbidden"
  | "rate_limited"
  | "unavailable"
  | "invalid_request";

const userSafeMessages: Record<SupportedErrorCode, string> = {
  auth_required: "You need to sign in again before this action can continue.",
  forbidden: "You do not have permission to perform that action.",
  rate_limited: "That action is temporarily limited. Please try again shortly.",
  unavailable: "This finance action is temporarily unavailable. Please try again.",
  invalid_request: "The request could not be completed. Please review the input and try again."
};

export class UserSafeApiError extends Error {
  readonly code: SupportedErrorCode;
  readonly retryable: boolean;

  constructor(code: SupportedErrorCode, retryable = false) {
    super(userSafeMessages[code]);
    this.name = "UserSafeApiError";
    this.code = code;
    this.retryable = retryable;
  }
}

type ErrorShape = {
  status?: number;
  message?: string;
  code?: string;
  name?: string;
};

export function toUserSafeApiError(error: unknown) {
  const candidate = error as ErrorShape | undefined;
  const status = candidate?.status;
  const code = candidate?.code?.toLowerCase();
  const message = candidate?.message?.toLowerCase() ?? "";

  if (status === 401 || code === "auth_required" || message.includes("jwt")) {
    return new UserSafeApiError("auth_required");
  }

  if (status === 403 || code === "forbidden") {
    return new UserSafeApiError("forbidden");
  }

  if (status === 429 || code === "rate_limited") {
    return new UserSafeApiError("rate_limited", true);
  }

  if (status === 400 || code === "invalid_request") {
    return new UserSafeApiError("invalid_request");
  }

  return new UserSafeApiError("unavailable", true);
}
