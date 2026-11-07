export const fieldStyles = {
  wrapper: "group flex flex-col gap-1.5",
  label: "text-small font-bold text-navy",
  control:
    "w-full rounded-xl border border-navy/15 bg-white px-4 py-3 text-body text-navy placeholder:text-navy/40 outline-none transition-colors data-focused:border-brand data-invalid:border-error data-invalid:bg-error/5",
  textarea: "min-h-32 resize-y",
  hint: "text-caption text-navy/65",
  error: "text-caption text-error",
} as const;
