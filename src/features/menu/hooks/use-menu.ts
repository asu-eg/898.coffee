import { useMenuData } from "./use-menu-data";
import { useMenuCategories } from "./use-menu-categories";
import { useMenuProducts } from "./use-menu-products";
import { useMenuMisc } from "./use-menu-misc";

export type { MenuStatus } from "./use-menu-data";
export type { CategoriesStatus } from "./use-menu-categories";
export type { ProductStatus } from "./use-menu-products";

export function useMenu() {
  const data = useMenuData();
  const categories = useMenuCategories();
  const products = useMenuProducts();
  const misc = useMenuMisc();

  return {
    status: data.status,
    categories,
    products,
    misc,
  };
}
