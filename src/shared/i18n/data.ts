export type Locale = "en" | "ar";
export type Localized<T> = Record<Locale, T>;

export const STORAGE_KEY = "PrefLang:locale";
