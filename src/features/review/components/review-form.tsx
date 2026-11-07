import {
  Button,
  Form,
  Input,
  Label,
  Text,
  TextArea,
  TextField,
  FieldError,
} from "react-aria-components";

export interface ReviewFormValues {
  message: string;
  name: string;
  contact: string;
  website: string;
}

interface ReviewFormProps {
  values: ReviewFormValues;
  onChange: (field: keyof ReviewFormValues, value: string) => void;
  onSubmit: () => void;
  limits: { note: number; name: number; contact: number };
  labels: {
    note: string;
    name: string;
    contact: string;
    submit: string;
  };
  noteHint?: string;
  canSubmit: boolean;
  error: string | null;
}

const styles = {
  form: "flex flex-col gap-5 pb-2 animate-reveal-in",
  field: "group flex flex-col gap-1.5",
  label: "text-small font-bold text-navy",
  control:
    "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-body text-navy placeholder:text-navy/40 outline-none transition-colors data-focused:border-brand data-invalid:border-error data-invalid:bg-error/5",
  textarea: "min-h-32 resize-y",
  hint: "text-caption text-navy/65",
  fieldError: "text-caption text-error",
  formError:
    "text-small rounded-xl border border-error/30 bg-error/10 px-4 py-3 font-bold text-error",
  submit:
    "text-small mt-2 min-h-12 rounded-full bg-brand px-6 text-center font-bold text-white outline-none transition-all data-focus-visible:ring-2 data-focus-visible:ring-brand data-focus-visible:ring-offset-2 data-hovered:bg-brand/90 data-pressed:scale-[0.98] data-disabled:opacity-50",
  honeypot: "sr-only",
};

export function ReviewForm({
  values,
  onChange,
  onSubmit,
  limits,
  labels,
  noteHint,
  canSubmit,
  error,
}: ReviewFormProps) {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={styles.form}
    >
      <TextField
        value={values.message}
        onChange={(v) => onChange("message", v)}
        isRequired
        className={styles.field}
      >
        <Label className={styles.label}>{labels.note}</Label>
        <TextArea
          maxLength={limits.note}
          rows={5}
          dir="auto"
          className={`${styles.control} ${styles.textarea}`}
        />
        {noteHint && (
          <Text slot="description" className={styles.hint}>
            {noteHint}
          </Text>
        )}
        <FieldError className={styles.fieldError} />
      </TextField>

      <TextField
        value={values.name}
        onChange={(v) => onChange("name", v)}
        className={styles.field}
      >
        <Label className={styles.label}>{labels.name}</Label>
        <Input
          maxLength={limits.name}
          autoComplete="name"
          dir="auto"
          className={styles.control}
        />
        <FieldError className={styles.fieldError} />
      </TextField>

      <TextField
        value={values.contact}
        onChange={(v) => onChange("contact", v)}
        className={styles.field}
      >
        <Label className={styles.label}>{labels.contact}</Label>
        <Input
          maxLength={limits.contact}
          dir="auto"
          className={styles.control}
        />
        <FieldError className={styles.fieldError} />
      </TextField>

      <input
        type="text"
        name="website"
        value={values.website}
        onChange={(e) => onChange("website", e.target.value)}
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

      <Button type="submit" isDisabled={!canSubmit} className={styles.submit}>
        {labels.submit}
      </Button>
    </Form>
  );
}
