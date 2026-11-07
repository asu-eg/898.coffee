import {
  FieldError,
  Label,
  Text,
  TextArea,
  TextField,
} from "react-aria-components";
import { fieldStyles } from "./field-styles";

interface ReviewMessageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  hint?: string;
}

export function ReviewMessageField({
  label,
  value,
  onChange,
  maxLength,
  hint,
}: ReviewMessageFieldProps) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      isRequired
      className={fieldStyles.wrapper}
    >
      <Label className={fieldStyles.label}>{label}</Label>
      <TextArea
        maxLength={maxLength}
        rows={5}
        dir="auto"
        className={`${fieldStyles.control} ${fieldStyles.textarea}`}
      />
      {hint && (
        <Text slot="description" className={fieldStyles.hint}>
          {hint}
        </Text>
      )}
      <FieldError className={fieldStyles.error} />
    </TextField>
  );
}
