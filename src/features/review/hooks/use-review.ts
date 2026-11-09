import { useState } from "react";
import { GOOGLE_REVIEW_URL } from "../config";
import type { ReviewStep } from "../types/flow";
import type { ReviewField } from "../types/form";
import { useReviewDrawer } from "./use-review-drawer";
import { useReviewForm } from "./use-review-form";
import { useReviewSubmit } from "./use-review-submit";

export function useReview() {
  const sheet = useReviewDrawer();
  const form = useReviewForm();
  const submission = useReviewSubmit();
  const [step, setStep] = useState<ReviewStep>("choose");

  function close() {
    setStep("choose");
    form.reset();
    submission.reset();
    sheet.close();
  }

  function openGoogleReview() {
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
    close();
  }

  function changeField(field: ReviewField, value: string) {
    form.setField(field, value);
    submission.clearError();
  }

  async function submit() {
    if (!form.isValid || submission.sending) return;
    if (await submission.submit(form.toPayload())) setStep("sent");
  }

  return {
    isOpen: sheet.isOpen,
    step,
    form: {
      values: form.values,
      isValid: form.isValid,
      showTooShort: form.showTooShort,
    },
    sending: submission.sending,
    error: submission.error,
    goToNote: () => setStep("note"),
    openGoogleReview,
    changeField,
    submit,
    close,
  };
}
