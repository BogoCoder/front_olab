import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import logo from "../assets/olab_logo.svg";
import * as MdIcons from "react-icons/md";
import DisponibilityBar from "./DisponibilityBar";
import Grid from "@material-ui/core/Grid";
import { rutaApi } from "./rutas";

const columns = [
	{ id: "foto", label: "", width: 20 },
	{ id: "nombre", label: "Nombre", width: 30 },
	{ id: "categoria", label: "Categoría", width: 30 },
	{
		id: "codigo",
		label: "Código",
		width: 30,
		format: (value) => value.toLocaleString("en-US"),
	},
	{
		id: "disponibilidad",
		label: "Disponibilidad",
		width: 30,
		format: (value) => value.toFixed(2),
	},
	{ id: "boton", label: "", width: 30 },
];

function createData(foto, nombre, categoria, codigo, disponibilidad, boton) {
	return { foto, nombre, categoria, codigo, disponibilidad, boton };
}

const rows = [
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Arduino",
		"123",
		"22-71354",
		<DisponibilityBar disponibility='medium-disponibility' />,
		<button className='btn btn-primary'>Agregar</button>
	),
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Arduino-nano",
		"122",
		"22-33354",
		<DisponibilityBar disponibility='disponibility' />,
		<button className='btn btn-primary disabled'>Agregar</button>
	),
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Resistencia 1000 ohms",
		"223",
		"21-71354",
		<DisponibilityBar disponibility='high-disponibility' />,
		<button className='btn btn-primary'>Agregar</button>
	),
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Raspberry",
		"124",
		"24-71354",
		<DisponibilityBar disponibility='high-disponibility' />,
		<button className='btn btn-primary'>Agregar</button>
	),
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Jumpers",
		"323",
		"20-71354",
		<DisponibilityBar disponibility='low-disponibility' />,
		<button className='btn btn-primary'>Agregar</button>
	),
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Artículo##",
		"###",
		"xx-xxxxx",
		<DisponibilityBar disponibility='low-disponibility' />,
		<button className='btn btn-primary'>Agregar</button>
	),
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Artículo##",
		"###",
		"xx-xxxxx",
		<DisponibilityBar disponibility='medium-disponibility' />,
		<button className='btn btn-primary'>Agregar</button>
	),
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Artículo##",
		"###",
		"xx-xxxxx",
		<DisponibilityBar disponibility='high-disponibility' />,
		<button className='btn btn-primary'>Agregar</button>
	),
	createData(
		<MdIcons.MdInsertPhoto size={30} />,
		"Artículo##",
		"###",
		"xx-xxxxx",
		<DisponibilityBar disponibility='high-disponibility' />,
		<button className='btn btn-primary'>Agregar</button>
	),
];

function Row(props) {
	const { row } = props;
	const [open, setOpen] = useState(false);
	const token = localStorage.getItem("token");
	const [click, setClick] = useState(0);
	let consultaVacia = false;

	useEffect(() => {
		setClick(0);
	}, [props.vaciar]);

	const onButtonClick = (cantidad) => {
		if (props.vaciar) {
			props.setVaciar(false);
		}

		if (props.carrito.some((item) => item.nombre === row.nombre)) {
			// si ya hay un elemento de estos en el carrito
			let nombre = (element) => element.nombre === row.nombre;
			let index = props.carrito.findIndex(nombre);
			props.carrito.splice(index, 1);
		}
		props.setCarrito([
			...props.carrito,
			{
				serial: row.serial,
				cantidad: cantidad + 1,
				nombre: row.nombre,
			},
		]);
		setClick(click + 1);
		// props.setClicks(props.clicks + 1);
	};

	const setDisponibilidad = (dispo) => {
		if (dispo === "media") {
			return <DisponibilityBar disponibility='medium-disponibility' />;
		} else if (dispo === "disponible") {
			return <DisponibilityBar disponibility='high-disponibility' />;
		} else if (dispo === "0") {
			return <DisponibilityBar disponibility='' />;
		} else {
			return <DisponibilityBar disponibility='low-disponibility' />;
		}
	};
	// useEffect(() => {
	// 	fetch(`${rutaApi}/prestamos/prestamoxid/${row.prestamo_id}`, {
	// 		method: "GET",
	// 		headers: {
	// 			"token-acceso": token,
	// 		},
	// 	})
	// 		.then((res) => {
	// 			if (res.ok) {
	// 				console.log("todo okokok xd");
	// 				return res.json();
	// 			} else {
	// 				consultaVacia = true;
	// 				console.log("No hay detalle");
	// 			}
	// 		})
	// 		.then((res) => {
	// 			if (!consultaVacia) {
	// 				console.log("------");
	// 				console.log(res);
	// 				let respuesta = JSON.stringify(res);
	// 				setDetalle(JSON.parse(respuesta)[0]);
	// 				return respuesta;
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align='left'>
					<MdIcons.MdInsertPhoto size={30} />
				</TableCell>
				<TableCell align='left'>{row.nombre}</TableCell>
				<TableCell align='left'>{row.categoria}</TableCell>
				<TableCell align='left'>{row.serial}</TableCell>
				<TableCell align='left'>{setDisponibilidad(row.disponibles)}</TableCell>

				<TableCell align='left'>
					{row.disponibles === "0" ? (
						<button className='btn btn-primary disabled'>Agregar</button>
					) : (
						<button
							className='btn btn-primary'
							onClick={() => onButtonClick(click)}
						>
							Agregar
						</button>
					)}
					{/* <button className='btn btn-primary'>Agregar</button> */}
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

// <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
// 									{columns.map((column) => {
// 										const value = row[column.id];
// 										return (
// 											<TableCell key={column.id} align={column.align}>
// 												{column.format && typeof value === "number"
// 													? column.format(value)
// 													: value}
// 											</TableCell>
// 										);
// 									})}
// 								</TableRow>

export default function ProductosCliente({
	carrito,
	setCarrito,
	vaciar,
	setVaciar,
}) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(4);
	const [inventario, setInventario] = useState([]);
	const token = localStorage.getItem("token");
	let consultaVacia = false;

	useEffect(() => {
		fetch(`${rutaApi}/inventario/consultar`, {
			method: "GET",
			headers: {
				"token-acceso": token,
			},
		})
			.then((res) => {
				if (res.ok) {
					console.log("inventario okok");
					return res.json();
				} else {
					consultaVacia = true;
					console.log("No hay detalle");
				}
			})
			.then((res) => {
				if (!consultaVacia) {
					console.log("------");
					console.log(res);
					let respuesta = JSON.stringify(res);
					setInventario(JSON.parse(respuesta));
					return respuesta;
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		// <Grid>
		<TableContainer sx={{ maxHeight: 440 }}>
			<Table
				stickyHeader
				aria-label='sticky table'
				// style={{ width: 1200, marginLeft: "350px", marginTop: "50px" }}
			>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{ minWidth: column.minWidth }}
							>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{inventario
						.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						.map((row) => {
							return (
								<Row
									key={row.serial}
									row={row}
									carrito={carrito}
									setCarrito={setCarrito}
									vaciar={vaciar}
									setVaciar={setVaciar}
								/>
							);
						})}
				</TableBody>
			</Table>
			<TablePagination
				rowsPerPageOptions={[4, 25, 100]}
				component='div'
				count={inventario.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				// style={{ width: 1200 }}
			/>
		</TableContainer>
	);
}
