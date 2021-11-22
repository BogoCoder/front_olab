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

const ModalEditarAuxiliar = ({
  showModal,
  hideModal,
}) => {
  const classes = useStyles();

  const show = (showModal==='') ? false:true;
  return (
    <Modal show={show} onHide={hideModal} centered backdrop="static">
      <Modal.Header closeButton>
				<Modal.Title> Editar auxiliar </Modal.Title>
			</Modal.Header>

      <Modal.Body>
        Editar auxiliar con id {showModal}
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={hideModal} className={classes.botonesFoot}>
          Cancelar
        </Button>
        <Button onClick={() => {
          console.log('Guardar edición auxiliar', showModal); // Función para editar en la API
          hideModal()}
          } 
          className={classes.botonesFoot}
        >
          Guardar
        </Button>
      </Modal.Footer>

    </Modal>
  );
};

export default ModalEditarAuxiliar;