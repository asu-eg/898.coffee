import { ApiError, postJson } from "@/shared/api";
import { REVIEW_API } from "../config";
import type { ReviewError, ReviewFormValues } from "../types/form";

export async function submitReview(payload: ReviewFormValues): Promise<void> {
  await postJson(REVIEW_API, payload);
}

export function getReviewError(cause: unknown): ReviewError {
  if (!(cause instanceof ApiError)) return "unknown";
  if (cause.status === 429 || cause.code === "RATE_LIMITED") {
    return "rate-limited";
  }
  if (cause.status === 422 || cause.code === "INVALID_INPUT") {
    return "invalid-input";
  }
  if (cause.code === "TIMEOUT") return "timeout";
  if (cause.status >= 500 || cause.code === "INTERNAL_ERROR") {
    return "server";
  }
  return "unknown";
}
