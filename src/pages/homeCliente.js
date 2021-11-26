import React from "react";
import DisponibilityBar from "../components/DisponibilityBar";
import NavbarCliente from "../components/NavSidebar/NavSidebarCliente";
import ProductosCliente from "../components/ProductosCliente";
import SearchInput from "../components/searchBar/SearchInput";
import Box from "@mui/material/Box";

function HomeCliente() {
	return (
		<React.Fragment>
			<NavbarCliente />
			<Box
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: "1em",
				}}
			>
				<SearchInput />
			</Box>
			<Box
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					margin: "2em 10em 0 10em",
				}}
			>
				<ProductosCliente />
			</Box>
		</React.Fragment>
	);
}

export default HomeCliente;
