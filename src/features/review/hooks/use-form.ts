import { useState } from "react";
import { ApiError, postJson } from "@/shared/api/";
import { useStrings } from "@/shared/i18n";
import { GOOGLE_REVIEW_URL, LIMITS, REVIEW_API } from "../config";
import { strings } from "../strings";

type Step = "choose" | "note" | "sent";

type FormValues = {
  message: string;
  name: string;
  contact: string;
  website: string;
};

const EMPTY: FormValues = { message: "", name: "", contact: "", website: "" };

export function useForm(onClose: () => void) {
  const s = useStrings(strings);

  const [step, setStep] = useState<Step>("choose");
  const [form, setForm] = useState<FormValues>(EMPTY);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const message = form.message.trim();
  const tooShort = message.length < LIMITS.minNote;

  function updateField(field: keyof FormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  }

  function reset() {
    setStep("choose");
    setForm(EMPTY);
    setSending(false);
    setError(null);
  }

  function close() {
    reset();
    onClose();
  }

  function goToNote() {
    setStep("note");
  }

  function openGoogleReview() {
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
    close();
  }

  function getErrorMessage(e: unknown): string {
    if (!(e instanceof ApiError)) return s.error;
    if (e.status === 429 || e.code === "RATE_LIMITED") return s.tooMany;
    if (e.status === 422 || e.code === "INVALID_INPUT") return s.invalidInput;
    if (e.code === "TIMEOUT") return s.timeout;
    if (e.status >= 500 || e.code === "INTERNAL_ERROR") return s.serverError;
    return s.error;
  }

  async function submit() {
    if (tooShort || sending) return;
    setSending(true);
    setError(null);
    try {
      await postJson(REVIEW_API, {
        message,
        name: form.name.trim(),
        contact: form.contact.trim(),
        website: form.website,
      });
      setStep("sent");
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setSending(false);
    }
  }

  return {
    step,
    form,
    sending,
    error,
    tooShort,
    close,
    goToNote,
    openGoogleReview,
    updateField,
    submit,
  };
}
