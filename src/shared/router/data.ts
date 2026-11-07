export const ROUTES = {
  landing: "/",
  menu: "/menu",
  review: "/review",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
