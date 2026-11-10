import type { MenuStatus } from "./use-menu";
import type { Product } from "../types/menu-models";

export type ProductStatus =
  | { status: "loading" }
  | { status: "ready"; data: Product }
  | { status: "not-found" }
  | { status: "error" };

export function buildMenuProducts(menu: MenuStatus) {
  const byId = (id: string): ProductStatus => {
    if (menu.status === "loading") return { status: "loading" };
    if (menu.status === "error") return { status: "error" };

    const product = menu.data.productMap[id];
    if (!product) return { status: "not-found" };

    return { status: "ready", data: product };
  };

  return { byId };
}