import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home";
import NavSidebar from "../components/NavSidebar/NavSidebar";
import HeaderOlab from "../components/HeaderOlab/Header_Olab";

const Routes = () => {
  return (
    <BrowserRouter>
    <NavSidebar/>
    <HeaderOlab/>
      <Switch>
        <Route path="/Usuario">
          AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Usuario
        </Route>
        <Route path="/Reservas">
          AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Reservas
        </Route>
        <Route path="/Prestamos">
          AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Prestamos
        </Route>
        <Route path="/Historial">
          AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Historial
        </Route>
        <Route path="/Inventario">
          AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Inventario
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
