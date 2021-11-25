import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home";
import Reservas from "./Reservas";
import Prestamos from "./Prestamos";
import Historial from "./Historial";
import Inventario from "./Inventario";
import Politicas from "./Politicas";
import Auxiliares from "./Auxiliarestab";
import TipoUsuario from "./Tipo_usuario";
import HomeCliente from "./homeCliente";
import PerfilCliente from "./PerfilCliente";
import LogIn from "./login";

import ProtectedRoute from "../components/ProtectedRoute";


let user = { tipo: "Auxiliar", nombre: "David Martinez" };
/* Imports para el test nada mas, solo iconos -------------------------------------------------------------------------*/

const Routes = ({ admin }) => {
	admin = "true";
	let isAuthenticated = localStorage.getItem("isAuthenticated");
	return (
		<BrowserRouter>
			<Switch>
				<ProtectedRoute 
				path='/Cliente' 
				component={HomeCliente} 
				isAuthenticated={isAuthenticated}
				/>
				<ProtectedRoute 
				path='/ClientePerfil' 
				component={PerfilCliente} 
				isAuthenticated={isAuthenticated}
				/>

				<ProtectedRoute path='/Reservas' isAuthenticated={isAuthenticated}
					component={Reservas} admin={admin} user={user}
				/>
				<ProtectedRoute path='/Prestamos' isAuthenticated={isAuthenticated}
					component={Prestamos} admin={admin} user={user}
				/>
				<ProtectedRoute path='/Historial' isAuthenticated={isAuthenticated}
					component={Historial} admin={admin}
				/>
				<ProtectedRoute path='/Inventario' isAuthenticated={isAuthenticated}
					component={Inventario}
						admin={"true"}
						user={user}
				/>
				<ProtectedRoute path='/Politicas' isAuthenticated={isAuthenticated}
					component={Politicas} user={user} admin={"true"}
				/>
				<ProtectedRoute path='/Auxiliares' isAuthenticated={isAuthenticated}
					component={Auxiliares} admin={admin} user={user}
				/>
				<ProtectedRoute path='/selecusuario' isAuthenticated={isAuthenticated}
					component={TipoUsuario}
				/>
				<ProtectedRoute 
				path='/homeAux' 
				isAuthenticated={isAuthenticated}
				component={HomePage}
				/>
				<Route exact path='/'>
					<LogIn />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
