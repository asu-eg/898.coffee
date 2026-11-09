import { useState } from "react";
import { LIMITS } from "../config";
import type { ReviewField, ReviewFormValues } from "../types/form";

const EMPTY_FORM: ReviewFormValues = {
  message: "",
  name: "",
  contact: "",
  website: "",
};

export function useReviewForm() {
  const [values, setValues] = useState<ReviewFormValues>(EMPTY_FORM);

  const trimmedLength = values.message.trim().length;
  const isValid = trimmedLength >= LIMITS.minNote;

  function setField(field: ReviewField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function reset() {
    setValues(EMPTY_FORM);
  }

  function toPayload(): ReviewFormValues {
    return {
      ...values,
      message: values.message.trim(),
      name: values.name.trim(),
      contact: values.contact.trim(),
    };
  }

  return {
    values,
    isValid,
    showTooShort: !isValid && trimmedLength > 0,
    setField,
    reset,
    toPayload,
  };
}
