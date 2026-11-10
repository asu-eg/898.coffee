import type { FormEvent } from "react";
import { Button } from "react-aria-components";
import { useStrings } from "@/shared/i18n";
import { useReviewNote, NOTE_LIMITS } from "../../hooks/use-review-note";
import { NoteField } from "./note-field";
import { strings } from "../../strings";

interface NoteFormProps {
  onSuccess: () => void;
}

const styles = {
  form: "flex flex-col gap-5 pb-2 animate-reveal-in",
  error:
    "text-small rounded-md border border-error/30 bg-error/10 px-4 py-3 font-bold text-error",
  submit:
    "text-small mt-2 min-h-12 rounded-full bg-brand px-6 text-center font-bold text-white outline-none transition duration-interactive ease-smooth data-focus-visible:ring-2 data-focus-visible:ring-brand data-focus-visible:ring-offset-2 data-hovered:bg-brand/90 data-pressed:scale-[0.98] data-disabled:opacity-50 data-disabled:transition-none motion-reduce:transition-none",
  honeypot: "sr-only",
};

export function NoteForm({ onSuccess }: NoteFormProps) {
  const s = useStrings(strings);
  const note = useReviewNote();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (await note.submit()) onSuccess();
  }

  return (
    <form noValidate className={styles.form} onSubmit={handleSubmit}>
      <NoteField
        kind="textarea"
        label={s.form.fields.message.label}
        value={note.values.message}
        onChange={(value) => note.changeField("message", value)}
        maxLength={NOTE_LIMITS.message}
        required
        hint={note.showTooShort ? s.form.fields.message.tooShort : undefined}
      />

      <NoteField
        kind="input"
        label={s.form.fields.name.label}
        value={note.values.name}
        onChange={(value) => note.changeField("name", value)}
        maxLength={NOTE_LIMITS.name}
        autoComplete="name"
      />

      <NoteField
        kind="input"
        label={s.form.fields.contact.label}
        value={note.values.contact}
        onChange={(value) => note.changeField("contact", value)}
        maxLength={NOTE_LIMITS.contact}
      />

      <input
        type="text"
        name="website"
        value={note.values.website}
        onChange={(event) => note.changeField("website", event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
      />

      {note.error && (
        <p role="alert" className={styles.error}>
          {s.form.errors[note.error]}
        </p>
      )}

      <Button
        type="submit"
        isDisabled={!note.isValid || note.sending}
        className={styles.submit}
      >
        {note.sending ? s.form.actions.sending : s.form.actions.send}
      </Button>
    </form>
  );
}
