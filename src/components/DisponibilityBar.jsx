import React from "react";
import "./DisponibilityBar.css";

export default function DisponibilityBar({ disponibility }) {
	return (
		<React.Fragment>
			<div className='container'>
				<div className={disponibility}></div>
			</div>
		</React.Fragment>
	);
}
