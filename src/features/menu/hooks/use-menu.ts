import { useEffect, useRef, useState } from "react";
import { fetchMenu, getMenuError } from "../api/menu";
import { MenuParser } from "../api/menu-parser";
import type { MenuError } from "../types/menu-response";
import type { Menu } from "../types/menu-models";
import { buildMenuCategories } from "./use-menu-categories";
import { buildMenuMisc } from "./use-menu-misc";
import { buildMenuProducts } from "./use-menu-products";

export type { CategoriesStatus } from "./use-menu-categories";
export type { ProductStatus } from "./use-menu-products";

let cache: Menu | null = null;
let pending: Promise<Menu> | null = null;

export type MenuStatus =
  | { status: "loading" }
  | { status: "ready"; data: Menu }
  | { status: "error"; error: MenuError };

export function useMenu() {
  const [state, setState] = useState<MenuStatus>(() =>
    cache ? { status: "ready", data: cache } : { status: "loading" }
  );
  const cancelled = useRef(false);

  useEffect(() => {
    if (cache) return;

    if (!pending) {
      pending = fetchMenu().then(
        (raw) => {
          const data = MenuParser.parse(raw);
          cache = data;
          pending = null;
          return data;
        },
        (err: unknown) => {
          pending = null;
          throw err;
        }
      );
    }

    cancelled.current = false;

    pending
      .then((data) => {
        if (!cancelled.current) setState({ status: "ready", data });
      })
      .catch((cause: unknown) => {
        if (!cancelled.current)
          setState({ status: "error", error: getMenuError(cause) });
      });

    return () => {
      cancelled.current = true;
    };
  }, []);

  return {
    status: state.status,
    categories: buildMenuCategories(state),
    products: buildMenuProducts(state),
    misc: buildMenuMisc(state),
  };
}
