import React from "react";
import DisponibilityBar from "../components/DisponibilityBar";
import NavbarCliente from "../components/NavSidebar/NavSidebarCliente";
import ProductosCliente from "../components/ProductosCliente";

function HomeCliente() {
	return (
		<React.Fragment>
			<NavbarCliente />
			<ProductosCliente />
		</React.Fragment>
	);
}

export default HomeCliente;
