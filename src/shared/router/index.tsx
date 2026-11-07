/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import type { ReactNode } from "react";
import {
  Link as WouterLink,
  Route as WouterRoute,
  Switch,
  useLocation,
  useRoute,
} from "wouter";
import { ROUTES, type AppRoute } from "./data";

export { ROUTES };
export type { AppRoute };

interface LinkProps {
  href: AppRoute;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Link({ href, children, className, onClick }: LinkProps) {
  return (
    <WouterLink href={href} className={className} onClick={onClick}>
      {children}
    </WouterLink>
  );
}

export function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export { WouterRoute as Route, Switch, useLocation, useRoute };
