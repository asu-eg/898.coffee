import { useRef, useState } from "react";
import { getReviewError, submitReview } from "../api/review";
import type { ReviewError, ReviewFormValues } from "../types/form";

export function useReviewSubmit() {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<ReviewError | null>(null);

  const attempt = useRef(0);
  const inFlight = useRef(false);

  async function submit(payload: ReviewFormValues): Promise<boolean> {
    if (inFlight.current) return false;

    inFlight.current = true;
    const current = ++attempt.current;
    setSending(true);
    setError(null);

    try {
      await submitReview(payload);
      return current === attempt.current;
    } catch (cause) {
      if (current === attempt.current) setError(getReviewError(cause));
      return false;
    } finally {
      if (current === attempt.current) {
        inFlight.current = false;
        setSending(false);
      }
    }
  }

  function clearError() {
    setError(null);
  }

  function reset() {
    attempt.current++;
    inFlight.current = false;
    setSending(false);
    setError(null);
  }

  return { sending, error, submit, clearError, reset };
}
