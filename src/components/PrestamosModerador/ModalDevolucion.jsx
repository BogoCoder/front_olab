import React, {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

// Otros componentes
import CustomSwitch from './CustomSwitch';

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
    maxHeight: '50vh',
    "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
      borderRadius: 8,
      border: "1.5px solid #1750A6"
    },
  },
  textBoxCell: {
    paddingLeft: 0, 
    paddingRight: 0, 
    width: '40%'
  }
});

const getPlantillaDevolucion = (productos) => {
  const plantilla = productos.map( prod => {
    return {
      'codigo': prod.codigo,
      'buenEstado': 1,
      'observaciones': ''
    }
  });
  return plantilla;
};

// -------------------------------------------
// ---------- Componente a exportar ----------
export default function ModalDevolucion({
  showModal,
  hideModal,
  idPrestamo,
  productos
}){
  const classes = useStyles();
  // Estados para guardar estado y observaciones
  const [estadoDevolucion, setEstadoDevolucion] = useState(getPlantillaDevolucion(productos));

  // Efecto al cambiar prestamo
  useEffect(() => {
    setEstadoDevolucion(getPlantillaDevolucion(productos));
  }, [productos])

  // Handlers
  const handleCambioObservaciones = (event) => {
    estadoDevolucion[parseInt(event.target.id)].observaciones = event.target.value;
  };
  const handleCambioBuenEstado = (nextChecked, idx) => {
    estadoDevolucion[idx].buenEstado = nextChecked ? 1:0
  };

  if (estadoDevolucion.length===0){
    return null; // Al iniciar la página espere a que se cargue la info del estado.
  }

  return(
    <Modal show={showModal} onHide={hideModal} 
      backdrop="static" size="xl" centered
    >
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
                <TableCell align="center"> ¿En buen estado? </TableCell>
                <TableCell align="left"> Observaciones </TableCell>
              </TableRow>
            </TableHead>
    
            <TableBody>
              {productos.map((row, idx) => (
                <TableRow key={row.codigo}>
                  <TableCell component="th" scope="row">
                    {row.codigo}
                  </TableCell>
                  <TableCell align="left">{row.descripcion}</TableCell>
                  <TableCell align="center">
                    <CustomSwitch
                      onChangeFather={handleCambioBuenEstado}
                      idx={idx}
                    />
                  </TableCell>
                  <TableCell align="center" className={classes.textBoxCell}>
                    <TextField id={`${idx}` /* Para tener el índice al actualizar estado*/} 
                      label="Observaciones"
                      variant="filled"
                      multiline
                      maxRows={2}
                      style={{width: '90%'}}
                      onChange={handleCambioObservaciones}
                    />
                  </TableCell>
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
          console.log('Devolución', estadoDevolucion); // Función para devolver en la API
          hideModal()}
          } 
          className={classes.botonesFoot}
        >
          Confirmar
        </Button>
      </Modal.Footer>

    </Modal>
  );
};