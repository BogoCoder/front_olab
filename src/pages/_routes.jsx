import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home";
import ReservasModeradorPage from "./reservasModerador";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/reservasModerador">
          <ReservasModeradorPage />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
