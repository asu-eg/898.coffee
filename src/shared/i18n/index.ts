import { useSyncExternalStore } from "react";
import { engine } from "./engine";
import type { Locale, Localized } from "./data";

export type { Locale, Localized };

export const setLocale = engine.setLocale;
export const getLocale = engine.getLocale;

if (typeof window !== "undefined") {
  engine.init();
}

export function useLocale(): Locale {
  return useSyncExternalStore(engine.subscribe, engine.getLocale);
}

export function useStrings<T>(table: Localized<T>): T {
  return table[useLocale()];
}
