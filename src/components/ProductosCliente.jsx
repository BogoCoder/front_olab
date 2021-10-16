import React, { useState } from "react";
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

export default function StickyHeadTable() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(4);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table
					stickyHeader
					aria-label='sticky table'
					style={{ width: 1200, marginLeft: "350px", marginTop: "50px" }}
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
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
										{columns.map((column) => {
											const value = row[column.id];
											return (
												<TableCell key={column.id} align={column.align}>
													{column.format && typeof value === "number"
														? column.format(value)
														: value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[4, 25, 100]}
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				style={{ width: 1200, marginLeft: "300px" }}
			/>
		</Paper>
	);
}
