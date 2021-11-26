import React, { useState } from "react";
import DisponibilityBar from "../components/DisponibilityBar";
import NavbarCliente from "../components/NavSidebar/NavSidebarCliente";
import ProductosCliente from "../components/ProductosCliente";
import SearchInput from "../components/searchBar/SearchInput";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Alert from "react-bootstrap/Alert";
import Typography from "@mui/material/Typography";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import BolsaPrestamos from "../components/clientePerfil/BolsaPrestamos";
import { rutaApi } from "../components/rutas";

function HomeCliente() {
	const token = localStorage.getItem("token");

	const [carrito, setCarrito] = useState([]);
	const [vaciar, setVaciar] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [er, setER] = useState(2);

	const onSubmit = (e) => {
		let error = false;
		let reserva = carrito.map((elmt) => Object.values(elmt));
		reserva = reserva.map((elmt) => [elmt[0], elmt[1].toString()]);
		fetch(`${rutaApi}/prestamos/crearReserva`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"token-acceso": token,
			},
			body: JSON.stringify({
				elementos: reserva,
			}),
		})
			.then((res) => {
				if (res.ok) {
					error = false;
					console.log("Se creó la reserva");
					setFeedback("¡Se creó su reserva!");
					setCarrito([]);
					setER(1);
				} else {
					console.log("Algún error con la reserva");
					error = true;
					setER(0);
					return res.json();
				}
			})
			.then((res) => {
				if (error) {
					setER(0);
					setFeedback(res);
				}
			})
			.catch((err) => console.log(err));
	};

	const onDelete = () => {
		setCarrito([]);
		setVaciar(true);
	};

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
				<ProductosCliente
					carrito={carrito}
					setCarrito={setCarrito}
					vaciar={vaciar}
					setVaciar={setVaciar}
				/>
				<div
					style={{
						backgroundColor: "#EDEDED",
						width: "50%",
						height: "50%",
						padding: "20px",
						marginLeft: "3em",
					}}
				>
					<Typography
						variant='h4'
						component='div'
						style={{ textAlign: "center" }}
					>
						Mi préstamo
					</Typography>
					<Box
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							margin: "1em",
						}}
					>
						<BolsaPrestamos carrito={carrito} setCarrito={setCarrito} />
					</Box>
					<Grid>
						<Typography sx={{ mt: 4, mb: 2 }} variant='h6' component='div'>
							A tener en cuenta:
						</Typography>
						<List>
							<ListItem>
								<ListItemIcon>
									<AccessTimeFilledIcon />
								</ListItemIcon>
								<ListItemText primary='Tiene 3 días para reclamar su reserva' />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<AccessTimeFilledIcon />
								</ListItemIcon>
								<ListItemText primary='A partir del momento de la reserva, tiene 15 días para devolver los artículos prestados.' />
							</ListItem>
							<Box
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									margin: "1em",
								}}
							>
								<button className='btn btn-primary' onClick={() => onSubmit()}>
									Reservar
								</button>
								<button
									className='btn btn-danger'
									onClick={() => onDelete()}
									style={{ marginLeft: "1em" }}
								>
									Vaciar carrito
								</button>
							</Box>
							<Grid item style={{ textAlign: "center" }}>
								{er === 0 ? (
									<Alert variant='danger'>
										<strong>¡Error!</strong> {feedback}.
									</Alert>
								) : er === 1 ? (
									<Alert variant='success'>
										<strong>{feedback}</strong>
									</Alert>
								) : (
									""
								)}
							</Grid>
						</List>
					</Grid>
				</div>
			</Box>
		</React.Fragment>
	);
}

export default HomeCliente;
