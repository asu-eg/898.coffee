import type { MenuStatus } from "./use-menu";
import type { Category } from "../types/menu-models";

export type CategoriesStatus =
  | { status: "loading" }
  | { status: "ready"; data: Category[] }
  | { status: "error" };

export function buildMenuCategories(menu: MenuStatus) {
  const all = (): CategoriesStatus => {
    if (menu.status !== "ready") return { status: menu.status };
    return { status: "ready", data: menu.data.categories };
  };

  const byId = (id: string): Category | undefined => {
    if (menu.status !== "ready") return undefined;
    return menu.data.categories.find((c) => c.id === id);
  };

  return { all, byId };
}
