import { useMenuData } from "./use-menu-data";
import type { Product } from "../models";

export type ProductStatus =
  | { status: "loading" }
  | { status: "ready"; data: Product }
  | { status: "not-found" }
  | { status: "error"; error: unknown };

export function useMenuProducts() {
  const menu = useMenuData();

  const byId = (id: string): ProductStatus => {
    if (menu.status === "loading") return { status: "loading" };
    if (menu.status === "error") return { status: "error", error: menu.error };

    const product = menu.data.productMap[id];
    if (!product) return { status: "not-found" };

    return { status: "ready", data: product };
  };

  return { byId };
}
