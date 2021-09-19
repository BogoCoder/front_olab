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
import TipoUsuario from "./Tipo_usuario"
import {v4 as uuidv4} from "uuid"
/*<NavSidebar admin={admin} />
<HeaderOlab/>*/
var items_test = [
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"},
  {id:uuidv4(),img:"img",articulo:"Arduino",cantidad:"xxx"}
]
var user = {tipo:"Auxiliar",nombre:"David Martinez"}

const Routes = ({admin}) => {
  admin = "false"
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
          <Inventario admin={"true"} user={user} inventario={items_test} sugerencias={items_test}/>
        </Route>
        <Route path="/Politicas">
          <Politicas/>
        </Route>
        <Route path="/Auxiliares">
          <Auxiliares/>
        </Route>
        <Route path="/TipoUsuario">
          <TipoUsuario/>
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
