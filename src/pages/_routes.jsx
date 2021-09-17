import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home";
import Reservas from "./Reservas"
import Usuario from "./Usuario"
import Prestamos from "./Prestamos"
import Historial from "./Historial"
import Inventario from "./Inventario"
import Politicas from "./Politicas"
import Auxiliares from "./Auxiliarestab"

/*<NavSidebar admin={admin} />
<HeaderOlab/>*/

const Routes = ({admin}) => {
  admin = "true"
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Usuario">
          <Usuario admin={admin}/>
        </Route>
        <Route path="/Reservas">
          <Reservas admin={admin}/>
        </Route>
        <Route path="/Prestamos">
          <Prestamos admin={admin}/>
        </Route>
        <Route path="/Historial">
          <Historial admin={admin}/>
        </Route>
        <Route path="/Inventario">
          <Inventario admin={admin}/>
        </Route>
        <Route path="/Politicas">
          <Politicas/>
        </Route>
        <Route path="/Auxiliares">
          <Auxiliares/>
        </Route>
        <Route path="/TipoUsuario">
          AAAAAAAAAAAAAAAAAAAAAAAAAAqui Va la componente Tipouser
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
