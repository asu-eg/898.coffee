import type { MenuStatus } from "./use-menu";
import type { Pairing, Popup, Product } from "../types/menu-models";

export function buildMenuMisc(menu: MenuStatus) {
  const currency = (): string =>
    menu.status === "ready" ? menu.data.currency : "";

  const signatures = (): Product[] =>
    menu.status === "ready" ? menu.data.signatures : [];

  const pairings = (): Pairing[] =>
    menu.status === "ready" ? menu.data.pairings : [];

  const pairingById = (id: string): Pairing | undefined => {
    if (menu.status !== "ready") return undefined;
    return menu.data.pairings.find((p) => p.id === id);
  };

  const popup = (): Popup | undefined =>
    menu.status === "ready" ? menu.data.popup : undefined;

  return { currency, signatures, pairings, pairingById, popup };
}
