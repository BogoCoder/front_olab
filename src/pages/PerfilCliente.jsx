import React from "react";
import NavbarCliente from "../components/NavSidebar/NavSidebarCliente";
import SeccionLateral from "../components/clientePerfil/SeccionLateral";
import InfoPersonal from "../components/clientePerfil/InfoPersonal";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchInput from "../components/searchBar/SearchInput";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

function PerfilCliente() {
	return (
		<React.Fragment>
		<NavbarCliente/>
		<Box style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					margin: '1em'
				}}>
			<SearchInput/>
		</Box>
		<Box style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					margin: '2em'
				}}>
			<Grid container spacing={4} >
				<Grid item xs={3} >
					<SeccionLateral />
				</Grid>
				<Grid item xs={7}>
					<InfoPersonal/>
				</Grid>
			</Grid>
		</Box>
		</React.Fragment>
	);
}

export default PerfilCliente;
