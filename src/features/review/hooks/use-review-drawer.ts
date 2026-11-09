import { ROUTES, useLocation } from "@/shared/router";

export function useReviewDrawer() {
  const [location, setLocation] = useLocation();

  return {
    isOpen: location === ROUTES.review,
    close: () => setLocation(ROUTES.landing),
  };
}
