import {
  FieldError,
  Input,
  Label,
  Text,
  TextArea,
  TextField,
} from "react-aria-components";

interface NoteFieldProps {
  kind: "input" | "textarea";
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  required?: boolean;
  autoComplete?: string;
  rows?: number;
  hint?: string;
}

const styles = {
  wrapper: "group flex flex-col gap-1.5",
  label: "text-small font-bold text-navy",
  control:
    "w-full rounded-md border border-navy/15 bg-white px-4 py-3 text-body text-navy placeholder:text-navy/40 outline-none transition-colors duration-interactive ease-smooth data-focused:border-brand data-invalid:border-error data-invalid:bg-error/5 motion-reduce:transition-none",
  textarea: "min-h-32 resize-y",
  hint: "text-caption text-navy/65",
  error: "text-caption text-error",
};

export function NoteField({
  kind,
  label,
  value,
  onChange,
  maxLength,
  required = false,
  autoComplete,
  rows = 5,
  hint,
}: NoteFieldProps) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      isRequired={required}
      className={styles.wrapper}
    >
      <Label className={styles.label}>{label}</Label>

      {kind === "textarea" ? (
        <TextArea
          maxLength={maxLength}
          rows={rows}
          dir="auto"
          className={`${styles.control} ${styles.textarea}`}
        />
      ) : (
        <Input
          maxLength={maxLength}
          autoComplete={autoComplete}
          dir="auto"
          className={styles.control}
        />
      )}

      {hint && (
        <Text slot="description" className={styles.hint}>
          {hint}
        </Text>
      )}

      <FieldError className={styles.error} />
    </TextField>
  );
}
