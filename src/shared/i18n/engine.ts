import { type Locale, STORAGE_KEY } from "./data";

let current: Locale = "en";
const listeners = new Set<() => void>();

function applyToDOM(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

export const engine = {
  getLocale: () => current,

  setLocale: (locale: Locale) => {
    if (current === locale && document.documentElement.lang === locale) return;

    current = locale;
    applyToDOM(locale);

    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {}

    listeners.forEach((listener) => listener());
  },

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  init: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      current =
        saved === "en" || saved === "ar"
          ? saved
          : navigator.language.startsWith("ar")
            ? "ar"
            : "en";
    } catch {
      current = "en";
    }

    applyToDOM(current);
  },
};
