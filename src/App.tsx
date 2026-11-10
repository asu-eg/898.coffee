import { LandingPage } from "@/features/landing/";
import { NotFoundPage } from "@/features/not-found/";
import { ReviewPage } from "@/features/review";
import { MenuPage } from "@/features/menu";
import { ROUTES, Route, Switch } from "@/shared/router";

export default function App() {
  return (
    <>
      <Switch>
        <Route path={ROUTES.landing} component={LandingPage} />
        <Route path={ROUTES.review} component={LandingPage} />
        <Route path={ROUTES.menu} component={MenuPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <ReviewPage />
    </>
  );
}
