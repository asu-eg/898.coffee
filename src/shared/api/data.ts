export class ApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export interface ApiErrorResponse {
  ok?: false;
  error?: string;
  code?: string;
}

export const API_CONFIG = {
  baseUrl: "/api",
  timeoutMs: 10000,
} as const;
