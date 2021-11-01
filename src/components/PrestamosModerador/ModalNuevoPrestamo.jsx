import React from "react";
import { Modal, Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';

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
  }
});

export default function ModalNuevoPrestamo({
  showModal,
  hideModal
}){
  const classes = useStyles();

  return(
    <Modal show={showModal} onHide={hideModal} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo prestamo</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        Proceso de generar nuevo prestamo
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {
          console.log('Nuevo prestamo');
          hideModal()}
          } 
          className={classes.botonesFoot}>
          Crear prestamo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};