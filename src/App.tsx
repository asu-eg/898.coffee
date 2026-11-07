import { LandingPage } from "@/features/landing/";
import { NotFoundPage } from "@/features/not-found/not-found-page";
import { ReviewPage } from "@/features/review";
import { ROUTES, Route, ScrollToTop, Switch } from "@/shared/router";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={ROUTES.landing} component={LandingPage} />
        <Route path={ROUTES.review} component={LandingPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <ReviewPage />
    </>
  );
}
