import React from "react";
import { Link } from "react-router-dom";
import "./Tipousercomp.css";

const TipoUsercomp = ({ content, admin, tipousuario, nombre }) => {
	return (
		<React.Fragment>
			<div className='containertpsr' style={{ backgroundColor: "white" }}>
				<div className='t1'>
					<div>Ingresar como:</div>
				</div>
				<div className='Botones'>
					<button type='button' className='bclient btntpsr'>
						<div>Cliente</div>
					</button>
					<button type='button' className='bmod btntpsr'>
						<div>Moderador</div>
					</button>
				</div>
				<div className='Footer'></div>
			</div>
		</React.Fragment>
	);
};

export default TipoUsercomp;
