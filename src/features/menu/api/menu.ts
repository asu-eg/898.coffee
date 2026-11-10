import { ApiError, getJson } from "@/shared/api";
import { MENU_ENDPOINT } from "../config";
import type { RawMenuResponse, MenuError } from "../types/menu-response";

export async function fetchMenu(): Promise<RawMenuResponse> {
  return getJson<RawMenuResponse>(MENU_ENDPOINT);
}

export function getMenuError(cause: unknown): MenuError {
  if (!(cause instanceof ApiError)) return "unknown";
  if (cause.code === "TIMEOUT") return "timeout";
  if (cause.code === "NETWORK_ERROR") return "network";
  if (cause.status >= 500 || cause.code === "INTERNAL_ERROR") return "server";
  return "unknown";
}
