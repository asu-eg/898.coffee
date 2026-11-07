import { useLayoutEffect, useState } from "react";
import { ApiError, postJson } from "@/shared/api/";
import { useStrings } from "@/shared/i18n";
import { useLocation, ROUTES } from "@/shared/router";
import { ChoiceCard } from "./components/choice-card";
import { ReviewForm, type ReviewFormValues } from "./components/review-form";
import { ReviewDrawer } from "./components/review-drawer";
import { ThankYou } from "./components/thank-you";
import { GOOGLE_REVIEW_URL, LIMITS, REVIEW_API } from "./config";
import { strings } from "./strings";

type Step = "choose" | "note" | "sent";

const EMPTY_FORM: ReviewFormValues = {
  message: "",
  name: "",
  contact: "",
  website: "",
};

const styles = {
  choices:
    "flex flex-col gap-3 pb-4 animate-reveal-in",
};

export function ReviewPage() {
  const s = useStrings(strings);
  const [location, setLocation] = useLocation();
  const isOpen = location === ROUTES.review;
  const close = () => setLocation(ROUTES.landing);

  const [step, setStep] = useState<Step>("choose");
  const [form, setForm] = useState<ReviewFormValues>(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const message = form.message.trim();
  const tooShort = message.length < LIMITS.minNote;

  useLayoutEffect(() => {
    if (!isOpen) return;
    setTimeout(() => {
      setStep("choose");
      setForm(EMPTY_FORM);
      setSending(false);
      setError(null);
    }, 0);
  }, [isOpen]);

  function openGoogleReview() {
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer");
    close();
  }

  function getErrorMessage(e: unknown): string {
    if (!(e instanceof ApiError)) return s.error;
    if (e.status === 429 || e.code === "RATE_LIMITED") return s.tooMany;
    if (e.status === 422 || e.code === "INVALID_INPUT") return s.invalidInput;
    if (e.code === "TIMEOUT") return s.timeout;
    if (
      e.status >= 500 ||
      e.code === "INTERNAL_ERROR" ||
      e.code === "INVALID_RESPONSE"
    ) {
      return s.serverError;
    }
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

  return (
    <ReviewDrawer
      isOpen={isOpen}
      onClose={close}
      title={step === "note" ? s.noteTitle : s.sheetTitle}
      closeLabel={s.close}
    >
      {step === "choose" && (
        <div className={styles.choices}>
          <ChoiceCard
            icon="star"
            title={s.googleTitle}
            hint={s.googleHint}
            onPress={openGoogleReview}
          />
          <ChoiceCard
            icon="chat"
            title={s.noteTitle}
            hint={s.noteHint}
            onPress={() => setStep("note")}
          />
        </div>
      )}

      {step === "note" && (
        <ReviewForm
          values={form}
          onChange={(field, value) => {
            setForm((prev) => ({ ...prev, [field]: value }));
            if (error) setError(null);
          }}
          onSubmit={submit}
          limits={LIMITS}
          labels={{
            note: s.noteLabel,
            name: s.nameLabel,
            contact: s.contactLabel,
            submit: sending ? s.sending : s.send,
          }}
          noteHint={tooShort && message.length > 0 ? s.tooShort : undefined}
          canSubmit={!tooShort && !sending}
          error={error}
        />
      )}

      {step === "sent" && (
        <ThankYou message={s.thanks} closeLabel={s.close} onClose={close} />
      )}
    </ReviewDrawer>
  );
}
