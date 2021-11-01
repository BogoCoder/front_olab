import React from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	botonesFoot: {
    color: 'white',
    border: 'none',
    background: '#1C6EE5',
    '&:hover': {
      background: '#1252b3',
      boxShadow: 'none',
      textShadow: 'none',
    }
  },
  table: {
    maxWidth: '100%',
  },
  tableContainer: {
    maxHeight: '29vh',
    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
      borderRadius: 8,
      border: "1.5px solid #1750A6"
    },
  },
});

export default function ModalDevolucion({
  showModal,
  hideModal,
  idPrestamo,
  productos
}){
  const classes = useStyles();
  console.log('Productos devolución:', productos)
  return(
    <Modal show={showModal} onHide={hideModal} backdrop="static" size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Devolución préstamo {idPrestamo}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* --- Tabla con contenido para el estado de los productos --- */}
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table stickyHeader className={classes.table} aria-label="estado devolucion">
            
            <TableHead>
              <TableRow>
                <TableCell align="left"> Código </TableCell>
                <TableCell align="left"> Descripción </TableCell>
                <TableCell align="left"> ¿En buen estado? </TableCell>
                <TableCell align="left"> Observaciones </TableCell>
              </TableRow>
            </TableHead>
    
            <TableBody>
              {productos.map((row) => (
                <TableRow key={row.codigo}>
                  <TableCell component="th" scope="row">
                    {row.codigo}
                  </TableCell>
                  <TableCell align="left">{row.descripcion}</TableCell>
                  <TableCell align="left"> Si o No </TableCell>
                  <TableCell align="center"> La observación respectiva </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {
          console.log('Devolución');
          hideModal()}
          } 
          className={classes.botonesFoot}>
          Confirmar
        </Button>
      </Modal.Footer>

    </Modal>
  );
};