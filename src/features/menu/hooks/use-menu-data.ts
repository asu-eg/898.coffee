import { useEffect, useState } from "react";
import { getJson } from "@/shared/api";
import { MENU_ENDPOINT } from "../config";
import { MenuParser } from "../parser";
import type { Menu } from "../models";

let cache: Menu | null = null;
let pending: Promise<Menu> | null = null;

export type MenuStatus =
  | { status: "loading" }
  | { status: "ready"; data: Menu }
  | { status: "error"; error: unknown };

export function useMenuData(): MenuStatus {
  const [state, setState] = useState<MenuStatus>(() =>
    cache ? { status: "ready", data: cache } : { status: "loading" }
  );

  useEffect(() => {
    if (cache) return;

    if (!pending) {
      pending = getJson(MENU_ENDPOINT).then(
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

    let cancelled = false;

    pending
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch((error: unknown) => {
        if (!cancelled) setState({ status: "error", error });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
