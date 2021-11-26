import React from "react";
import { Link } from "react-router-dom";
import "./Tipousercomp.css";
import { Redirect } from "react-router"
import { useHistory } from "react-router-dom"

const TipoUsercomp = ({ content, admin, tipousuario, nombre }) => {
	//return <Redirect to="/Politicas" />
	const history = useHistory()
	const go_client_page = () => {
		history.push("/Cliente")
	}
	const go_modder_page = () => {
		history.push("/Reservas")
	}
	return (
		<React.Fragment>
			<div className='containertpsr' style={{ backgroundColor: "white" }}>
				<div className='t1'>
					<div>Ingresar como:</div>
				</div>
				<div className='Botones'>
					<button type='button' className='bclient btntpsr' onClick={go_client_page}>
						<div>Cliente</div>
					</button>
					<button type='button' onClick={go_modder_page} className='bmod btntpsr'>
						<div>Moderador</div>
					</button>
				</div>
				<div className='Footer'></div>
			</div>
		</React.Fragment>
	);
};

export default TipoUsercomp;
