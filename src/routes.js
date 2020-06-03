import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import WeatherContainer from "./features/weather/WeatherContainer";

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/:city" component={WeatherContainer} />
      <Route exact path="/" component={WeatherContainer} />
    </Switch>
  </main>
);

export default Routes;
