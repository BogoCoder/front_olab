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
    maxHeight: '50vh',
    marginTop: '15px',
    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
      borderRadius: 8,
      border: "1.5px solid #1750A6"
    },
  },
  tableRow: {
    height: 40
  },
  tableCell: {
    padding: "0px 16px"
  }
});

export default function TablaDetallesEntrega({productos}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell align="left" className={classes.tableCell}> Descripción </TableCell>
            <TableCell align="center" className={classes.tableCell}> Cantidad </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {productos.map((row) => (
            <TableRow key={row.codigo} className={classes.tableRow}>
              <TableCell align="left" className={classes.tableCell}>{row.descripcion}</TableCell>
              <TableCell align="center" className={classes.tableCell}>{row.cantidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}