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

const ModalAgregarUsuarios = ({
    showModal,
    hideModal
}) => {
    const classes = useStyles();

    return (
      <Modal show={showModal} onHide={hideModal} centered backdrop="static">
        <Modal.Header closeButton>
                  <Modal.Title> Agregar usuarios </Modal.Title>
              </Modal.Header>
  
        <Modal.Body>
          Campos para agregar usuarios
        </Modal.Body>
  
        <Modal.Footer>
          <Button onClick={hideModal} className={classes.botonesFoot}>
            Cancelar
          </Button>
          <Button onClick={() => {
            console.log('Agregar usuarios');
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

export default ModalAgregarUsuarios;