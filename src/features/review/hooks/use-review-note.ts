import { useEffect, useRef, useState } from "react";
import {
  getReviewError,
  submitReview,
  type ReviewError,
  type ReviewPayload,
} from "../api/review";

export const NOTE_LIMITS = {
  minMessage: 3,
  message: 1000,
  name: 80,
  contact: 120,
} as const;

type ReviewField = keyof ReviewPayload;

const EMPTY_NOTE: ReviewPayload = {
  message: "",
  name: "",
  contact: "",
  website: "",
};

export function useReviewNote() {
  const [values, setValues] = useState<ReviewPayload>(EMPTY_NOTE);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<ReviewError | null>(null);

  const inFlight = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const messageLength = values.message.trim().length;
  const isValid = messageLength >= NOTE_LIMITS.minMessage;

  function changeField(field: ReviewField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setError(null);
  }

  async function submit(): Promise<boolean> {
    if (!isValid || inFlight.current) return false;

    const payload: ReviewPayload = {
      ...values,
      message: values.message.trim(),
      name: values.name.trim(),
      contact: values.contact.trim(),
    };

    inFlight.current = true;
    setSending(true);
    setError(null);

    try {
      await submitReview(payload);
      return isMounted.current;
    } catch (cause) {
      if (isMounted.current) setError(getReviewError(cause));
      return false;
    } finally {
      inFlight.current = false;
      if (isMounted.current) setSending(false);
    }
  }

  return {
    values,
    sending,
    error,
    isValid,
    showTooShort: messageLength > 0 && !isValid,
    changeField,
    submit,
  };
}
