import { useEffect, useState } from "react";
import { fetchMenu, getMenuError, type MenuError } from "../api/menu";
import { MenuParser } from "../api/menu-parser";
import type { Menu } from "../types/menu-models";

export type MenuStatus =
  | { status: "loading" }
  | { status: "ready"; data: Menu }
  | { status: "error"; error: MenuError };

export type MenuResult = MenuStatus & { retry: () => void };

let pendingMenuRequest: Promise<Menu> | null = null;

function loadMenu(): Promise<Menu> {
  if (!pendingMenuRequest) {
    pendingMenuRequest = fetchMenu()
      .then((response) => MenuParser.parse(response))
      .finally(() => {
        pendingMenuRequest = null;
      });
  }

  return pendingMenuRequest;
}

export function useMenu(): MenuResult {
  const [state, setState] = useState<MenuStatus>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let isActive = true;

    loadMenu()
      .then((data) => {
        if (isActive) setState({ status: "ready", data });
      })
      .catch((cause: unknown) => {
        if (isActive) {
          setState({ status: "error", error: getMenuError(cause) });
        }
      });

    return () => {
      isActive = false;
    };
  }, [attempt]);

  function retry() {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  }

  return { ...state, retry };
}
