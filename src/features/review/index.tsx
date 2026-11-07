import { useState } from "react";
import { Button, Form } from "react-aria-components";
import { ApiError, postJson } from "@/shared/api/";
import { useStrings } from "@/shared/i18n";
import { useLocation, ROUTES } from "@/shared/router";
import { ChoiceCard } from "./components/choice-card";
import { ReviewField } from "./components/review-field";
import { ReviewDrawer } from "./components/review-drawer";
import { ThankYou } from "./components/thank-you";
import { GOOGLE_REVIEW_URL, LIMITS, REVIEW_API } from "./config";
import { strings } from "./strings";

type Step = "choose" | "note" | "sent";

type ReviewFormValues = {
  message: string;
  name: string;
  contact: string;
  website: string;
};

const EMPTY_FORM: ReviewFormValues = {
  message: "",
  name: "",
  contact: "",
  website: "",
};

const styles = {
  choices: "flex flex-col gap-3 pb-4 animate-reveal-in",
  form: "flex flex-col gap-5 pb-2 animate-reveal-in",
  formError:
    "text-small rounded-md border border-error/30 bg-error/10 px-4 py-3 font-bold text-error",
  submit:
    "text-small mt-2 min-h-12 rounded-full bg-brand px-6 text-center font-bold text-white outline-none transition-all data-focus-visible:ring-2 data-focus-visible:ring-brand data-focus-visible:ring-offset-2 data-hovered:bg-brand/90 data-pressed:scale-[0.98] data-disabled:opacity-50",
  honeypot: "sr-only",
};

export function ReviewPage() {
  const s = useStrings(strings);
  const [location, setLocation] = useLocation();

  const isOpen = location === ROUTES.review;

  const [step, setStep] = useState<Step>("choose");
  const [form, setForm] = useState<ReviewFormValues>(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setStep("choose");
    setForm(EMPTY_FORM);
    setSending(false);
    setError(null);
    setLocation(ROUTES.landing);
  }

  const message = form.message.trim();
  const tooShort = message.length < LIMITS.minNote;

  function updateField(field: keyof ReviewFormValues, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError(null);
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
    if (e.status >= 500 || e.code === "INTERNAL_ERROR") {
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
      sheetDescription={s.sheetDescription}
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
        <Form
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <ReviewField
            kind="textarea"
            label={s.noteLabel}
            value={form.message}
            onChange={(value) => updateField("message", value)}
            maxLength={LIMITS.note}
            required
            hint={tooShort && message.length > 0 ? s.tooShort : undefined}
          />

          <ReviewField
            kind="input"
            label={s.nameLabel}
            value={form.name}
            onChange={(value) => updateField("name", value)}
            maxLength={LIMITS.name}
            autoComplete="name"
          />

          <ReviewField
            kind="input"
            label={s.contactLabel}
            value={form.contact}
            onChange={(value) => updateField("contact", value)}
            maxLength={LIMITS.contact}
          />

          <input
            type="text"
            name="website"
            value={form.website}
            onChange={(event) => updateField("website", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className={styles.honeypot}
          />

          {error && (
            <p role="alert" className={styles.formError}>
              {error}
            </p>
          )}

          <Button
            type="submit"
            isDisabled={tooShort || sending}
            className={styles.submit}
          >
            {sending ? s.sending : s.send}
          </Button>
        </Form>
      )}

      {step === "sent" && (
        <ThankYou message={s.thanks} closeLabel={s.close} onClose={close} />
      )}
    </ReviewDrawer>
  );
}
