import { Form, Button } from "react-aria-components";
import { useStrings } from "@/shared/i18n";
import { useSheet } from "./hooks/use-sheet";
import { useForm } from "./hooks/use-form";
import * as C from "./components/";
import { LIMITS } from "./config";
import { strings } from "./strings";

const styles = {
  choices: "flex flex-col gap-3 pb-4 animate-reveal-in",
  form: "flex flex-col gap-5 pb-2 animate-reveal-in",
  formError:
    "text-small rounded-md border border-error/30 bg-error/10 px-4 py-3 font-bold text-error",
  submit:
    "text-small mt-2 min-h-12 rounded-full bg-brand px-6 text-center font-bold text-white outline-none transition duration-interactive ease-smooth data-focus-visible:ring-2 data-focus-visible:ring-brand data-focus-visible:ring-offset-2 data-hovered:bg-brand/90 data-pressed:scale-[0.98] data-disabled:opacity-50 data-disabled:transition-none motion-reduce:transition-none",
  honeypot: "sr-only",
};

export function ReviewPage() {
  const s = useStrings(strings);

  const { isOpen, close } = useSheet();
  const sheet = useForm(close);

  return (
    <C.Sheet
      isOpen={isOpen}
      onClose={sheet.close}
      title={sheet.step === "note" ? s.noteTitle : s.sheetTitle}
      sheetDescription={s.sheetDescription}
      closeLabel={s.close}
    >
      {sheet.step === "choose" && (
        <div className={styles.choices}>
          <C.ChoiceCard
            icon="star"
            title={s.googleTitle}
            hint={s.googleHint}
            onPress={sheet.openGoogleReview}
          />
          <C.ChoiceCard
            icon="chat"
            title={s.noteTitle}
            hint={s.noteHint}
            onPress={sheet.goToNote}
          />
        </div>
      )}

      {sheet.step === "note" && (
        <Form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            void sheet.submit();
          }}
        >
          <C.Field
            kind="textarea"
            label={s.noteLabel}
            value={sheet.form.message}
            onChange={(v) => sheet.updateField("message", v)}
            maxLength={LIMITS.note}
            required
            hint={
              sheet.tooShort && sheet.form.message.trim().length > 0
                ? s.tooShort
                : undefined
            }
          />

          <C.Field
            kind="input"
            label={s.nameLabel}
            value={sheet.form.name}
            onChange={(v) => sheet.updateField("name", v)}
            maxLength={LIMITS.name}
            autoComplete="name"
          />

          <C.Field
            kind="input"
            label={s.contactLabel}
            value={sheet.form.contact}
            onChange={(v) => sheet.updateField("contact", v)}
            maxLength={LIMITS.contact}
          />

          <input
            type="text"
            name="website"
            value={sheet.form.website}
            onChange={(e) => sheet.updateField("website", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className={styles.honeypot}
          />

          {sheet.error && (
            <p role="alert" className={styles.formError}>
              {sheet.error}
            </p>
          )}

          <Button
            type="submit"
            isDisabled={sheet.tooShort || sheet.sending}
            className={styles.submit}
          >
            {sheet.sending ? s.sending : s.send}
          </Button>
        </Form>
      )}

      {sheet.step === "sent" && (
        <C.ThankYou
          message={s.thanks}
          closeLabel={s.close}
          onClose={sheet.close}
        />
      )}
    </C.Sheet>
  );
}
