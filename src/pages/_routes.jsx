import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
