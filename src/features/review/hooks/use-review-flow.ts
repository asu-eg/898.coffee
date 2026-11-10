import { useEffect, useState } from "react";
import { ROUTES, useLocation } from "@/shared/router";

type ReviewStep = "choices" | "note" | "success";

const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ6TmFLgCd9xQRJhy85GpSRQ4";

export function useReviewFlow() {
  const [location, setLocation] = useLocation();
  const [step, setStep] = useState<ReviewStep>("choices");
  const isOpen = location === ROUTES.review;

  useEffect(() => {
    if (!isOpen) setStep("choices");
  }, [isOpen]);

  function close() {
    setStep("choices");
    if (location !== ROUTES.landing) setLocation(ROUTES.landing);
  }

  function openGoogleReview() {
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
    close();
  }

  function chooseNote() {
    setStep("note");
  }

  function complete() {
    setStep("success");
  }

  return {
    isOpen,
    step,
    close,
    openGoogleReview,
    chooseNote,
    complete,
  };
}
