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
  },
});

const ModalAgregarAuxiliar = ({
  showModal,
  hideModal,
}) => {
  const classes = useStyles();

  return (
    <Modal show={showModal} onHide={hideModal} centered backdrop="static">
    
      <Modal.Header closeButton>
				<Modal.Title> Agregar auxiliar </Modal.Title>
			</Modal.Header>

      <Modal.Body>
        Motrar buscar estudiantes por nombre, solo renderizar la busqueda.
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {
          console.log('Agregar auxiliar seleccionado'); // Función para editar en la API
          hideModal()}
          } 
          className={classes.botonesFoot}
        >
          Agregar
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default ModalAgregarAuxiliar;