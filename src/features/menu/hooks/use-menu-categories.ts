import { useMenuData } from "./use-menu-data";
import type { Category } from "../models";

export type CategoriesStatus =
  | { status: "loading" }
  | { status: "ready"; data: Category[] }
  | { status: "error"; error: unknown };

export function useMenuCategories() {
  const menu = useMenuData();

  const all = (): CategoriesStatus => {
    if (menu.status !== "ready") return menu;
    return { status: "ready", data: menu.data.categories };
  };

  const byId = (id: string): Category | undefined => {
    if (menu.status !== "ready") return undefined;
    return menu.data.categories.find((c) => c.id === id);
  };

  return { all, byId };
}
