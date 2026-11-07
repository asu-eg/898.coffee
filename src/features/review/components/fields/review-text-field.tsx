import { FieldError, Input, Label, TextField } from "react-aria-components";
import { fieldStyles } from "./field-styles";

interface ReviewTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  autoComplete?: string;
}

export function ReviewTextField({
  label,
  value,
  onChange,
  maxLength,
  autoComplete,
}: ReviewTextFieldProps) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      className={fieldStyles.wrapper}
    >
      <Label className={fieldStyles.label}>{label}</Label>
      <Input
        maxLength={maxLength}
        autoComplete={autoComplete}
        dir="auto"
        className={fieldStyles.control}
      />
      <FieldError className={fieldStyles.error} />
    </TextField>
  );
}
