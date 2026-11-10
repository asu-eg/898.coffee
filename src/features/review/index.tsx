import { Button } from "react-aria-components";
import { useStrings } from "@/shared/i18n";
import { LIMITS } from "./config";
import * as C from "./components";
import { useReview } from "./hooks/use-review";
import { strings } from "./strings";

const styles = {
  choices: "flex flex-col gap-3 pb-4 animate-reveal-in",
  form: "flex flex-col gap-5 pb-2 animate-reveal-in",
  error:
    "text-small rounded-md border border-error/30 bg-error/10 px-4 py-3 font-bold text-error",
  submit:
    "text-small mt-2 min-h-12 rounded-full bg-brand px-6 text-center font-bold text-white outline-none transition duration-interactive ease-smooth data-focus-visible:ring-2 data-focus-visible:ring-brand data-focus-visible:ring-offset-2 data-hovered:bg-brand/90 data-pressed:scale-[0.98] data-disabled:opacity-50 data-disabled:transition-none motion-reduce:transition-none",
  honeypot: "sr-only",
} as const;

export function ReviewPage() {
  const s = useStrings(strings);
  const review = useReview();

  return (
    <C.Drawer
      isOpen={review.isOpen}
      onClose={review.close}
      title={review.step === "note" ? s.choices.note.title : s.drawer.title}
      description={s.drawer.description}
      closeLabel={s.common.close}
    >
      {review.step === "choose" && (
        <section className={styles.choices}>
          <C.ChoiceCard
            icon="star"
            title={s.choices.google.title}
            hint={s.choices.google.hint}
            onPress={review.openGoogleReview}
          />
          
          <C.ChoiceCard
            icon="chat"
            title={s.choices.note.title}
            hint={s.choices.note.hint}
            onPress={review.goToNote}
          />
        </section>
      )}

      {review.step === "note" && (
        <form
          noValidate
          className={styles.form}
          onSubmit={(event) => {
            event.preventDefault();
            void review.submit();
          }}
        >
          <C.Field
            kind="textarea"
            label={s.form.fields.message.label}
            value={review.form.values.message}
            onChange={(value) => review.changeField("message", value)}
            maxLength={LIMITS.note}
            required
            hint={
              review.form.showTooShort
                ? s.form.fields.message.tooShort
                : undefined
            }
          />

          <C.Field
            kind="input"
            label={s.form.fields.name.label}
            value={review.form.values.name}
            onChange={(value) => review.changeField("name", value)}
            maxLength={LIMITS.name}
            autoComplete="name"
          />

          <C.Field
            kind="input"
            label={s.form.fields.contact.label}
            value={review.form.values.contact}
            onChange={(value) => review.changeField("contact", value)}
            maxLength={LIMITS.contact}
          />

          <input
            type="text"
            name="website"
            value={review.form.values.website}
            onChange={(event) =>
              review.changeField("website", event.target.value)
            }
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className={styles.honeypot}
          />

          {review.error && (
            <p role="alert" className={styles.error}>
              {s.form.errors[review.error]}
            </p>
          )}

          <Button
            type="submit"
            isDisabled={!review.form.isValid || review.sending}
            className={styles.submit}
          >
            {review.sending ? s.form.actions.sending : s.form.actions.send}
          </Button>
        </form>
      )}

      {review.step === "sent" && (
        <C.ThankYou
          title={s.success.message}
          closeLabel={s.common.close}
          onClose={review.close}
        />
      )}
    </C.Drawer>
  );
}
