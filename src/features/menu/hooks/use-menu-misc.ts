import { useMenuData } from "./use-menu-data";
import type { Pairing, Popup, Product } from "../models";

export function useMenuMisc() {
  const menu = useMenuData();

  const signatures = (): Product[] =>
    menu.status === "ready" ? menu.data.signatures : [];

  const pairings = (): Pairing[] =>
    menu.status === "ready" ? menu.data.pairings : [];

  const pairing = (id: string): Pairing | undefined => {
    if (menu.status !== "ready") return undefined;
    return menu.data.pairings.find((p) => p.id === id);
  };

  const popup = (): Popup | undefined =>
    menu.status === "ready" ? menu.data.popup : undefined;

  const currency = (): string =>
    menu.status === "ready" ? menu.data.currency : "";

  return { signatures, pairings, pairing, popup, currency };
}
