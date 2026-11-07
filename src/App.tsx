import { LandingPage } from "@/features/landing/";
import { ROUTES, Route, ScrollToTop, Switch } from "@/shared/router";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={ROUTES.landing} component={LandingPage} />
      </Switch>
    </>
  );
}
