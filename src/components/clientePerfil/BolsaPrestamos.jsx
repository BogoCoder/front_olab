import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import IconButton from "@material-ui/core/IconButton";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as AiIcons from "react-icons/ai";

const columns = [
	{ id: "material", label: "Material", minWidth: 170 },
	{ id: "cantidad", label: "Cantidad", minWidth: 100 },
	// { id: "eliminar", label: "", minWidth: 20 },
];

function Row(props) {
	const { row } = props;

	const onDelete = () => {
		// if (cantidad > 0) {
		// 	let serial = (element) => element.serial === row.serial;
		// 	let index = props.carrito.findIndex(serial);
		// 	props.carrito.splice(index, 1);
		// 	props.setCarrito([
		// 		...props.carrito,
		// 		{
		// 			serial: row.serial,
		// 			cantidad: cantidad - 1,
		// 			nombre: row.nombre,
		// 		},
		// 	]);
		// }
	};
	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align='left'>{row.nombre}</TableCell>
				<TableCell align='left'>{row.cantidad}</TableCell>
				{/* <TableCell align='left'>
					<IconButton size='small' onClick={() => onDelete()}>
						<AiIcons.AiFillDelete size={17} fill='#FA323F' />
					</IconButton>
				</TableCell> */}
			</TableRow>
		</React.Fragment>
	);
}

export default function BolsaPrestamos({ carrito, setCarrito }) {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: "80%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				{console.log(carrito)}
				<Table stickyHeader aria-label='sticky table'>
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
						{carrito
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								return (
									<Row
										key={row.nombre}
										row={row}
										carrito={carrito}
										setCarrito={setCarrito}
									/>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			{/* <TablePagination
				rowsPerPageOptions={[2, 5, 10]}
				component='div'
				count={carrito.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/> */}
		</Paper>
	);
}
