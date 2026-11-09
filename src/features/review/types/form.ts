export type ReviewFormValues = {
  message: string;
  name: string;
  contact: string;
  website: string;
};

export type ReviewField = keyof ReviewFormValues;

export type ReviewError =
  "unknown" | "invalid-input" | "timeout" | "server" | "rate-limited";
