import { useLocation, ROUTES } from "@/shared/router";

export function useSheet() {
  const [location, setLocation] = useLocation();

  return {
    isOpen: location === ROUTES.review,
    close: () => setLocation(ROUTES.landing),
  };
}
