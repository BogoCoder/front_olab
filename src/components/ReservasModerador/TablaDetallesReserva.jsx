import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    maxWidth: '100%',
  },
  tableContainer: {
    maxHeight: '36vh',
    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
      borderRadius: 8,
      border: "1.5px solid #1750A6"
    },
  },
});

export default function TablaDetalleReserva({productos}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        
        <TableHead>
          <TableRow>
            <TableCell align="left"> Código </TableCell>
            <TableCell align="left"> Descripción </TableCell>
            <TableCell align="left"> Categoría </TableCell>
            <TableCell align="left"> Ubicación </TableCell>
            <TableCell align="center"> Cantidad </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {productos.map((row) => (
            <TableRow key={row.codigo}>
              <TableCell component="th" scope="row">
                {row.codigo}
              </TableCell>
              <TableCell align="left">{row.descripcion}</TableCell>
              <TableCell align="left">{row.categoria}</TableCell>
              <TableCell align="left">{row.ubicacion}</TableCell>
              <TableCell align="center">{row.cantidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
