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
import { v4 as uuidv4 } from "uuid";

/* Imports y cosas para el test nada mas, solo iconos y arrays --------------------------------------------------------*/
import { CgAlarm } from "react-icons/cg";
import { CgBoy } from "react-icons/cg";
import { HiChip } from "react-icons/hi";
import { FcCableRelease } from "react-icons/fc";
import { RiSubwayWifiLine } from "react-icons/ri";
import { GiWifiRouter } from "react-icons/gi";
import { GrSelection } from "react-icons/gr";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FcElectronics } from "react-icons/fc";
import { GiCircuitry } from "react-icons/gi";
import { GiCircularSaw } from "react-icons/gi";
import { SiAirplayvideo } from "react-icons/si";
// import navbarCliente from "../components/NavSidebarCliente";
import HomeCliente from "./homeCliente";
import PerfilCliente from "./PerfilCliente";
import LogIn from "./login";

import ProtectedRoute from "../components/ProtectedRoute";

var n_items = 16;
var imgs_test = [
	<SiAirplayvideo />,
	<CgAlarm />,
	<CgBoy />,
	<HiChip />,
	<FcCableRelease />,
	<RiSubwayWifiLine />,
	<GiWifiRouter />,
	<GrSelection />,
	<MdPhotoSizeSelectActual />,
	<FcElectronics />,
	<GiCircuitry />,
	<GiCircularSaw />,
];
var items_test = [
	"Arduino",
	"Chip AND",
	"Chip XOR",
	"Jumper",
	"Motor",
	"Pinzas",
	"Sensor",
	"Boton",
	"Multimetro",
	"Voltimetro",
	"Chip NOT",
	"Ventilador",
	"Resistencias",
	"Bateria",
	"Transistor",
];
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
						inventario={[...Array(n_items)].map((item) => {
							return {
								id: uuidv4(),
								img: imgs_test[Math.floor(Math.random() * imgs_test.length)],
								articulo:
									items_test[Math.floor(Math.random() * items_test.length)],
								cantidad: Math.floor(Math.random() * 120),
							};
						})}
						sugerencias={[...Array(n_items)].map((item) => {
							return {
								id: uuidv4(),
								articulo:
									items_test[Math.floor(Math.random() * items_test.length)],
								cantidad: Math.floor(Math.random() * 15),
							};
						})}
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
